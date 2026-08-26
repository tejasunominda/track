import { useState } from "react";
import { MessageSquare, Plus, Send } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

export function InAppMessagesPage() {
  const { notify } = useToast();
  const [items, setItems] = useState([
    { id: "m-1", title: "Welcome", body: "Welcome to TrackForge", active: true },
    { id: "m-2", title: "New feature", body: "Check out the roadmap", active: false },
  ]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    setItems((prev) => [...prev, { id: `m-${Date.now()}`, title, body, active: false }]);
    setTitle("");
    setBody("");
    setShow(false);
    notify("Message created");
  };

  const toggle = (id: string) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, active: !i.active } : i)));
    notify("Message updated");
  };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">In-app messages</h1>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-700">
          <Plus className="h-4 w-4" /> New
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 grid gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <input value={body} onChange={(e) => setBody(e.target.value)} placeholder="Body" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="divide-y rounded-xl border border-slate-200 bg-white shadow-sm">
        {items.map((i) => (
          <div key={i.id} className="flex items-center justify-between p-4 transition-all duration-150 hover:bg-slate-50">
            <div className="flex items-center gap-3">
              <MessageSquare className="h-5 w-5 text-slate-400" />
              <div>
                <div className="font-medium text-slate-900">{i.title}</div>
                <div className="text-xs text-slate-500">{i.body}</div>
              </div>
            </div>
            <button onClick={() => toggle(i.id)} className={`flex items-center gap-1 rounded px-2 py-0.5 text-[10px] font-bold uppercase transition-all duration-150 ${i.active ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600"}`}>
              <Send className="h-3 w-3" /> {i.active ? "Active" : "Inactive"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
