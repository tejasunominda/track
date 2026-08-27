import { useState } from "react";
import { Network, Plus, Trash2, ChevronRight, ChevronDown } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface Node { id: string; label: string; children: Node[]; }

export function MindMapPage() {
  const { notify } = useToast();
  const [root, setRoot] = useState<Node>({
    id: "root",
    label: "TrackForge",
    children: [
      { id: "n-1", label: "Frontend", children: [
        { id: "n-1-1", label: "React UI", children: [] },
        { id: "n-1-2", label: "Design system", children: [] },
      ]},
      { id: "n-2", label: "Backend", children: [
        { id: "n-2-1", label: "Spring Boot", children: [] },
        { id: "n-2-2", label: "PostgreSQL", children: [] },
      ]},
      { id: "n-3", label: "DevOps", children: [] },
    ],
  });
  const [expanded, setExpanded] = useState<Set<string>>(new Set(["root", "n-1", "n-2"]));
  const [adding, setAdding] = useState<string | null>(null);
  const [newLabel, setNewLabel] = useState("");

  const toggle = (id: string) => setExpanded((p) => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const addChild = (parentId: string) => {
    if (!newLabel.trim()) return;
    const addRecursive = (node: Node): Node => {
      if (node.id === parentId) return { ...node, children: [...node.children, { id: `n-${Date.now()}`, label: newLabel, children: [] }] };
      return { ...node, children: node.children.map(addRecursive) };
    };
    setRoot(addRecursive(root));
    setExpanded((p) => new Set(p).add(parentId));
    setNewLabel(""); setAdding(null); notify("Node added");
  };
  const removeNode = (id: string) => {
    const removeRecursive = (node: Node): Node => ({ ...node, children: node.children.filter((c) => c.id !== id).map(removeRecursive) });
    if (id === "root") { notify("Cannot delete root"); return; }
    setRoot(removeRecursive(root)); notify("Node removed");
  };
  const updateLabel = (id: string, label: string) => {
    const update = (node: Node): Node => node.id === id ? { ...node, label } : { ...node, children: node.children.map(update) };
    setRoot(update(root));
  };

  const render = (node: Node, depth: number = 0) => {
    const isExpanded = expanded.has(node.id);
    const hasChildren = node.children.length > 0;
    return (
      <div key={node.id}>
        <div className="group flex items-center gap-2 rounded-lg py-1.5 pr-2 transition-all hover:bg-slate-50" style={{ paddingLeft: depth * 24 }}>
          {hasChildren ? (
            <button onClick={() => toggle(node.id)} className="text-slate-400 hover:text-slate-700">{isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}</button>
          ) : <div className="w-4" />}
          <div className={`flex h-7 w-7 items-center justify-center rounded-lg text-white shadow-sm ${depth === 0 ? "bg-gradient-to-br from-blue-600 to-indigo-600" : "bg-gradient-to-br from-slate-400 to-slate-600"}`}><Network className="h-3.5 w-3.5" /></div>
          <input value={node.label} onChange={(e) => updateLabel(node.id, e.target.value)} className="flex-1 rounded border border-transparent bg-transparent px-1 text-sm font-medium text-slate-800 outline-none focus:border-blue-500" />
          <button onClick={() => { setAdding(node.id); setNewLabel(""); }} className="rounded p-1 text-slate-300 opacity-0 transition-all hover:bg-green-100 hover:text-green-600 group-hover:opacity-100"><Plus className="h-3.5 w-3.5" /></button>
          {depth > 0 && <button onClick={() => removeNode(node.id)} className="rounded p-1 text-slate-300 opacity-0 transition-all hover:bg-red-100 hover:text-red-600 group-hover:opacity-100"><Trash2 className="h-3.5 w-3.5" /></button>}
        </div>
        {adding === node.id && (
          <div className="flex items-center gap-2 py-1.5" style={{ paddingLeft: (depth + 1) * 24 + 20 }}>
            <input value={newLabel} onChange={(e) => setNewLabel(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addChild(node.id)} placeholder="Node label" className="rounded-lg border border-blue-300 px-2 py-1 text-sm outline-none focus:border-blue-500" autoFocus />
            <button onClick={() => addChild(node.id)} className="rounded-lg bg-blue-600 px-2 py-1 text-xs font-bold text-white hover:bg-blue-700">Add</button>
            <button onClick={() => setAdding(null)} className="rounded-lg bg-slate-100 px-2 py-1 text-xs text-slate-600 hover:bg-slate-200">Cancel</button>
          </div>
        )}
        {isExpanded && node.children.map((c) => render(c, depth + 1))}
      </div>
    );
  };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Mind map</h1>
        <p className="text-sm text-slate-500">Click + to add child nodes · click arrows to expand/collapse</p>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">{render(root)}</div>
    </div>
  );
}
