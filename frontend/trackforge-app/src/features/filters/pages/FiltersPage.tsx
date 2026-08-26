import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Search, Trash2 } from "lucide-react";
import { createFilter, deleteFilter, listFilters, SavedFilter } from "@/features/filters/api/filters";

export function FiltersPage() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<SavedFilter[]>([]);
  const [name, setName] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listFilters()
      .then(setFilters)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !query.trim()) return;
    try {
      const created = await createFilter(name, query);
      setFilters((prev) => [created, ...prev]);
      setName("");
      setQuery("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteFilter(id);
      setFilters((prev) => prev.filter((f) => f.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const apply = (f: SavedFilter) => {
    navigate(`/projects/p-1/issues?search=${encodeURIComponent(f.query)}`);
  };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Filters</h1>
          <p className="text-sm text-slate-500">Save and reuse TQL searches across projects.</p>
        </div>
        <Link
          to="/projects/p-1/issues"
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:bg-slate-50"
        >
          Back to issues
        </Link>
      </div>

      <form onSubmit={handleCreate} className="mb-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-500">Create new filter</h2>
        <div className="mb-3 flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2 transition-all duration-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Filter name"
            className="flex-1 bg-transparent text-sm outline-none"
          />
        </div>
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='e.g. type = "Bug" AND priority = "High"'
          className="mb-3 w-full rounded-lg border border-slate-200 p-3 text-sm outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          rows={2}
        />
        <button type="submit" className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md active:translate-y-0">
          <Plus className="h-4 w-4" />
          Save filter
        </button>
      </form>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        {loading ? (
          <div className="p-6 animate-pulse">Loading filters…</div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filters.map((f) => (
              <div key={f.id} className="group flex items-center justify-between p-4 transition-all duration-150 hover:bg-blue-50/30">
                <div>
                  <div className="font-semibold text-slate-900">{f.name}</div>
                  <div className="mt-0.5 font-mono text-xs text-slate-500">{f.query}</div>
                </div>
                <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    onClick={() => apply(f)}
                    className="rounded bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-700 hover:bg-blue-100"
                  >
                    Apply
                  </button>
                  <button
                    onClick={() => handleDelete(f.id)}
                    className="rounded p-2 text-slate-400 hover:text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
            {filters.length === 0 && <div className="p-6 text-center text-slate-500">No saved filters yet.</div>}
          </div>
        )}
      </div>
    </div>
  );
}
