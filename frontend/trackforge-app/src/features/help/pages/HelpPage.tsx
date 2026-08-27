import { useMemo, useState } from "react";
import { Search, ChevronDown, ChevronRight, LifeBuoy, MessageSquare, BookOpen } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

const articles = [
  { id: "h-1", title: "Getting started with TrackForge", category: "Onboarding", body: "Welcome to TrackForge! This guide will help you set up your first project, invite team members, and create your first issues. Start by clicking 'New Project' in the sidebar." },
  { id: "h-2", title: "How to create an issue", category: "Issues", body: "Click the + button in the top navigation bar. Select an issue type, fill in the summary and description, assign it to a team member, and set a priority." },
  { id: "h-3", title: "Using TQL search", category: "Search", body: "TrackForge Query Language (TQL) lets you search issues with syntax like: status = 'In Progress' AND assignee = me. Use the global search bar to enter TQL queries." },
  { id: "h-4", title: "Creating and running sprints", category: "Sprints", body: "Navigate to your project's backlog. Select issues to include in the sprint. Click 'Start Sprint' and set a duration (typically 2 weeks). Move issues across the board as work progresses." },
  { id: "h-5", title: "Managing project members", category: "People", body: "Go to People in the sidebar. Click 'Invite' to add team members by email. Assign roles (Admin, Member, Viewer) to control access levels." },
  { id: "h-6", title: "Setting up integrations", category: "Integrations", body: "Navigate to Integrations. Connect Slack for notifications, GitHub for commit linking, or import from Jira using the Jira Importer tool." },
  { id: "h-7", title: "Customizing workflows", category: "Configuration", body: "Go to Settings > Workflows. Create custom statuses and transitions. Drag and drop statuses to define your workflow stages." },
];

export function HelpPage() {
  const { notify } = useToast();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [expanded, setExpanded] = useState<string | null>("h-1");
  const [showContact, setShowContact] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const categories = ["All", ...new Set(articles.map((a) => a.category))];
  const filtered = useMemo(() => articles.filter((a) => (category === "All" || a.category === category) && (a.title.toLowerCase().includes(query.toLowerCase()) || a.category.toLowerCase().includes(query.toLowerCase()))), [query, category]);

  const toggle = (id: string) => setExpanded((p) => p === id ? null : id);
  const submit = (e: React.FormEvent) => { e.preventDefault(); if (!subject.trim()) return; setSubject(""); setMessage(""); setShowContact(false); notify("Support ticket submitted"); };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2"><LifeBuoy className="h-6 w-6 text-slate-600" /><h1 className="text-2xl font-bold text-slate-900">Help center</h1></div>
        <button onClick={() => setShowContact((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110"><MessageSquare className="h-4 w-4" /> Contact support</button>
      </div>
      {showContact && (
        <form onSubmit={submit} className="mb-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Describe your issue..." rows={4} className="resize-none rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="justify-self-start rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Submit ticket</button>
        </form>
      )}
      <div className="mb-4 flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search help articles…" className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500" />
        </div>
        {categories.map((c) => <button key={c} onClick={() => setCategory(c)} className={`rounded-full px-3 py-1 text-xs font-bold transition-all ${category === c ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>{c}</button>)}
      </div>
      <div className="space-y-2">
        {filtered.length === 0 && <div className="p-6 text-center text-slate-400"><BookOpen className="mx-auto mb-2 h-10 w-10" />No articles found.</div>}
        {filtered.map((a) => (
          <div key={a.id} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md">
            <button onClick={() => toggle(a.id)} className="flex w-full items-center justify-between p-4 text-left transition-all hover:bg-slate-50">
              <div className="flex items-center gap-3">
                {expanded === a.id ? <ChevronDown className="h-4 w-4 text-slate-400" /> : <ChevronRight className="h-4 w-4 text-slate-400" />}
                <div><div className="font-bold text-slate-900">{a.title}</div><span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500">{a.category}</span></div>
              </div>
            </button>
            {expanded === a.id && <div className="border-t border-slate-100 bg-slate-50 p-4 text-sm text-slate-600">{a.body}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
