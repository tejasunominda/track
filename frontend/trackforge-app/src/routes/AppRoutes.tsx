import { Routes, Route, Navigate } from "react-router-dom";
import { CustomersPage } from "@/features/customers/pages/CustomersPage";
import { ContactsPage } from "@/features/contacts/pages/ContactsPage";
import { LeadsPage } from "@/features/leads/pages/LeadsPage";
import { DealsPage } from "@/features/deals/pages/DealsPage";
import { OpportunitiesPage } from "@/features/opportunities/pages/OpportunitiesPage";
import { QuotesPage } from "@/features/quotes/pages/QuotesPage";
import { OrdersPage } from "@/features/orders/pages/OrdersPage";
import { ShipmentsPage } from "@/features/shipments/pages/ShipmentsPage";
import { InvoicesReceivedPage } from "@/features/invoices-received/pages/InvoicesReceivedPage";
import { PaymentsPage } from "@/features/payments/pages/PaymentsPage";
import { RefundsPage } from "@/features/refunds/pages/RefundsPage";
import { BudgetsPage } from "@/features/budgets/pages/BudgetsPage";
import { ForecastsPage } from "@/features/forecasts/pages/ForecastsPage";
import { CostCentersPage } from "@/features/cost-centers/pages/CostCentersPage";
import { PurchaseOrdersPage } from "@/features/purchase-orders/pages/PurchaseOrdersPage";
import { SuppliersPage } from "@/features/suppliers/pages/SuppliersPage";
import { ManufacturingPage } from "@/features/manufacturing/pages/ManufacturingPage";
import { BillOfMaterialsPage } from "@/features/bill-of-materials/pages/BillOfMaterialsPage";
import { WorkOrdersPage } from "@/features/work-orders/pages/WorkOrdersPage";
import { QualityPage } from "@/features/quality/pages/QualityPage";
import { InspectionsPage } from "@/features/inspections/pages/InspectionsPage";
import { DefectsPage } from "@/features/defects/pages/DefectsPage";
import { NonConformancesPage } from "@/features/non-conformances/pages/NonConformancesPage";
import { CAPAPage } from "@/features/capa/pages/CAPAPage";
import { TrainingPage } from "@/features/training/pages/TrainingPage";
import { CertificationsPage } from "@/features/certifications/pages/CertificationsPage";
import { CompliancePage } from "@/features/compliance/pages/CompliancePage";
import { PoliciesPage } from "@/features/policies/pages/PoliciesPage";
import { ProceduresPage } from "@/features/procedures/pages/ProceduresPage";
import { WorkInstructionsPage } from "@/features/work-instructions/pages/WorkInstructionsPage";
import { WikiPage } from "@/features/wiki/pages/WikiPage";
import { DocumentsPage } from "@/features/documents/pages/DocumentsPage";
import { FilesPage } from "@/features/files/pages/FilesPage";
import { ImagesPage } from "@/features/images/pages/ImagesPage";
import { DrawingsPage } from "@/features/drawings/pages/DrawingsPage";
import { MindMapPage } from "@/features/mind-map/pages/MindMapPage";
import { WhiteboardPage } from "@/features/whiteboard/pages/WhiteboardPage";
import { SpreadsheetsPage } from "@/features/spreadsheets/pages/SpreadsheetsPage";
import { PresentationsPage } from "@/features/presentations/pages/PresentationsPage";
import { MeetingNotesPage } from "@/features/meeting-notes/pages/MeetingNotesPage";
import { RetrospectivesPage } from "@/features/retrospectives/pages/RetrospectivesPage";
import { StandupsPage } from "@/features/standups/pages/StandupsPage";
import { OneOnOnePage } from "@/features/one-on-one/pages/OneOnOnePage";
import { PerformanceReviewPage } from "@/features/performance-review/pages/PerformanceReviewPage";
import { CareerPathPage } from "@/features/career-path/pages/CareerPathPage";
import { SkillsMatrixPage } from "@/features/skills-matrix/pages/SkillsMatrixPage";
import { OrgChartPage } from "@/features/org-chart/pages/OrgChartPage";
import { JobDescriptionsPage } from "@/features/job-descriptions/pages/JobDescriptionsPage";
import { HiringPage } from "@/features/hiring/pages/HiringPage";
import { OnboardingPage } from "@/features/onboarding/pages/OnboardingPage";
import { OffboardingPage } from "@/features/offboarding/pages/OffboardingPage";
import { VacationPage } from "@/features/vacation/pages/VacationPage";
import { ExpensesPage } from "@/features/expenses/pages/ExpensesPage";
import { InvoicesPage } from "@/features/invoices/pages/InvoicesPage";
import { ContractsPage } from "@/features/contracts/pages/ContractsPage";
import { VendorsPage } from "@/features/vendors/pages/VendorsPage";
import { ProcurementPage } from "@/features/procurement/pages/ProcurementPage";
import { InventoryPage } from "@/features/inventory/pages/InventoryPage";
import { HardwarePage } from "@/features/hardware/pages/HardwarePage";
import { SoftwarePage } from "@/features/software/pages/SoftwarePage";
import { GanttPage } from "@/features/gantt/pages/GanttPage";
import { TimeSheetsPage } from "@/features/time-sheets/pages/TimeSheetsPage";
import { ResourcePlanningPage } from "@/features/resource-planning/pages/ResourcePlanningPage";
import { RiskRegisterPage } from "@/features/risk-register/pages/RiskRegisterPage";
import { ChangeLogPage } from "@/features/change-log/pages/ChangeLogPage";
import { ReleaseNotesPage } from "@/features/release-notes/pages/ReleaseNotesPage";
import { ProductRequirementsPage } from "@/features/product-requirements/pages/ProductRequirementsPage";
import { TestPlansPage } from "@/features/test-plans/pages/TestPlansPage";
import { TestCasesPage } from "@/features/test-cases/pages/TestCasesPage";
import { TestRunsPage } from "@/features/test-runs/pages/TestRunsPage";
import { EnvironmentsPage } from "@/features/environments/pages/EnvironmentsPage";
import { DeploymentsPage } from "@/features/deployments/pages/DeploymentsPage";
import { FeatureFlagsPage } from "@/features/feature-flags/pages/FeatureFlagsPage";
import { ABTestsPage } from "@/features/a-b-tests/pages/ABTestsPage";
import { MetricsPage } from "@/features/metrics/pages/MetricsPage";
import { AlertsPage } from "@/features/alerts/pages/AlertsPage";
import { IncidentsPage } from "@/features/incidents/pages/IncidentsPage";
import { OnCallPage } from "@/features/on-call/pages/OnCallPage";
import { PostmortemsPage } from "@/features/postmortems/pages/PostmortemsPage";
import { ServiceCatalogPage } from "@/features/service-catalog/pages/ServiceCatalogPage";
import { RunbooksPage } from "@/features/runbooks/pages/RunbooksPage";
import { MacrosPage } from "@/features/macros/pages/MacrosPage";
import { QuickFiltersPage } from "@/features/quick-filters/pages/QuickFiltersPage";
import { ColorSchemesPage } from "@/features/color-schemes/pages/ColorSchemesPage";
import { EmailTemplatesPage } from "@/features/email-templates/pages/EmailTemplatesPage";
import { InAppMessagesPage } from "@/features/in-app-messages/pages/InAppMessagesPage";
import { TasksPage } from "@/features/tasks/pages/TasksPage";
import { SubtasksPage } from "@/features/subtasks/pages/SubtasksPage";
import { ChecklistsPage } from "@/features/checklists/pages/ChecklistsPage";
import { TaskDependenciesPage } from "@/features/task-dependencies/pages/TaskDependenciesPage";
import { BoardsPage } from "@/features/boards/pages/BoardsPage";
import { QueuesPage } from "@/features/queues/pages/QueuesPage";
import { CannedResponsesPage } from "@/features/canned-responses/pages/CannedResponsesPage";
import { RequestTypesPage } from "@/features/request-types/pages/RequestTypesPage";
import { PortalPage } from "@/features/portal/pages/PortalPage";
import { SurveysPage } from "@/features/surveys/pages/SurveysPage";
import { KnowledgeBasePage } from "@/features/knowledge-base/pages/KnowledgeBasePage";
import { ReportsBuilderPage } from "@/features/reports-builder/pages/ReportsBuilderPage";
import { DashboardBuilderPage } from "@/features/dashboard-builder/pages/DashboardBuilderPage";
import { SchemesPage } from "@/features/schemes/pages/SchemesPage";
import { FieldConfigsPage } from "@/features/field-configs/pages/FieldConfigsPage";
import { ScreensPage } from "@/features/screens/pages/ScreensPage";
import { NotificationsHubPage } from "@/features/notifications-hub/pages/NotificationsHubPage";
import { SubscriptionsPage } from "@/features/subscriptions/pages/SubscriptionsPage";
import { MentionsPage } from "@/features/mentions/pages/MentionsPage";
import { WatchersPage } from "@/features/watchers/pages/WatchersPage";
import { VotesPage } from "@/features/votes/pages/VotesPage";
import { FlagsPage } from "@/features/flags/pages/FlagsPage";
import { BookmarksPage } from "@/features/bookmarks/pages/BookmarksPage";
import { TrashPage } from "@/features/trash/pages/TrashPage";
import { RecycleBinPage } from "@/features/recycle-bin/pages/RecycleBinPage";
import { CopyPage } from "@/features/copy/pages/CopyPage";
import { MovePage } from "@/features/move/pages/MovePage";
import { BulkEditPage } from "@/features/bulk-edit/pages/BulkEditPage";
import { LinkPage } from "@/features/link/pages/LinkPage";
import { ClonePage } from "@/features/clone/pages/ClonePage";
import { HistoryPage } from "@/features/history/pages/HistoryPage";
import { ActivityPage } from "@/features/activity/pages/ActivityPage";
import { DraftsPage } from "@/features/drafts/pages/DraftsPage";
import { RemindersPage } from "@/features/reminders/pages/RemindersPage";
import { TeamsPage } from "@/features/teams/pages/TeamsPage";
import { GoalsPage } from "@/features/goals/pages/GoalsPage";
import { FormsPage } from "@/features/forms/pages/FormsPage";
import { AssetsPage } from "@/features/assets/pages/AssetsPage";
import { CalendarPage } from "@/features/calendar/pages/CalendarPage";
import { TimelinePage } from "@/features/timeline/pages/TimelinePage";
import { DependenciesPage } from "@/features/dependencies/pages/DependenciesPage";
import { ApprovalsPage } from "@/features/approvals/pages/ApprovalsPage";
import { AnnouncementsPage } from "@/features/announcements/pages/AnnouncementsPage";
import { TemplatesPage } from "@/features/templates/pages/TemplatesPage";
import { ReportsExportPage } from "@/features/reports-export/pages/ReportsExportPage";
import { RuleEnginePage } from "@/features/rule-engine/pages/RuleEnginePage";
import { RolesPage } from "@/features/roles/pages/RolesPage";
import { GroupsPage } from "@/features/groups/pages/GroupsPage";
import { InvitationsPage } from "@/features/invitations/pages/InvitationsPage";
import { SecurityPage } from "@/features/security/pages/SecurityPage";
import { WebhooksPage } from "@/features/webhooks/pages/WebhooksPage";
import { AuditTrailPage } from "@/features/audit-trail/pages/AuditTrailPage";
import { MigratePage } from "@/features/migrate/pages/MigratePage";
import { AnalyticsPage } from "@/features/analytics/pages/AnalyticsPage";
import { LabelsPage } from "@/features/labels/pages/LabelsPage";
import { ComponentsPage } from "@/features/components/pages/ComponentsPage";
import { ReleasesPage } from "@/features/releases/pages/ReleasesPage";
import { WorkflowsPage } from "@/features/workflows/pages/WorkflowsPage";
import { IssueTypesPage } from "@/features/issue-types/pages/IssueTypesPage";
import { PermissionsPage } from "@/features/permissions/pages/PermissionsPage";
import { BillingPage } from "@/features/billing/pages/BillingPage";
import { IntegrationsPage } from "@/features/integrations/pages/IntegrationsPage";
import { ServiceDeskPage } from "@/features/service-desk/pages/ServiceDeskPage";
import { PortfolioPage } from "@/features/portfolio/pages/PortfolioPage";
import { RoadmapPage } from "@/features/roadmap/pages/RoadmapPage";
import { EpicsPage } from "@/features/epics/pages/EpicsPage";
import { VersionsPage } from "@/features/versions/pages/VersionsPage";
import { TimeTrackingPage } from "@/features/time-tracking/pages/TimeTrackingPage";
import { SLAPage } from "@/features/s-l-a/pages/SLAPage";
import { CustomFieldsPage } from "@/features/custom-fields/pages/CustomFieldsPage";
import { AutomationPage } from "@/features/automation/pages/AutomationPage";
import { ImportPage } from "@/features/import/pages/ImportPage";
import { ExportPage } from "@/features/export/pages/ExportPage";
import { ArchivePage } from "@/features/archive/pages/ArchivePage";
import { AppShell } from "@/app/AppShell";
import { AuditLogPage } from "@/features/admin/pages/AuditLogPage";
import { BacklogPage } from "@/features/backlog/pages/BacklogPage";
import { BoardPage } from "@/features/board/pages/BoardPage";
import { DashboardsPage } from "@/features/dashboards/pages/DashboardsPage";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { FiltersPage } from "@/features/filters/pages/FiltersPage";
import { HelpPage } from "@/features/help/pages/HelpPage";
import { IssueDetailPage } from "@/features/issues/pages/IssueDetailPage";
import { IssuesPage } from "@/features/issues/pages/IssuesPage";
import { NotificationsPage } from "@/features/notifications/pages/NotificationsPage";
import { PeoplePage } from "@/features/people/pages/PeoplePage";
import { ProfilePage } from "@/features/profile/pages/ProfilePage";
import { ProjectsPage } from "@/features/projects/pages/ProjectsPage";
import { ReportsPage } from "@/features/reports/pages/ReportsPage";
import { SearchPage } from "@/features/search/pages/SearchPage";
import { SettingsPage } from "@/features/settings/pages/SettingsPage";
import { SprintsPage } from "@/features/sprints/pages/SprintsPage";

