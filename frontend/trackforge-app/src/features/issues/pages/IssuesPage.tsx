import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { listIssues } from "@/features/issues/api/issues";
import { Issue } from "@/features/issues/types/issue";

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
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Issues</h1>
      <div className="divide-y rounded border bg-white">
        {issues.map((issue) => (
          <Link
            key={issue.id}
            to={`/issues/${issue.id}`}
            className="block p-4 hover:bg-slate-50"
          >
            <div className="flex items-center gap-2">
              <span className="rounded bg-slate-200 px-2 py-1 text-xs">{issue.issueTypeName}</span>
              <span className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-800">{issue.statusName}</span>
              <span className="font-medium">{issue.summary}</span>
            </div>
            <p className="mt-1 text-sm text-slate-600 line-clamp-2">{issue.description}</p>
          </Link>
        ))}
        {issues.length === 0 && (
          <div className="p-4 text-slate-500">No issues found.</div>
        )}
      </div>
    </div>
  );
}
