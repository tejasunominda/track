package io.trackforge.search.service;

import io.trackforge.issue.dto.IssueSummaryResponse;
import io.trackforge.issue.model.Issue;
import io.trackforge.issue.model.IssueStatus;
import io.trackforge.issue.model.IssueType;
import io.trackforge.issue.repository.IssueRepository;
import io.trackforge.issue.repository.IssueStatusRepository;
import io.trackforge.issue.repository.IssueTypeRepository;
import io.trackforge.project.model.Project;
import io.trackforge.project.repository.ProjectRepository;
import io.trackforge.search.tql.TqlLexer;
import io.trackforge.search.tql.TqlNode;
import io.trackforge.search.tql.TqlParser;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

@Service
public class TqlSearchService {

    private final IssueRepository issueRepository;
    private final IssueTypeRepository issueTypeRepository;
    private final IssueStatusRepository issueStatusRepository;
    private final ProjectRepository projectRepository;

    public TqlSearchService(
            IssueRepository issueRepository,
            IssueTypeRepository issueTypeRepository,
            IssueStatusRepository issueStatusRepository,
            ProjectRepository projectRepository) {
        this.issueRepository = issueRepository;
        this.issueTypeRepository = issueTypeRepository;
        this.issueStatusRepository = issueStatusRepository;
        this.projectRepository = projectRepository;
    }

    public List<IssueSummaryResponse> search(String query) {
        List<Issue> issues = issueRepository.findAll();
        List<IssueType> types = issueTypeRepository.findAll();
        List<IssueStatus> statuses = issueStatusRepository.findAll();
        List<Project> projects = projectRepository.findAll();

        Map<UUID, String> typeNames = types.stream().collect(Collectors.toMap(IssueType::getId, IssueType::getName));
        Map<UUID, String> statusNames = statuses.stream().collect(Collectors.toMap(IssueStatus::getId, IssueStatus::getName));
        Map<UUID, String> statusCategories = statuses.stream().collect(Collectors.toMap(IssueStatus::getId, s -> s.getStatusCategory().name()));
        Map<UUID, String> projectNames = projects.stream().collect(Collectors.toMap(Project::getId, Project::getName));

        return issues.stream()
                .filter(i -> query == null || query.isBlank() || matches(parse(query), toSearchable(i, typeNames, statusNames, projectNames)))
                .map(i -> toSummary(i, typeNames, statusNames, statusCategories))
                .toList();
    }

    public List<String> autocompleteFields() {
        return List.of("project", "status", "type", "priority", "summary", "assignee", "reporter");
    }

    private TqlNode parse(String query) {
        TqlLexer lexer = new TqlLexer(query);
        TqlParser parser = new TqlParser(lexer.tokenize());
        return parser.parse();
    }

    private boolean matches(TqlNode node, SearchableIssue issue) {
        if (node instanceof TqlNode.Comparison c) {
            String fieldValue = getField(c.field(), issue);
            return c.operator().equals("=") ? c.value().equalsIgnoreCase(fieldValue)
                    : !c.value().equalsIgnoreCase(fieldValue);
        }
        if (node instanceof TqlNode.And a) {
            return matches(a.left(), issue) && matches(a.right(), issue);
        }
        if (node instanceof TqlNode.Or o) {
            return matches(o.left(), issue) || matches(o.right(), issue);
        }
        return false;
    }

    private String getField(String field, SearchableIssue issue) {
        return switch (field.toLowerCase()) {
            case "project" -> issue.projectName;
            case "status" -> issue.statusName;
            case "type" -> issue.typeName;
            case "priority" -> issue.priority != null ? issue.priority : "";
            case "summary" -> issue.summary != null ? issue.summary : "";
            case "assignee" -> issue.assignee != null ? issue.assignee : "";
            case "reporter" -> issue.reporter != null ? issue.reporter : "";
            default -> "";
        };
    }

    private SearchableIssue toSearchable(Issue issue, Map<UUID, String> typeNames, Map<UUID, String> statusNames, Map<UUID, String> projectNames) {
        return new SearchableIssue(
                projectNames.getOrDefault(issue.getProjectId(), ""),
                typeNames.getOrDefault(issue.getIssueTypeId(), ""),
                statusNames.getOrDefault(issue.getStatusId(), ""),
                issue.getSummary(),
                issue.getPriority(),
                issue.getAssigneeId() != null ? issue.getAssigneeId().toString() : "",
                issue.getReporterId() != null ? issue.getReporterId().toString() : "");
    }

    private IssueSummaryResponse toSummary(
            Issue issue,
            Map<UUID, String> typeNames,
            Map<UUID, String> statusNames,
            Map<UUID, String> statusCategories) {
        return new IssueSummaryResponse(
                issue.getId(),
                issue.getProjectId(),
                typeNames.get(issue.getIssueTypeId()),
                statusNames.get(issue.getStatusId()),
                statusCategories.get(issue.getStatusId()),
                issue.getSummary(),
                issue.getDescription(),
                issue.getReporterId(),
                issue.getAssigneeId(),
                issue.getPriority(),
                issue.getStoryPoints(),
                issue.getCreatedAt(),
                issue.getUpdatedAt());
    }

    private record SearchableIssue(
            String projectName,
            String typeName,
            String statusName,
            String summary,
            String priority,
            String assignee,
            String reporter) {
    }
}
