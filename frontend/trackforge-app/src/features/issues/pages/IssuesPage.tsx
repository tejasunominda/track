import { useEffect, useMemo, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Download, Search, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/app/ToastProvider";
import { listIssues, updateIssue } from "@/features/issues/api/issues";
import { Issue } from "@/features/issues/types/issue";
import { CreateIssueModal } from "@/features/issues/components/CreateIssueModal";

const priorityColor: Record<string, string> = {
  Highest: "bg-red-100 text-red-700",
  High: "bg-orange-100 text-orange-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Low: "bg-slate-100 text-slate-600",
  Lowest: "bg-slate-100 text-slate-500",
};

const statusOptions = ["All", "To Do", "In Progress", "Done"];

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
      <div className="col-span-1 h-4 w-4 rounded bg-slate-200" />
      <div className="col-span-5 flex items-center gap-3">
        <div className="h-5 w-5 rounded bg-slate-200" />
        <div className="h-4 w-3/4 rounded bg-slate-200" />
      </div>
      <div className="col-span-2 h-4 w-16 rounded bg-slate-200" />
      <div className="col-span-2 h-4 w-20 rounded bg-slate-200" />
      <div className="col-span-2 h-4 w-14 rounded bg-slate-200" />
    </div>
  );
}

function downloadCsv(filename: string, rows: string[][]) {
  const csv = rows.map((r) => r.map((x) => `"${String(x).replace(/"/g, '""')}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function IssuesPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const [searchParams] = useSearchParams();
  const { notify } = useToast();
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [searchText, setSearchText] = useState(searchParams.get("search") ?? "");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selected, setSelected] = useState<Set<string>>(new Set());

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

  const filtered = useMemo(() => {
    return issues.filter((i) => {
      const matchesText = [i.summary, i.description ?? "", i.id].some((f) => f.toLowerCase().includes(searchText.toLowerCase()));
      const matchesStatus = statusFilter === "All" || i.statusName === statusFilter;
      return matchesText && matchesStatus;
    });
  }, [issues, searchText, statusFilter]);

  const toggleSelect = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };

  const selectAll = () => {
    if (selected.size === filtered.length) setSelected(new Set());
    else setSelected(new Set(filtered.map((i) => i.id)));
  };

  const exportCsv = () => {
    const rows = [["ID", "Summary", "Type", "Status", "Priority", "Assignee"], ...filtered.map((i) => [i.id, i.summary, i.issueTypeName ?? "", i.statusName ?? "", i.priority ?? "", i.assigneeId ?? ""])];
    downloadCsv(`${projectId ?? "project"}-issues.csv`, rows);
    notify("CSV exported");
  };

  const handleStatusChange = async (issue: Issue, statusName: string) => {
    const statusMap: Record<string, { statusName: string; statusCategory: string }> = {
      "To Do": { statusName: "To Do", statusCategory: "TODO" },
      "In Progress": { statusName: "In Progress", statusCategory: "IN_PROGRESS" },
      "Done": { statusName: "Done", statusCategory: "DONE" },
    };
    const mapped = statusMap[statusName];
    if (!mapped || !projectId) return;
    try {
      await updateIssue(issue.id, mapped);
      setIssues((prev) => prev.map((i) => (i.id === issue.id ? { ...i, ...mapped } : i)));
      notify("Status updated");
    } catch (err) {
      notify("Failed to update status", "error");
      console.error(err);
    }
  };

  const bulkDelete = async () => {
    // Not implemented in API; clear selection for now.
    setSelected(new Set());
    notify(`${selected.size} selected`);
  };

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

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="flex flex-1 items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm transition-all duration-200 focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-100">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search this list…"
            className="flex-1 bg-transparent text-sm outline-none"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none"
        >
          {statusOptions.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <button
          onClick={exportCsv}
          className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-all duration-150 hover:-translate-y-0.5 hover:bg-slate-50"
        >
          <Download className="h-4 w-4" />
          Export
        </button>
      </div>

      {selected.size > 0 && (
        <div className="mb-3 flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-sm text-blue-700">
          <span className="font-medium">{selected.size} selected</span>
          <button onClick={bulkDelete} className="flex items-center gap-1 rounded bg-blue-100 px-2 py-1 text-xs font-semibold hover:bg-blue-200">
            <Trash2 className="h-3 w-3" />
            Clear
          </button>
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="grid grid-cols-12 gap-4 border-b border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-500">
          <div className="col-span-1 flex items-center">
            <input
              type="checkbox"
              checked={filtered.length > 0 && selected.size === filtered.length}
              onChange={selectAll}
            />
          </div>
          <div className="col-span-5">Summary</div>
          <div className="col-span-2">Type</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Priority</div>
        </div>
        {filtered.map((issue, idx) => (
          <div
            key={issue.id}
            className="grid grid-cols-12 items-center gap-4 border-b border-slate-100 px-4 py-3 text-sm transition-all duration-150 hover:-translate-x-1 hover:bg-blue-50/50"
            style={{ animationDelay: `${idx * 25}ms` }}
          >
            <div className="col-span-1 flex items-center">
              <input
                type="checkbox"
                checked={selected.has(issue.id)}
                onChange={() => toggleSelect(issue.id)}
              />
            </div>
            <Link to={`/issues/${issue.id}`} className="col-span-5 flex items-center gap-3">
              <TypeIcon type={issue.issueTypeName} />
              <div>
                <div className="font-medium text-slate-900">{issue.summary}</div>
                <div className="mt-0.5 text-[10px] text-slate-400 font-mono">{issue.id.slice(0, 8)}</div>
              </div>
            </Link>
            <div className="col-span-2 text-slate-600">{issue.issueTypeName}</div>
            <div className="col-span-2">
              <select
                value={issue.statusName ?? ""}
                onChange={(e) => handleStatusChange(issue, e.target.value)}
                className="rounded border border-slate-200 bg-white px-2 py-1 text-xs outline-none"
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </div>
            <div className="col-span-2">
              <PriorityBadge priority={issue.priority} />
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="p-6 text-center text-slate-500">No issues found.</div>
        )}
      </div>
    </div>
  );
}
