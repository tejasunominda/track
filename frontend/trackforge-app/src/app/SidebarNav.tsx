import { NavLink, useMatch } from "react-router-dom";
import {
  Layout,
  List,
  Grid3X3,
  Filter,
  Home,
  BarChart3,
  Settings,
  Users,
  Search,
  Bell,
  Shield,
  HelpCircle,
  User,
  Clock,
} from "lucide-react";

function SidebarItem({
  to,
  icon: Icon,
  label,
}: {
  to: string;
  icon: React.ElementType;
  label: string;
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
          isActive
            ? "bg-blue-50 text-blue-700 shadow-sm"
            : "text-slate-600 hover:translate-x-1 hover:bg-white hover:text-slate-900 hover:shadow-sm"
        }`
      }
    >
      <Icon className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
      {label}
    </NavLink>
  );
}

function SidebarSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6 animate-fadeIn">
      <div className="mb-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-400">
        {title}
      </div>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

export function SidebarNav() {
  const projectMatch = useMatch("/projects/:projectId/*");
  const projectId = projectMatch?.params.projectId;

  return (
    <nav className="flex w-60 shrink-0 flex-col border-r border-slate-200 bg-slate-50 p-3 animate-slideInLeft">
      <SidebarSection title="TrackForge">
        <SidebarItem to="/" icon={Home} label="Your work" />
        <SidebarItem to="/projects" icon={Grid3X3} label="Projects" />
        <SidebarItem to="/search" icon={Search} label="Search" />
        <SidebarItem to="/filters" icon={Filter} label="Filters" />
        <SidebarItem to="/dashboards" icon={Layout} label="Dashboards" />
        <SidebarItem to="/notifications" icon={Bell} label="Notifications" />
      </SidebarSection>

      {projectId && (
        <SidebarSection title="Project">
          <SidebarItem to={`/projects/${projectId}/board`} icon={Layout} label="Board" />
          <SidebarItem to={`/projects/${projectId}/issues`} icon={List} label="Issues" />
          <SidebarItem to={`/projects/${projectId}/backlog`} icon={List} label="Backlog" />
          <SidebarItem to={`/projects/${projectId}/sprints`} icon={Clock} label="Sprints" />
          <SidebarItem to={`/projects/${projectId}/reports`} icon={BarChart3} label="Reports" />
        </SidebarSection>
      )}

      <SidebarSection title="Admin">
        <SidebarItem to="/people" icon={Users} label="People" />
        <SidebarItem to="/admin/audit-log" icon={Shield} label="Audit log" />
        <SidebarItem to="/settings" icon={Settings} label="Settings" />
      </SidebarSection>

      <SidebarSection title="Account">
        <SidebarItem to="/profile" icon={User} label="Profile" />
        <SidebarItem to="/help" icon={HelpCircle} label="Help" />
      </SidebarSection>
      <SidebarSection title="More">
        <SidebarItem to="/labels" icon={List} label="Labels" />
        <SidebarItem to="/components" icon={List} label="Components" />
        <SidebarItem to="/releases" icon={List} label="Releases" />
        <SidebarItem to="/workflows" icon={List} label="Workflows" />
        <SidebarItem to="/issue-types" icon={List} label="Issue types" />
        <SidebarItem to="/permissions" icon={List} label="Permissions" />
        <SidebarItem to="/billing" icon={List} label="Billing" />
        <SidebarItem to="/integrations" icon={List} label="Integrations" />
        <SidebarItem to="/service-desk" icon={List} label="Service desk" />
        <SidebarItem to="/portfolio" icon={List} label="Portfolio" />
        <SidebarItem to="/roadmap" icon={List} label="Roadmap" />
        <SidebarItem to="/epics" icon={List} label="Epics" />
        <SidebarItem to="/versions" icon={List} label="Versions" />
        <SidebarItem to="/time-tracking" icon={List} label="Time tracking" />
        <SidebarItem to="/s-l-a" icon={List} label="SLA policies" />
        <SidebarItem to="/custom-fields" icon={List} label="Custom fields" />
        <SidebarItem to="/automation" icon={List} label="Automation" />
        <SidebarItem to="/import" icon={List} label="Import" />
        <SidebarItem to="/export" icon={List} label="Export" />
        <SidebarItem to="/archive" icon={List} label="Archive" />
      </SidebarSection>
      <SidebarSection title="More 2">
        <SidebarItem to="/teams" icon={List} label="Teams" />
        <SidebarItem to="/goals" icon={List} label="Goals" />
        <SidebarItem to="/forms" icon={List} label="Forms" />
        <SidebarItem to="/assets" icon={List} label="Assets" />
        <SidebarItem to="/calendar" icon={List} label="Calendar" />
        <SidebarItem to="/timeline" icon={List} label="Timeline" />
        <SidebarItem to="/dependencies" icon={List} label="Dependencies" />
        <SidebarItem to="/approvals" icon={List} label="Approvals" />
        <SidebarItem to="/announcements" icon={List} label="Announcements" />
        <SidebarItem to="/templates" icon={List} label="Templates" />
        <SidebarItem to="/reports-export" icon={List} label="Reports export" />
        <SidebarItem to="/rule-engine" icon={List} label="Rule engine" />
        <SidebarItem to="/roles" icon={List} label="Roles" />
        <SidebarItem to="/groups" icon={List} label="Groups" />
        <SidebarItem to="/invitations" icon={List} label="Invitations" />
        <SidebarItem to="/security" icon={List} label="Security" />
        <SidebarItem to="/webhooks" icon={List} label="Webhooks" />
        <SidebarItem to="/audit-trail" icon={List} label="Audit trail" />
        <SidebarItem to="/migrate" icon={List} label="Migrate" />
        <SidebarItem to="/analytics" icon={List} label="Analytics" />
      </SidebarSection>
      <SidebarSection title="More 3">
        <SidebarItem to="/boards" icon={List} label="Boards" />
        <SidebarItem to="/queues" icon={List} label="Queues" />
        <SidebarItem to="/canned-responses" icon={List} label="Canned responses" />
        <SidebarItem to="/request-types" icon={List} label="Request types" />
        <SidebarItem to="/portal" icon={List} label="Portal" />
        <SidebarItem to="/surveys" icon={List} label="Surveys" />
        <SidebarItem to="/knowledge-base" icon={List} label="Knowledge base" />
        <SidebarItem to="/reports-builder" icon={List} label="Reports builder" />
        <SidebarItem to="/dashboard-builder" icon={List} label="Dashboard builder" />
        <SidebarItem to="/schemes" icon={List} label="Schemes" />
        <SidebarItem to="/field-configs" icon={List} label="Field configs" />
        <SidebarItem to="/screens" icon={List} label="Screens" />
        <SidebarItem to="/notifications-hub" icon={List} label="Notifications hub" />
        <SidebarItem to="/subscriptions" icon={List} label="Subscriptions" />
        <SidebarItem to="/mentions" icon={List} label="Mentions" />
        <SidebarItem to="/watchers" icon={List} label="Watchers" />
        <SidebarItem to="/votes" icon={List} label="Votes" />
        <SidebarItem to="/flags" icon={List} label="Flags" />
        <SidebarItem to="/bookmarks" icon={List} label="Bookmarks" />
        <SidebarItem to="/trash" icon={List} label="Trash" />
        <SidebarItem to="/recycle-bin" icon={List} label="Recycle bin" />
        <SidebarItem to="/copy" icon={List} label="Copy" />
        <SidebarItem to="/move" icon={List} label="Move" />
        <SidebarItem to="/bulk-edit" icon={List} label="Bulk edit" />
        <SidebarItem to="/link" icon={List} label="Link" />
        <SidebarItem to="/clone" icon={List} label="Clone" />
        <SidebarItem to="/history" icon={List} label="History" />
        <SidebarItem to="/activity" icon={List} label="Activity" />
        <SidebarItem to="/drafts" icon={List} label="Drafts" />
        <SidebarItem to="/reminders" icon={List} label="Reminders" />
      </SidebarSection>
    </nav>
  );
}
