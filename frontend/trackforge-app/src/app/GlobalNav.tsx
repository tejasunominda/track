import { Link } from "react-router-dom";
import { Bell, HelpCircle, Plus, Search } from "lucide-react";

/**
 * Jira-style global top bar: logo, global search, create, notifications, help, user.
 */
export function GlobalNav() {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm">
      <div className="flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2 text-lg font-bold text-slate-900">
          <span className="flex h-7 w-7 items-center justify-center rounded bg-blue-700 text-sm font-bold text-white">
            TF
          </span>
          TrackForge
        </Link>
      </div>

      <div className="hidden flex-1 px-8 sm:block">
        <div className="relative max-w-xl">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search issues, projects, filters…"
            className="w-full rounded-md border border-slate-200 bg-slate-50 py-1.5 pl-9 pr-4 text-sm text-slate-700 outline-none focus:border-blue-500 focus:bg-white"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="hidden items-center gap-1 rounded bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-blue-700 sm:flex">
          <Plus className="h-4 w-4" />
          Create
        </button>
        <button className="rounded p-2 text-slate-500 hover:bg-slate-100">
          <Bell className="h-5 w-5" />
        </button>
        <button className="rounded p-2 text-slate-500 hover:bg-slate-100">
          <HelpCircle className="h-5 w-5" />
        </button>
        <div className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-slate-600">
          U
        </div>
      </div>
    </header>
  );
}
