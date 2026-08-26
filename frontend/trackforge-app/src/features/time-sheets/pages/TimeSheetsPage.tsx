import { useState } from "react";
import { Clock, Plus } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

export function TimeSheetsPage() {
  const { notify } = useToast();
  const [items, setItems] = useState([
    { id: "ts-1", person: "Alice", hours: 40, status: "Submitted" },
    { id: "ts-2", person: "Bob", hours: 35, status: "Open" },
  ]);
  const [person, setPerson] = useState("");
  const [hours, setHours] = useState("");
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!person.trim() || !hours.trim()) return;
    setItems((prev) => [...prev, { id: `ts-${Date.now()}`, person, hours: parseInt(hours), status: "Open" }]);
    setPerson("");
    setHours("");
    setShow(false);
    notify("Time entry created");
  };

  const submit = (id: string) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, status: "Submitted" } : i)));
    notify("Time entry submitted");
  };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Time sheets</h1>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-700">
          <Plus className="h-4 w-4" /> New entry
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={person} onChange={(e) => setPerson(e.target.value)} placeholder="Person" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <input type="number" value={hours} onChange={(e) => setHours(e.target.value)} placeholder="Hours" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="divide-y rounded-xl border border-slate-200 bg-white shadow-sm">
        {items.map((i) => (
          <div key={i.id} className="flex items-center justify-between p-4 transition-all duration-150 hover:bg-slate-50">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-slate-400" />
              <div>
                <div className="font-medium text-slate-900">{i.person}</div>
                <div className="text-xs text-slate-500">{i.hours}h</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase ${i.status === "Submitted" ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600"}`}>{i.status}</span>
              {i.status !== "Submitted" && (
                <button onClick={() => submit(i.id)} className="rounded-lg bg-blue-600 px-2 py-1 text-xs font-semibold text-white hover:bg-blue-700">Submit</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
