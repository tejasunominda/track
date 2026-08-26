import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Search, Plus } from "lucide-react";
import { listIssues } from "@/features/issues/api/issues";
import { Issue } from "@/features/issues/types/issue";
import { CreateIssueModal } from "@/features/issues/components/CreateIssueModal";

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
    <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${priorityColor[priority] ?? "bg-slate-100 text-slate-600"}`}>
      {priority}
    </span>
  );
}

function TypeIcon({ type }: { type: string | null }) {
  return (
    <span className="flex h-5 w-5 items-center justify-center rounded bg-blue-100 text-xs font-bold text-blue-700 ring-1 ring-blue-200">
      {type ? type[0].toUpperCase() : "?"}
    </span>
  );
}

function SkeletonRow() {
  return (
    <div className="grid grid-cols-12 items-center gap-4 border-b border-slate-100 px-4 py-3 animate-pulse">
      <div className="col-span-6 flex items-center gap-3">
        <div className="h-5 w-5 rounded bg-slate-200" />
        <div className="h-4 w-3/4 rounded bg-slate-200" />
      </div>
      <div className="col-span-2 h-4 w-16 rounded bg-slate-200" />
      <div className="col-span-2 h-4 w-20 rounded bg-slate-200" />
      <div className="col-span-2 h-4 w-14 rounded bg-slate-200" />
    </div>
  );
}

export function IssuesPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const [searchParams] = useSearchParams();
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    setShowModal(searchParams.get("create") === "true");
  }, [searchParams]);

  useEffect(() => {
    if (!projectId) return;
    setLoading(true);
    listIssues(projectId)
      .then(setIssues)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [projectId, refresh]);

  if (loading) {
    return (
      <div className="h-full bg-slate-50 p-6 animate-fadeIn">
        <div className="mb-4 h-8 w-32 animate-pulse rounded bg-slate-200" />
        <div className="mb-4 h-10 rounded border bg-white" />
        <div className="rounded border bg-white shadow-sm">
          <SkeletonRow />
          <SkeletonRow />
          <SkeletonRow />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Issues</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md active:translate-y-0"
        >
          <Plus className="h-4 w-4" />
          Create issue
        </button>
      </div>

      {showModal && projectId && (
        <CreateIssueModal
          projectId={projectId}
          onClose={() => setShowModal(false)}
          onCreated={() => setRefresh((r) => !r)}
        />
      )}

      <div className="mb-4 flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3 shadow-sm transition-all duration-200 focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-100">
        <Search className="h-4 w-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search this list…"
          className="flex-1 bg-transparent text-sm outline-none"
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="grid grid-cols-12 gap-4 border-b border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-500">
          <div className="col-span-6">Summary</div>
          <div className="col-span-2">Type</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Priority</div>
        </div>
        {issues.map((issue, idx) => (
          <Link
            key={issue.id}
            to={`/issues/${issue.id}`}
            className="grid grid-cols-12 gap-4 items-center border-b border-slate-100 px-4 py-3 text-sm transition-all duration-150 hover:-translate-x-1 hover:bg-blue-50/50"
            style={{ animationDelay: `${idx * 25}ms` }}
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
              <span className="rounded bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-700 ring-1 ring-blue-100">
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
