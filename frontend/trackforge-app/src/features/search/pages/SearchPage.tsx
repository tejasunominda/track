import { useState } from "react";
import { Search } from "lucide-react";

export function SearchPage() {
  const [q, setQ] = useState('type = "Bug" AND priority = "High"');
  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Search issues</h1>
      <div className="mb-6 flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
        <Search className="h-5 w-5 text-slate-400" />
        <input value={q} onChange={(e) => setQ(e.target.value)} className="flex-1 bg-transparent text-sm outline-none" />
        <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm">Search</button>
      </div>
      <p className="text-sm text-slate-500">TQL search: {q}</p>
    </div>
  );
}
