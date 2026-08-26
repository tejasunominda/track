import { useState } from "react";
import { FileText, Plus, Send } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

export function QuotesPage() {
  const { notify } = useToast();
  const [items, setItems] = useState([
    { id: "q-1", title: "Quote 123", amount: 5000, status: "Sent" },
    { id: "q-2", title: "Quote 124", amount: 12000, status: "Draft" },
  ]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !amount.trim()) return;
    setItems((prev) => [...prev, { id: `q-${Date.now()}`, title, amount: parseInt(amount), status: "Draft" }]);
    setTitle("");
    setAmount("");
    setShow(false);
    notify("Quote created");
  };

  const send = (id: string) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, status: "Sent" } : i)));
    notify("Quote sent");
  };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Quotes</h1>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-700">
          <Plus className="h-4 w-4" /> New quote
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Quote title" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="divide-y rounded-xl border border-slate-200 bg-white shadow-sm">
        {items.map((i) => (
          <div key={i.id} className="flex items-center justify-between p-4 transition-all duration-150 hover:bg-slate-50">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-slate-400" />
              <div>
                <div className="font-medium text-slate-900">{i.title}</div>
                <div className="text-xs text-slate-500">${i.amount.toLocaleString()}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase ${i.status === "Sent" ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-600"}`}>{i.status}</span>
              {i.status === "Draft" && (
                <button onClick={() => send(i.id)} className="flex items-center gap-1 rounded-lg bg-blue-600 px-2 py-1 text-xs font-semibold text-white hover:bg-blue-700">
                  <Send className="h-3 w-3" /> Send
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
