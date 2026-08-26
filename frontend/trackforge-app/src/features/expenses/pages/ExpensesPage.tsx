import { useState } from "react";
import { Plus, Receipt } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

export function ExpensesPage() {
  const { notify } = useToast();
  const [items, setItems] = useState([
    { id: "ex-1", description: "AWS bill", amount: 450, category: "Infrastructure" },
    { id: "ex-2", description: "Travel", amount: 1200, category: "Operations" },
  ]);
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Operations");
  const [show, setShow] = useState(false);

  const total = items.reduce((s, i) => s + i.amount, 0);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!desc.trim() || !amount.trim()) return;
    setItems((prev) => [...prev, { id: `ex-${Date.now()}`, description: desc, amount: parseInt(amount), category }]);
    setDesc("");
    setAmount("");
    setShow(false);
    notify("Expense added");
  };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Expenses</h1>
          <p className="text-sm text-slate-500">Total: ${total.toLocaleString()}</p>
        </div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-700">
          <Plus className="h-4 w-4" /> New expense
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Description" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none">
            <option value="Operations">Operations</option>
            <option value="Infrastructure">Infrastructure</option>
            <option value="Marketing">Marketing</option>
            <option value="R&D">R&D</option>
          </select>
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="divide-y rounded-xl border border-slate-200 bg-white shadow-sm">
        {items.map((i) => (
          <div key={i.id} className="flex items-center justify-between p-4 transition-all duration-150 hover:bg-slate-50">
            <div className="flex items-center gap-3">
              <Receipt className="h-5 w-5 text-slate-400" />
              <div>
                <div className="font-medium text-slate-900">{i.description}</div>
                <div className="text-xs text-slate-500">{i.category}</div>
              </div>
            </div>
            <div className="text-sm font-bold text-slate-700">${i.amount.toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
