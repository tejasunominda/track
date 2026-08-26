import { Link } from "react-router-dom";
import { Bell, HelpCircle, Plus, Search } from "lucide-react";

export function GlobalNav() {
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

      <div className="hidden flex-1 px-8 sm:block">
        <div className="relative max-w-xl transition-all duration-200 focus-within:scale-[1.01] focus-within:shadow-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search issues, projects, filters…"
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm text-slate-700 outline-none transition-all duration-200 focus:border-blue-500 focus:bg-white focus:shadow-sm"
          />
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
