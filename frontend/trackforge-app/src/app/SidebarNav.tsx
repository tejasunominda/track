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
