import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { apiFetch } from "@/api/client";

interface Project {
  id: string;
  name: string;
  projectKey: string;
}

const labels: Record<string, string> = {
  dashboard: "Dashboard",
  projects: "Projects",
  issues: "Issues",
  board: "Board",
  filters: "Filters",
  reports: "Reports",
  settings: "Settings",
  profile: "Profile",
  people: "People",
};

export function Breadcrumbs() {
  const { pathname } = useLocation();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    apiFetch<Project[]>("/projects").then(setProjects).catch(console.error);
  }, []);

  const segments = pathname.split("/").filter(Boolean);
  const crumbs: { label: string; to?: string }[] = [{ label: "Home", to: "/" }];

  let i = 0;
  while (i < segments.length) {
    const seg = segments[i];
    if (seg === "projects" && segments[i + 1]) {
      const pid = segments[i + 1];
      const p = projects.find((x) => x.id === pid);
      crumbs.push({ label: "Projects", to: "/" });
      crumbs.push({ label: p?.name ?? pid, to: `/projects/${pid}` });
      if (segments[i + 2]) {
        crumbs.push({ label: labels[segments[i + 2]] ?? segments[i + 2], to: pathname });
      }
      break;
    }
    if (seg === "issues" && segments[i + 1]) {
      crumbs.push({ label: "Issues", to: "/issues" });
      crumbs.push({ label: "Detail", to: pathname });
      break;
    }
    crumbs.push({ label: labels[seg] ?? seg, to: `/${segments.slice(0, i + 1).join("/")}` });
    i += 1;
  }

  if (segments.length === 0) {
    crumbs.push({ label: "Dashboard" });
  }

  return (
    <nav className="flex h-9 items-center gap-1 border-b border-slate-100 bg-slate-50 px-4 text-xs font-medium text-slate-500">
      {crumbs.map((c, idx) => (
        <div key={`${c.label}-${idx}`} className="flex items-center gap-1">
          {idx > 0 && <ChevronRight className="h-3 w-3 text-slate-300" />}
          {c.to ? (
            <Link to={c.to} className="flex items-center gap-1 rounded px-1 py-0.5 text-slate-600 hover:bg-blue-50 hover:text-blue-700">
              {idx === 0 && <Home className="h-3 w-3" />}
              {c.label}
            </Link>
          ) : (
            <span className="text-slate-800">{c.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
