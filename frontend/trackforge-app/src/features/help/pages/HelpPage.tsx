import { useMemo, useState } from "react";
import { Search } from "lucide-react";

const articles = [
  { id: "h-1", title: "Getting started with TrackForge", category: "Onboarding" },
  { id: "h-2", title: "How to create an issue", category: "Issues" },
  { id: "h-3", title: "Using TQL search", category: "Search" },
  { id: "h-4", title: "Creating and running sprints", category: "Sprints" },
  { id: "h-5", title: "Managing project members", category: "People" },
];

export function HelpPage() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() =>
    articles.filter((a) => a.title.toLowerCase().includes(query.toLowerCase()) || a.category.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Help center</h1>
      <div className="mb-4 flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm transition-all duration-200 focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-100">
        <Search className="h-4 w-4 text-slate-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search help articles…"
          className="flex-1 bg-transparent text-sm outline-none"
        />
      </div>
      <div className="divide-y rounded-xl border border-slate-200 bg-white shadow-sm">
        {filtered.length === 0 && (
          <div className="p-6 text-center text-slate-500">No articles found.</div>
        )}
        {filtered.map((a) => (
          <div key={a.id} className="flex items-center justify-between p-4 transition-all duration-150 hover:bg-slate-50">
            <div>
              <div className="font-medium text-slate-900">{a.title}</div>
              <div className="text-xs text-slate-500">{a.category}</div>
            </div>
            <button className="rounded bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-700 transition-all duration-150 hover:bg-blue-100">Read</button>
          </div>
        ))}
      </div>
    </div>
  );
}
