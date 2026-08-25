package io.trackforge.board.service;

import io.trackforge.issue.model.Issue;
import io.trackforge.issue.repository.IssueRepository;
import java.util.Comparator;
import java.util.List;
import java.util.UUID;
import org.springframework.stereotype.Service;

/**
 * LexoRank-style string ordering for board cards. Ranks are stored as
 * strings and sorted lexicographically, allowing insertions between two
 * existing issues without renumbering the whole board.
 */
@Service
public class IssueRankService {

    private final IssueRepository issueRepository;

    public IssueRankService(IssueRepository issueRepository) {
        this.issueRepository = issueRepository;
    }

    public String rankBetween(String prev, String next) {
        if (prev == null && next == null) {
            return "m";
        }
        if (prev == null) {
            return decrement(next);
        }
        if (next == null) {
            return increment(prev);
        }
        String mid = midString(prev, next);
        if (mid == null || mid.equals(prev) || mid.equals(next)) {
            return next + "a"; // fallback append
        }
        return mid;
    }

    public String rankAtEnd(UUID projectId) {
        List<Issue> issues = issueRepository.findByProjectIdOrderByRankAsc(projectId);
        if (issues.isEmpty()) return "m";
        String last = issues.getLast().getRank();
        return last == null ? "m" : increment(last);
    }

    // Simple midpoint of two strings. ASCII-only fallback.
    private String midString(String a, String b) {
        int min = Math.min(a.length(), b.length());
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < min; i++) {
            char ca = a.charAt(i);
            char cb = b.charAt(i);
            if (ca == cb) {
                sb.append(ca);
                continue;
            }
            int mid = (ca + cb) / 2;
            if (mid == ca) mid++;
            if (mid == cb) mid--;
            if (mid > ca && mid < cb) {
                sb.append((char) mid);
                return sb.toString();
            }
            // cannot split at this char; keep going
            sb.append(ca);
        }
        return a.length() < b.length() ? a + "m" : a;
    }

    private String increment(String s) {
        if (s.isEmpty()) return "a";
        char last = s.charAt(s.length() - 1);
        if (last < 'z') {
            return s.substring(0, s.length() - 1) + (char) (last + 1);
        }
        return s + "a";
    }

    private String decrement(String s) {
        if (s.isEmpty()) return "a";
        char last = s.charAt(s.length() - 1);
        if (last > 'a') {
            return s.substring(0, s.length() - 1) + (char) (last - 1);
        }
        return s.substring(0, s.length() - 1) + "m";
    }
}
