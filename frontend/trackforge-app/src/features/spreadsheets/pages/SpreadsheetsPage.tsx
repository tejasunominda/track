import { useState } from "react";
import { Grid3x3, Plus, Trash2, Table } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface Sheet { id: string; name: string; rows: number; cols: number; }

export function SpreadsheetsPage() {
  const { notify } = useToast();
  const [sheets, setSheets] = useState<Sheet[]>([
    { id: "sh-1", name: "Sprint planning", rows: 12, cols: 6 },
    { id: "sh-2", name: "Budget tracker", rows: 24, cols: 4 },
    { id: "sh-3", name: "Risk register", rows: 8, cols: 5 },
  ]);
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState<Sheet | null>(null);
  const [cells, setCells] = useState<Record<string, string>>({});
  const [active, setActive] = useState("A1");

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const s = { id: `sh-${Date.now()}`, name, rows: 10, cols: 5 };
    setSheets((p) => [...p, s]);
    setName(""); setShow(false); notify("Spreadsheet created");
  };
  const open = (s: Sheet) => { setSelected(s); setCells({}); setActive("A1"); };
  const setCell = (key: string, val: string) => setCells((p) => ({ ...p, [key]: val }));
  const remove = (id: string) => { setSheets((p) => p.filter((s) => s.id !== id)); if (selected?.id === id) setSelected(null); notify("Spreadsheet deleted"); };

  const colName = (i: number) => String.fromCharCode(65 + i);

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Spreadsheets</h1>
          <p className="text-sm text-slate-500">{sheets.length} sheets</p>
        </div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110">
          <Plus className="h-4 w-4" /> New sheet
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 flex gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Sheet name" className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      {!selected ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sheets.map((s) => (
            <div key={s.id} className="group cursor-pointer rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md" onClick={() => open(s)}>
              <div className="mb-3 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-md"><Grid3x3 className="h-5 w-5" /></div>
                <button onClick={(e) => { e.stopPropagation(); remove(s.id); }} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
              </div>
              <div className="font-bold text-slate-900">{s.name}</div>
              <div className="text-xs text-slate-500">{s.rows} rows × {s.cols} cols</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2"><Table className="h-5 w-5 text-slate-600" /><span className="font-bold text-slate-900">{selected.name}</span></div>
            <button onClick={() => setSelected(null)} className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-200">Back</button>
          </div>
          <div className="overflow-auto rounded-lg border border-slate-200">
          <table className="border-collapse text-sm">
            <thead>
              <tr>
                <th className="sticky left-0 z-10 border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-bold text-slate-400">#</th>
                {Array.from({ length: selected.cols }).map((_, c) => (
                  <th key={c} className="border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-500">{colName(c)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: selected.rows }).map((_, r) => (
                <tr key={r}>
                  <td className="sticky left-0 z-10 border border-slate-200 bg-slate-50 px-2 py-1 text-center text-xs font-bold text-slate-400">{r + 1}</td>
                  {Array.from({ length: selected.cols }).map((_, c) => {
                    const key = `${colName(c)}${r + 1}`;
                    return (
                      <td key={c} className="border border-slate-200 p-0">
                        <input
                          value={cells[key] ?? ""}
                          onChange={(e) => setCell(key, e.target.value)}
                          onFocus={() => setActive(key)}
                          className={`w-full px-2 py-1 text-sm outline-none ${active === key ? "ring-1 ring-blue-500 bg-blue-50" : "hover:bg-slate-50"}`}
                          placeholder=""
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          <div className="mt-2 text-xs text-slate-400">Active cell: <span className="font-mono font-bold text-slate-600">{active}</span></div>
        </div>
      )}
    </div>
  );
}
