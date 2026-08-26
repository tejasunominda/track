import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bell, HelpCircle, Plus, Search, X } from "lucide-react";
import { apiFetch } from "@/api/client";

interface SearchIssue {
  id: string;
  summary: string;
  projectId: string;
  issueTypeName: string | null;
  statusName: string | null;
  priority: string | null;
  assigneeId: string | null;
}

interface SearchProject {
  id: string;
  name: string;
  projectKey: string;
}

interface SearchResults {
  issues: SearchIssue[];
  projects: SearchProject[];
}

export function GlobalNav() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SearchResults>({ issues: [], projects: [] });
  const timer = useRef<number | null>(null);
  const wrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (timer.current) window.clearTimeout(timer.current);
    if (query.length < 2) {
      setResults({ issues: [], projects: [] });
      setLoading(false);
      return;
    }
    setLoading(true);
    timer.current = window.setTimeout(() => {
      apiFetch<SearchResults>(`/search?q=${encodeURIComponent(query)}`)
        .then((data) => {
          setResults(data);
          setOpen(true);
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }, 250);
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [query]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (wrapper.current && !wrapper.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const onSelectIssue = (issueId: string) => {
    setOpen(false);
    setQuery("");
    navigate(`/issues/${issueId}`);
  };

  const onSelectProject = (projectId: string) => {
    setOpen(false);
    setQuery("");
    navigate(`/projects/${projectId}/issues`);
  };

  const hasResults = results.issues.length > 0 || results.projects.length > 0;

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm transition-all duration-200">
      <div className="flex items-center gap-4">
        <Link to="/" className="group flex items-center gap-2 text-lg font-bold text-slate-900 transition-transform duration-150 hover:scale-[1.02]">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 text-sm font-bold text-white shadow-md transition-transform duration-200 group-hover:rotate-3">
            TF
          </span>
          TrackForge
        </Link>
      </div>

      <div ref={wrapper} className="hidden flex-1 px-8 sm:block">
        <div className="relative max-w-xl transition-all duration-200 focus-within:scale-[1.01] focus-within:shadow-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => hasResults && setOpen(true)}
            placeholder="Search issues, projects, filters…"
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm text-slate-700 outline-none transition-all duration-200 focus:border-blue-500 focus:bg-white focus:shadow-sm"
          />
          {query && (
            <button
              onClick={() => { setQuery(""); setOpen(false); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-slate-400 hover:text-slate-600"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}

          {open && (
            <div className="absolute top-full z-50 mt-2 w-full rounded-xl border border-slate-200 bg-white p-2 shadow-xl animate-fadeIn">
              {loading && (
                <div className="px-3 py-4 text-center text-sm text-slate-500">Searching…</div>
              )}
              {!loading && !hasResults && query.length >= 2 && (
                <div className="px-3 py-4 text-center text-sm text-slate-500">No results found.</div>
              )}
              {!loading && results.projects.length > 0 && (
                <div className="mb-2">
                  <div className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-400">Projects</div>
                  {results.projects.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => onSelectProject(p.id)}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-700"
                    >
                      <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-slate-600">{p.projectKey}</span>
                      {p.name}
                    </button>
                  ))}
                </div>
              )}
              {!loading && results.issues.length > 0 && (
                <div>
                  <div className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-400">Issues</div>
                  {results.issues.map((i) => (
                    <button
                      key={i.id}
                      onClick={() => onSelectIssue(i.id)}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-700"
                    >
                      <span className="text-[10px] font-bold text-slate-400">{i.id.slice(0, 8)}</span>
                      <span className="flex-1 truncate">{i.summary}</span>
                      <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-slate-600">{i.priority}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="hidden items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md active:translate-y-0 sm:flex">
          <Plus className="h-4 w-4" />
          Create
        </button>
        <button className="rounded-lg p-2 text-slate-500 transition-all duration-150 hover:-translate-y-0.5 hover:bg-slate-100 hover:text-slate-900">
          <Bell className="h-5 w-5" />
        </button>
        <button className="rounded-lg p-2 text-slate-500 transition-all duration-150 hover:-translate-y-0.5 hover:bg-slate-100 hover:text-slate-900">
          <HelpCircle className="h-5 w-5" />
        </button>
        <div className="ml-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-slate-200 to-slate-300 text-sm font-semibold text-slate-600 shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md">
          U
        </div>
      </div>
    </header>
  );
}