/**
 * Top-level route tree, nested to match the project/board/issue hierarchy
 * (Frontend Specification Document §8). Feature modules under src/features/*
 * register their own sub-routes here as they are built out per the
 * Feature Ticket List.
 */
export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<AppShell />}>
        <Route index element={<Navigate to="/projects" replace />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="projects/:projectId/board" element={<BoardPage />} />
        <Route path="projects/:projectId/issues" element={<IssuesPage />} />
        <Route path="projects/:projectId/reports" element={<ReportsPage />} />
        <Route path="projects/:projectId/backlog" element={<BacklogPage />} />
        <Route path="projects/:projectId/sprints" element={<SprintsPage />} />
        <Route path="filters" element={<FiltersPage />} />
        <Route path="dashboards" element={<DashboardsPage />} />
        <Route path="people" element={<PeoplePage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="admin/audit-log" element={<AuditLogPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="help" element={<HelpPage />} />
        <Route path="labels" element={<LabelsPage />} />
        <Route path="components" element={<ComponentsPage />} />
        <Route path="releases" element={<ReleasesPage />} />
        <Route path="workflows" element={<WorkflowsPage />} />
        <Route path="issue-types" element={<IssueTypesPage />} />
        <Route path="permissions" element={<PermissionsPage />} />
        <Route path="billing" element={<BillingPage />} />
        <Route path="integrations" element={<IntegrationsPage />} />
        <Route path="service-desk" element={<ServiceDeskPage />} />
        <Route path="portfolio" element={<PortfolioPage />} />
        <Route path="roadmap" element={<RoadmapPage />} />
        <Route path="epics" element={<EpicsPage />} />
        <Route path="versions" element={<VersionsPage />} />
        <Route path="time-tracking" element={<TimeTrackingPage />} />
        <Route path="s-l-a" element={<SLAPage />} />
        <Route path="custom-fields" element={<CustomFieldsPage />} />
        <Route path="automation" element={<AutomationPage />} />
        <Route path="import" element={<ImportPage />} />
        <Route path="export" element={<ExportPage />} />
        <Route path="archive" element={<ArchivePage />} />
        <Route path="issues/:issueId" element={<IssueDetailPage />} />
        <Route path="customers" element={<CustomersPage />} />
        <Route path="contacts" element={<ContactsPage />} />
        <Route path="leads" element={<LeadsPage />} />
        <Route path="deals" element={<DealsPage />} />
        <Route path="opportunities" element={<OpportunitiesPage />} />
        <Route path="quotes" element={<QuotesPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="shipments" element={<ShipmentsPage />} />
        <Route path="invoices-received" element={<InvoicesReceivedPage />} />
        <Route path="payments" element={<PaymentsPage />} />
        <Route path="refunds" element={<RefundsPage />} />
        <Route path="budgets" element={<BudgetsPage />} />
        <Route path="forecasts" element={<ForecastsPage />} />
        <Route path="cost-centers" element={<CostCentersPage />} />
        <Route path="purchase-orders" element={<PurchaseOrdersPage />} />
        <Route path="suppliers" element={<SuppliersPage />} />
        <Route path="manufacturing" element={<ManufacturingPage />} />
        <Route path="bill-of-materials" element={<BillOfMaterialsPage />} />
        <Route path="work-orders" element={<WorkOrdersPage />} />
        <Route path="quality" element={<QualityPage />} />
        <Route path="inspections" element={<InspectionsPage />} />
        <Route path="defects" element={<DefectsPage />} />
        <Route path="non-conformances" element={<NonConformancesPage />} />
        <Route path="capa" element={<CAPAPage />} />
        <Route path="training" element={<TrainingPage />} />
        <Route path="certifications" element={<CertificationsPage />} />
        <Route path="compliance" element={<CompliancePage />} />
        <Route path="policies" element={<PoliciesPage />} />
        <Route path="procedures" element={<ProceduresPage />} />
        <Route path="work-instructions" element={<WorkInstructionsPage />} />
        <Route path="wiki" element={<WikiPage />} />
        <Route path="documents" element={<DocumentsPage />} />
        <Route path="files" element={<FilesPage />} />
        <Route path="images" element={<ImagesPage />} />
        <Route path="drawings" element={<DrawingsPage />} />
        <Route path="mind-map" element={<MindMapPage />} />
        <Route path="whiteboard" element={<WhiteboardPage />} />
        <Route path="spreadsheets" element={<SpreadsheetsPage />} />
        <Route path="presentations" element={<PresentationsPage />} />
        <Route path="meeting-notes" element={<MeetingNotesPage />} />
        <Route path="retrospectives" element={<RetrospectivesPage />} />
        <Route path="standups" element={<StandupsPage />} />
        <Route path="one-on-one" element={<OneOnOnePage />} />
        <Route path="performance-review" element={<PerformanceReviewPage />} />
        <Route path="career-path" element={<CareerPathPage />} />
        <Route path="skills-matrix" element={<SkillsMatrixPage />} />
        <Route path="org-chart" element={<OrgChartPage />} />
        <Route path="job-descriptions" element={<JobDescriptionsPage />} />
        <Route path="hiring" element={<HiringPage />} />
        <Route path="onboarding" element={<OnboardingPage />} />
        <Route path="offboarding" element={<OffboardingPage />} />
        <Route path="vacation" element={<VacationPage />} />
        <Route path="expenses" element={<ExpensesPage />} />
        <Route path="invoices" element={<InvoicesPage />} />
        <Route path="contracts" element={<ContractsPage />} />
        <Route path="vendors" element={<VendorsPage />} />
        <Route path="procurement" element={<ProcurementPage />} />
        <Route path="inventory" element={<InventoryPage />} />
        <Route path="hardware" element={<HardwarePage />} />
        <Route path="software" element={<SoftwarePage />} />
        <Route path="gantt" element={<GanttPage />} />
        <Route path="time-sheets" element={<TimeSheetsPage />} />
        <Route path="resource-planning" element={<ResourcePlanningPage />} />
        <Route path="risk-register" element={<RiskRegisterPage />} />
        <Route path="change-log" element={<ChangeLogPage />} />
        <Route path="release-notes" element={<ReleaseNotesPage />} />
        <Route path="product-requirements" element={<ProductRequirementsPage />} />
        <Route path="test-plans" element={<TestPlansPage />} />
        <Route path="test-cases" element={<TestCasesPage />} />
        <Route path="test-runs" element={<TestRunsPage />} />
        <Route path="environments" element={<EnvironmentsPage />} />
        <Route path="deployments" element={<DeploymentsPage />} />
        <Route path="feature-flags" element={<FeatureFlagsPage />} />
        <Route path="a-b-tests" element={<ABTestsPage />} />
        <Route path="metrics" element={<MetricsPage />} />
        <Route path="alerts" element={<AlertsPage />} />
        <Route path="incidents" element={<IncidentsPage />} />
        <Route path="on-call" element={<OnCallPage />} />
        <Route path="postmortems" element={<PostmortemsPage />} />
        <Route path="service-catalog" element={<ServiceCatalogPage />} />
        <Route path="runbooks" element={<RunbooksPage />} />
        <Route path="macros" element={<MacrosPage />} />
        <Route path="quick-filters" element={<QuickFiltersPage />} />
        <Route path="color-schemes" element={<ColorSchemesPage />} />
        <Route path="email-templates" element={<EmailTemplatesPage />} />
        <Route path="in-app-messages" element={<InAppMessagesPage />} />
        <Route path="tasks" element={<TasksPage />} />
        <Route path="subtasks" element={<SubtasksPage />} />
        <Route path="checklists" element={<ChecklistsPage />} />
        <Route path="task-dependencies" element={<TaskDependenciesPage />} />
        <Route path="boards" element={<BoardsPage />} />
        <Route path="queues" element={<QueuesPage />} />
        <Route path="canned-responses" element={<CannedResponsesPage />} />
        <Route path="request-types" element={<RequestTypesPage />} />
        <Route path="portal" element={<PortalPage />} />
        <Route path="surveys" element={<SurveysPage />} />
        <Route path="knowledge-base" element={<KnowledgeBasePage />} />
        <Route path="reports-builder" element={<ReportsBuilderPage />} />
        <Route path="dashboard-builder" element={<DashboardBuilderPage />} />
        <Route path="schemes" element={<SchemesPage />} />
        <Route path="field-configs" element={<FieldConfigsPage />} />
        <Route path="screens" element={<ScreensPage />} />
        <Route path="notifications-hub" element={<NotificationsHubPage />} />
        <Route path="subscriptions" element={<SubscriptionsPage />} />
        <Route path="mentions" element={<MentionsPage />} />
        <Route path="watchers" element={<WatchersPage />} />
        <Route path="votes" element={<VotesPage />} />
        <Route path="flags" element={<FlagsPage />} />
        <Route path="bookmarks" element={<BookmarksPage />} />
        <Route path="trash" element={<TrashPage />} />
        <Route path="recycle-bin" element={<RecycleBinPage />} />
        <Route path="copy" element={<CopyPage />} />
        <Route path="move" element={<MovePage />} />
        <Route path="bulk-edit" element={<BulkEditPage />} />
        <Route path="link" element={<LinkPage />} />
        <Route path="clone" element={<ClonePage />} />
        <Route path="history" element={<HistoryPage />} />
        <Route path="activity" element={<ActivityPage />} />
        <Route path="drafts" element={<DraftsPage />} />
        <Route path="reminders" element={<RemindersPage />} />
        <Route path="teams" element={<TeamsPage />} />
        <Route path="goals" element={<GoalsPage />} />
        <Route path="forms" element={<FormsPage />} />
        <Route path="assets" element={<AssetsPage />} />
        <Route path="calendar" element={<CalendarPage />} />
        <Route path="timeline" element={<TimelinePage />} />
        <Route path="dependencies" element={<DependenciesPage />} />
        <Route path="approvals" element={<ApprovalsPage />} />
        <Route path="announcements" element={<AnnouncementsPage />} />
        <Route path="templates" element={<TemplatesPage />} />
        <Route path="reports-export" element={<ReportsExportPage />} />
        <Route path="rule-engine" element={<RuleEnginePage />} />
        <Route path="roles" element={<RolesPage />} />
        <Route path="groups" element={<GroupsPage />} />
        <Route path="invitations" element={<InvitationsPage />} />
        <Route path="security" element={<SecurityPage />} />
        <Route path="webhooks" element={<WebhooksPage />} />
        <Route path="audit-trail" element={<AuditTrailPage />} />
        <Route path="migrate" element={<MigratePage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
      </Route>
    </Routes>
  );
}
