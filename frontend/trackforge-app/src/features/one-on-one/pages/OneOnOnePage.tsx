import { useState } from "react";
import { Plus, Users } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

export function OneOnOnePage() {
  const { notify } = useToast();
  const [items, setItems] = useState([
    { id: "oo-1", attendee: "Alice", notes: "Goals", status: "Scheduled" },
    { id: "oo-2", attendee: "Bob", notes: "Feedback", status: "Done" },
  ]);
  const [attendee, setAttendee] = useState("");
  const [notes, setNotes] = useState("");
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!attendee.trim() || !notes.trim()) return;
    setItems((prev) => [...prev, { id: `oo-${Date.now()}`, attendee, notes, status: "Scheduled" }]);
    setAttendee("");
    setNotes("");
    setShow(false);
    notify("1:1 created");
  };

  const done = (id: string) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, status: "Done" } : i)));
    notify("1:1 completed");
  };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">1:1s</h1>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-700">
          <Plus className="h-4 w-4" /> New
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={attendee} onChange={(e) => setAttendee(e.target.value)} placeholder="Attendee" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <input value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Notes" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="divide-y rounded-xl border border-slate-200 bg-white shadow-sm">
        {items.map((i) => (
          <div key={i.id} className="flex items-center justify-between p-4 transition-all duration-150 hover:bg-slate-50">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-slate-400" />
              <div>
                <div className="font-medium text-slate-900">{i.attendee}</div>
                <div className="text-xs text-slate-500">{i.notes}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase ${i.status === "Done" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>{i.status}</span>
              {i.status !== "Done" && (
                <button onClick={() => done(i.id)} className="rounded-lg bg-blue-600 px-2 py-1 text-xs font-semibold text-white hover:bg-blue-700">Done</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
