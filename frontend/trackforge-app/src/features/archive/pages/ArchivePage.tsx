import { useEffect, useState } from "react";
import { Archive, RotateCcw } from "lucide-react";
import { useToast } from "@/app/ToastProvider";
import { listIssues, updateIssue } from "@/features/issues/api/issues";
import { Issue } from "@/features/issues/types/issue";

export function ArchivePage() {
  const { notify } = useToast();
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    listIssues("p-1")
      .then((data) => setIssues(data.filter((i) => i.statusName === "Done")))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const restore = async (id: string) => {
    try {
      await updateIssue(id, { statusName: "To Do", statusCategory: "TODO" });
      setIssues((prev) => prev.filter((i) => i.id !== id));
      notify("Issue restored");
    } catch (err) {
      notify("Failed to restore", "error");
      console.error(err);
    }
  };

  if (loading) return <div className="p-6">Loading archive…</div>;

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Archive</h1>
      <div className="divide-y rounded-xl border border-slate-200 bg-white shadow-sm">
        {issues.length === 0 && <div className="p-6 text-center text-slate-500">No archived issues.</div>}
        {issues.map((i) => (
          <div key={i.id} className="flex items-center justify-between p-4 transition-all duration-150 hover:bg-slate-50">
            <div className="flex items-center gap-3">
              <Archive className="h-5 w-5 text-slate-400" />
              <div>
                <div className="font-medium text-slate-900">{i.summary}</div>
                <div className="text-xs text-slate-500">{i.id} · {i.statusName}</div>
              </div>
            </div>
            <button onClick={() => restore(i.id)} className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white transition-all duration-150 hover:bg-blue-700">
              <RotateCcw className="h-3 w-3" /> Restore
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
