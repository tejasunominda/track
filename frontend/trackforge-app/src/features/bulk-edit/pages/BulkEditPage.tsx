import { useState } from "react";
import { Edit3, CheckSquare, Square, Trash2, Tag, User, Flag } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface Issue { id: string; key: string; summary: string; priority: string; assignee: string; labels: string; selected: boolean; }

export function BulkEditPage() {
  const { notify } = useToast();
  const [issues, setIssues] = useState<Issue[]>([
    { id: "i-1", key: "ENG-1", summary: "Fix login bug", priority: "High", assignee: "Alice", labels: "bug", selected: false },
    { id: "i-2", key: "ENG-2", summary: "Add dark mode", priority: "Medium", assignee: "Bob", labels: "feature", selected: false },
    { id: "i-3", key: "ENG-3", summary: "API rate limit", priority: "Urgent", assignee: "Alice", labels: "bug, api", selected: false },
    { id: "i-4", key: "ENG-4", summary: "Update docs", priority: "Low", assignee: "Charlie", labels: "docs", selected: false },
    { id: "i-5", key: "ENG-5", summary: "Refactor auth", priority: "High", assignee: "Bob", labels: "tech-debt", selected: false },
  ]);
  const [bulkPriority, setBulkPriority] = useState("");
  const [bulkAssignee, setBulkAssignee] = useState("");
  const [bulkLabel, setBulkLabel] = useState("");

  const toggle = (id: string) => setIssues((p) => p.map((i) => (i.id === id ? { ...i, selected: !i.selected } : i)));
  const toggleAll = () => setIssues((p) => p.map((i) => ({ ...i, selected: !p.every((x) => x.selected) })));
  const selected = issues.filter((i) => i.selected);

  const apply = () => {
    if (selected.length === 0) { notify("Select issues first"); return; }
    setIssues((p) => p.map((i) => i.selected ? {
      ...i,
      priority: bulkPriority || i.priority,
      assignee: bulkAssignee || i.assignee,
      labels: bulkLabel ? `${i.labels}, ${bulkLabel}` : i.labels,
    } : i));
    setBulkPriority(""); setBulkAssignee(""); setBulkLabel("");
    notify(`Bulk edit applied to ${selected.length} issues`);
  };
  const remove = (id: string) => { setIssues((p) => p.filter((i) => i.id !== id)); notify("Issue removed"); };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Bulk edit</h1>
        <p className="text-sm text-slate-500">{selected.length} of {issues.length} selected</p>
      </div>
      <div className="mb-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-700"><Edit3 className="h-4 w-4" /> Bulk actions</div>
        <div className="grid gap-3 sm:grid-cols-4">
          <div>
            <label className="mb-1 block text-xs font-bold text-slate-500">Priority</label>
            <select value={bulkPriority} onChange={(e) => setBulkPriority(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500">
              <option value="">Keep current</option><option>Low</option><option>Medium</option><option>High</option><option>Urgent</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-bold text-slate-500">Assignee</label>
            <input value={bulkAssignee} onChange={(e) => setBulkAssignee(e.target.value)} placeholder="Keep current" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-bold text-slate-500">Add label</label>
            <input value={bulkLabel} onChange={(e) => setBulkLabel(e.target.value)} placeholder="e.g. sprint-12" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          </div>
          <div className="flex items-end">
            <button onClick={apply} disabled={selected.length === 0} className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40">Apply to {selected.length || ""}</button>
          </div>
        </div>
      </div>
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr className="text-xs font-bold uppercase text-slate-500">
              <th className="px-4 py-3 text-left"><button onClick={toggleAll}>{issues.every((i) => i.selected) ? <CheckSquare className="h-4 w-4 text-blue-600" /> : <Square className="h-4 w-4 text-slate-400" />}</button></th>
              <th className="px-4 py-3 text-left">Issue</th>
              <th className="px-4 py-3 text-left">Priority</th>
              <th className="px-4 py-3 text-left">Assignee</th>
              <th className="px-4 py-3 text-left">Labels</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {issues.map((i) => (
              <tr key={i.id} className={`transition-all hover:bg-slate-50 ${i.selected ? "bg-blue-50" : ""}`}>
                <td className="px-4 py-3"><button onClick={() => toggle(i.id)}>{i.selected ? <CheckSquare className="h-4 w-4 text-blue-600" /> : <Square className="h-4 w-4 text-slate-400" />}</button></td>
                <td className="px-4 py-3"><div className="flex items-center gap-2"><span className="rounded bg-slate-900 px-2 py-0.5 font-mono text-xs font-bold text-white">{i.key}</span><span className="font-medium text-slate-900">{i.summary}</span></div></td>
                <td className="px-4 py-3"><span className="flex items-center gap-1 text-xs"><Flag className="h-3 w-3 text-slate-400" /> {i.priority}</span></td>
                <td className="px-4 py-3"><span className="flex items-center gap-1 text-xs"><User className="h-3 w-3 text-slate-400" /> {i.assignee}</span></td>
                <td className="px-4 py-3"><span className="flex items-center gap-1 text-xs"><Tag className="h-3 w-3 text-slate-400" /> {i.labels}</span></td>
                <td className="px-4 py-3 text-right"><button onClick={() => remove(i.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
