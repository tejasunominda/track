import { useState } from "react";
import { X, Plus } from "lucide-react";
import { createIssue } from "@/features/issues/api/issues";
import { CreateIssueInput } from "@/features/issues/types/issue";

const issueTypes = [
  { id: "story", name: "Story", defaultPriority: "Medium" },
  { id: "bug", name: "Bug", defaultPriority: "High" },
  { id: "task", name: "Task", defaultPriority: "Medium" },
];

const priorities = ["Lowest", "Low", "Medium", "High", "Highest"];
const assignees = [
  { id: "u-1", name: "Alice" },
  { id: "u-2", name: "Bob" },
  { id: "u-3", name: "Carol" },
];

interface Props {
  projectId: string;
  onClose: () => void;
  onCreated: () => void;
}

export function CreateIssueModal({ projectId, onClose, onCreated }: Props) {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState<CreateIssueInput>({
    projectId,
    issueTypeId: "story",
    summary: "",
    description: "",
    priority: "Medium",
    storyPoints: undefined,
    assigneeId: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.summary.trim()) return;
    setLoading(true);
    try {
      await createIssue(input);
      onCreated();
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 animate-fadeIn">
      <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Create issue</h2>
          <button onClick={onClose} className="rounded p-1 text-slate-400 transition-all duration-150 hover:text-slate-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Issue type</label>
              <select
                value={input.issueTypeId}
                onChange={(e) => setInput({ ...input, issueTypeId: e.target.value })}
                className="w-full rounded-lg border border-slate-200 p-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                {issueTypes.map((t) => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Priority</label>
              <select
                value={input.priority}
                onChange={(e) => setInput({ ...input, priority: e.target.value })}
                className="w-full rounded-lg border border-slate-200 p-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                {priorities.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Summary</label>
            <input
              value={input.summary}
              onChange={(e) => setInput({ ...input, summary: e.target.value })}
              placeholder="What needs to be done?"
              className="w-full rounded-lg border border-slate-200 p-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              autoFocus
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Description</label>
            <textarea
              value={input.description}
              onChange={(e) => setInput({ ...input, description: e.target.value })}
              placeholder="Add a description…"
              rows={4}
              className="w-full rounded-lg border border-slate-200 p-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Assignee</label>
              <select
                value={input.assigneeId}
                onChange={(e) => setInput({ ...input, assigneeId: e.target.value || undefined })}
                className="w-full rounded-lg border border-slate-200 p-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="">Unassigned</option>
                {assignees.map((a) => (
                  <option key={a.id} value={a.id}>{a.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Story points</label>
              <input
                type="number"
                min={0}
                value={input.storyPoints ?? ""}
                onChange={(e) => setInput({ ...input, storyPoints: e.target.value ? Number(e.target.value) : undefined })}
                className="w-full rounded-lg border border-slate-200 p-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition-all duration-150 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !input.summary.trim()}
              className="flex items-center gap-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md disabled:opacity-50"
            >
              {loading ? "Creating…" : (
                <>
                  <Plus className="h-4 w-4" />
                  Create issue
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
