import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Layout, List, BarChart3, Plus, Layers, AlertCircle } from "lucide-react";
import { listProjects } from "@/features/projects/api/projects";
import { listIssues } from "@/features/issues/api/issues";
import { CreateProjectModal } from "./CreateProjectModal";

const templateIcon: Record<string, string> = {
  SCRUM: "S",
  KANBAN: "K",
  BUSINESS: "B",
};

const templateColor: Record<string, string> = {
  SCRUM: "bg-blue-100 text-blue-700 ring-blue-200",
  KANBAN: "bg-green-100 text-green-700 ring-green-200",
  BUSINESS: "bg-purple-100 text-purple-700 ring-purple-200",
};

function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-start justify-between">
        <div className="h-10 w-10 rounded bg-slate-200" />
        <div className="h-4 w-16 rounded bg-slate-200" />
      </div>
      <div className="mb-2 h-5 w-3/4 rounded bg-slate-200" />
      <div className="mb-4 h-4 w-full rounded bg-slate-200" />
      <div className="flex gap-2 border-t border-slate-100 pt-3">
        <div className="h-8 flex-1 rounded bg-slate-200" />
        <div className="h-8 flex-1 rounded bg-slate-200" />
      </div>
    </div>
  );
}

export function ProjectList() {
  const { data, isLoading, error } = useQuery({ queryKey: ["projects"], queryFn: listProjects });
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [showCreate, setShowCreate] = useState(false);

  useEffect(() => {
    if (!data) return;
    Promise.all(data.map((p) => listIssues(p.id).then((issues) => ({ id: p.id, count: issues.length }))))
      .then((rows) => setCounts(Object.fromEntries(rows.map((r) => [r.id, r.count]))))
      .catch(console.error);
  }, [data]);

  if (isLoading) {
    return (
      <div className="h-full bg-slate-50 p-6 animate-fadeIn">
        <div className="mb-6 h-8 w-48 animate-pulse rounded bg-slate-200" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full bg-slate-50 p-6 animate-fadeIn">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Projects</h1>
            <p className="text-sm text-slate-500">Select a project to start tracking work.</p>
          </div>
          <button onClick={() => setShowCreate(true)} className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md active:translate-y-0">
            <Plus className="h-4 w-4" />
            Create project
          </button>
        </div>
        <div className="flex flex-col items-center justify-center rounded-xl border border-amber-200 bg-amber-50 p-12 text-center">
          <AlertCircle className="mb-3 h-10 w-10 text-amber-500" />
          <p className="text-sm font-semibold text-amber-800">Couldn't load projects</p>
          <p className="mt-1 text-xs text-amber-600">Backend is not running. Start the backend or use mock mode.</p>
        </div>
        <CreateProjectModal open={showCreate} onClose={() => setShowCreate(false)} />
      </div>
    );
  }

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Projects</h1>
          <p className="text-sm text-slate-500">Select a project to start tracking work.</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md active:translate-y-0">
          <Plus className="h-4 w-4" />
          Create project
        </button>
      </div>

      {data?.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm">
          No projects yet. Create one to get started.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data?.map((p, idx) => (
            <div
              key={p.id}
              className="group flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
              style={{ animationDelay: `${idx * 40}ms` }}
            >
              <div className="mb-3 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-lg text-lg font-bold ring-2 transition-all duration-200 group-hover:scale-110 ${templateColor[p.template] ?? "bg-slate-100 text-slate-700 ring-slate-200"}`}>
                    {templateIcon[p.template] ?? "?"}
                  </div>
                  <div>
                    <div className="text-lg font-bold text-slate-900">{p.name}</div>
                    <div className="text-xs font-mono text-slate-400">{p.projectKey}</div>
                  </div>
                </div>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-500">
                  {p.status.toLowerCase()}
                </span>
              </div>
              <p className="mb-4 flex-1 text-sm text-slate-600 line-clamp-2">{p.description}</p>
              <div className="mb-3 flex items-center gap-2 text-xs text-slate-500">
                <Layers className="h-3.5 w-3.5" />
                {counts[p.id] ?? 0} issues
              </div>
              <div className="flex items-center gap-2 border-t border-slate-100 pt-3">
                <Link
                  to={`/projects/${p.id}/board`}
                  className="flex flex-1 items-center justify-center gap-1 rounded-lg py-1.5 text-sm font-medium text-slate-600 transition-all duration-150 hover:-translate-y-0.5 hover:bg-slate-50 hover:text-blue-700"
                >
                  <Layout className="h-4 w-4" />
                  Board
                </Link>
                <Link
                  to={`/projects/${p.id}/issues`}
                  className="flex flex-1 items-center justify-center gap-1 rounded-lg py-1.5 text-sm font-medium text-slate-600 transition-all duration-150 hover:-translate-y-0.5 hover:bg-slate-50 hover:text-blue-700"
                >
                  <List className="h-4 w-4" />
                  Issues
                </Link>
                <Link
                  to={`/projects/${p.id}/reports`}
                  className="flex flex-1 items-center justify-center gap-1 rounded-lg py-1.5 text-sm font-medium text-slate-600 transition-all duration-150 hover:-translate-y-0.5 hover:bg-slate-50 hover:text-blue-700"
                >
                  <BarChart3 className="h-4 w-4" />
                  Reports
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
      <CreateProjectModal open={showCreate} onClose={() => setShowCreate(false)} />
    </div>
  );
}
