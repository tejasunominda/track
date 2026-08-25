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
        `flex items-center gap-3 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
          isActive
            ? "bg-blue-50 text-blue-700"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        }`
      }
    >
      <Icon className="h-4 w-4" />
      {label}
    </NavLink>
  );
}

function SidebarSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
        {title}
      </div>
      <div className="space-y-0.5">{children}</div>
    </div>
  );
}

/**
 * Jira-style left sidebar with global and project-level navigation.
 */
export function SidebarNav() {
  const projectMatch = useMatch("/projects/:projectId/*");
  const projectId = projectMatch?.params.projectId;

  return (
    <nav className="flex w-60 shrink-0 flex-col border-r border-slate-200 bg-slate-50 p-3">
      <SidebarSection title="TrackForge">
        <SidebarItem to="/" icon={Home} label="Your work" />
        <SidebarItem to="/projects" icon={Grid3X3} label="Projects" />
        <SidebarItem to="/filters" icon={Filter} label="Filters" />
        <SidebarItem to="/dashboards" icon={Layout} label="Dashboards" />
      </SidebarSection>

      {projectId && (
        <SidebarSection title="Project">
          <SidebarItem to={`/projects/${projectId}/board`} icon={Layout} label="Board" />
          <SidebarItem to={`/projects/${projectId}/issues`} icon={List} label="Issues" />
          <SidebarItem to={`/projects/${projectId}/backlog`} icon={List} label="Backlog" />
          <SidebarItem to={`/projects/${projectId}/reports`} icon={BarChart3} label="Reports" />
          <SidebarItem to={`/projects/${projectId}/settings`} icon={Settings} label="Project settings" />
        </SidebarSection>
      )}

      <SidebarSection title="Admin">
        <SidebarItem to="/people" icon={Users} label="People" />
        <SidebarItem to="/settings" icon={Settings} label="Settings" />
      </SidebarSection>
    </nav>
  );
}
