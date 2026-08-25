import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Layout, List, BarChart3, Plus } from "lucide-react";
import { listProjects } from "@/features/projects/api/projects";

const templateIcon: Record<string, string> = {
  SCRUM: "S",
  KANBAN: "K",
  BUSINESS: "B",
};

const templateColor: Record<string, string> = {
  SCRUM: "bg-blue-100 text-blue-700",
  KANBAN: "bg-green-100 text-green-700",
  BUSINESS: "bg-purple-100 text-purple-700",
};

export function ProjectList() {
  const { data, isLoading } = useQuery({ queryKey: ["projects"], queryFn: listProjects });

  if (isLoading) return <div className="p-6">Loading projects…</div>;

  return (
    <div className="h-full bg-slate-50 p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Projects</h1>
          <p className="text-sm text-slate-500">Select a project to start tracking work.</p>
        </div>
        <button className="flex items-center gap-1 rounded bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-blue-700">
          <Plus className="h-4 w-4" />
          Create project
        </button>
      </div>

      {data?.length === 0 ? (
        <div className="rounded border bg-white p-8 text-center text-slate-500">
          No projects yet. Create one to get started.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data?.map((p) => (
            <div
              key={p.id}
              className="group flex flex-col rounded border bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-3 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded font-bold ${templateColor[p.template] ?? "bg-slate-100 text-slate-700"}`}>
                    {templateIcon[p.template] ?? "?"}
                  </div>
                  <div>
                    <div className="text-lg font-bold text-slate-900">{p.name}</div>
                    <div className="text-xs font-mono text-slate-400">{p.projectKey}</div>
                  </div>
                </div>
                <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase text-slate-500">
                  {p.status.toLowerCase()}
                </span>
              </div>
              <p className="mb-4 flex-1 text-sm text-slate-600 line-clamp-2">{p.description}</p>
              <div className="flex items-center gap-2 border-t border-slate-100 pt-3">
                <Link
                  to={`/projects/${p.id}/board`}
                  className="flex flex-1 items-center justify-center gap-1 rounded py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
                >
                  <Layout className="h-4 w-4" />
                  Board
                </Link>
                <Link
                  to={`/projects/${p.id}/issues`}
                  className="flex flex-1 items-center justify-center gap-1 rounded py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
                >
                  <List className="h-4 w-4" />
                  Issues
                </Link>
                <Link
                  to={`/projects/${p.id}/reports`}
                  className="flex flex-1 items-center justify-center gap-1 rounded py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
                >
                  <BarChart3 className="h-4 w-4" />
                  Reports
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
