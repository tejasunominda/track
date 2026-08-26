import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { listIssues } from "@/features/issues/api/issues";
import { Issue } from "@/features/issues/types/issue";

export function BacklogPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    if (!projectId) return;
    listIssues(projectId).then(setIssues).catch(console.error);
  }, [projectId]);

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Backlog</h1>
      <div className="divide-y rounded-xl border border-slate-200 bg-white shadow-sm">
        {issues.filter((i) => i.statusName === "To Do").map((i) => (
          <div key={i.id} className="flex items-center justify-between p-4 transition-all duration-150 hover:bg-slate-50">
            <div>
              <div className="font-semibold text-slate-900">{i.summary}</div>
              <div className="text-xs text-slate-400">{i.issueTypeName} · {i.priority}</div>
            </div>
            <div className="text-xs font-mono text-slate-400">{i.id.slice(0, 8)}</div>
          </div>
        ))}
        {issues.length === 0 && <div className="p-6 text-slate-500">Loading backlog…</div>}
      </div>
    </div>
  );
}
