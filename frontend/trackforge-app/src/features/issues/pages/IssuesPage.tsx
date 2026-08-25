import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Search, Plus } from "lucide-react";
import { listIssues } from "@/features/issues/api/issues";
import { Issue } from "@/features/issues/types/issue";

const priorityColor: Record<string, string> = {
  Highest: "bg-red-100 text-red-700",
  High: "bg-orange-100 text-orange-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Low: "bg-slate-100 text-slate-600",
  Lowest: "bg-slate-100 text-slate-500",
};

function PriorityBadge({ priority }: { priority: string | null }) {
  if (!priority) return null;
  return (
    <span className={`rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase ${priorityColor[priority] ?? "bg-slate-100 text-slate-600"}`}>
      {priority}
    </span>
  );
}

function TypeIcon({ type }: { type: string | null }) {
  return (
    <span className="flex h-5 w-5 items-center justify-center rounded bg-blue-100 text-xs font-bold text-blue-700">
      {type ? type[0].toUpperCase() : "?"}
    </span>
  );
}

export function IssuesPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!projectId) return;
    listIssues(projectId)
      .then(setIssues)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [projectId]);

  if (loading) return <div className="p-6">Loading issues…</div>;

  return (
    <div className="h-full bg-slate-50 p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-900">Issues</h1>
        <button className="flex items-center gap-1 rounded bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-blue-700">
          <Plus className="h-4 w-4" />
          Create issue
        </button>
      </div>

      <div className="mb-4 flex items-center gap-3 rounded border bg-white p-3">
        <Search className="h-4 w-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search this list…"
          className="flex-1 bg-transparent text-sm outline-none"
        />
      </div>

      <div className="rounded border bg-white shadow-sm">
        <div className="grid grid-cols-12 gap-4 border-b border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold uppercase text-slate-500">
          <div className="col-span-6">Summary</div>
          <div className="col-span-2">Type</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Priority</div>
        </div>
        {issues.map((issue) => (
          <Link
            key={issue.id}
            to={`/issues/${issue.id}`}
            className="grid grid-cols-12 gap-4 items-center border-b border-slate-100 px-4 py-3 text-sm hover:bg-slate-50"
          >
            <div className="col-span-6 flex items-center gap-3">
              <TypeIcon type={issue.issueTypeName} />
              <div>
                <div className="font-medium text-slate-900">{issue.summary}</div>
                <div className="mt-0.5 text-[10px] text-slate-400 font-mono">{issue.id.slice(0, 8)}</div>
              </div>
            </div>
            <div className="col-span-2 text-slate-600">{issue.issueTypeName}</div>
            <div className="col-span-2">
              <span className="rounded bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                {issue.statusName}
              </span>
            </div>
            <div className="col-span-2">
              <PriorityBadge priority={issue.priority} />
            </div>
          </Link>
        ))}
        {issues.length === 0 && (
          <div className="p-6 text-center text-slate-500">No issues found.</div>
        )}
      </div>
    </div>
  );
}
