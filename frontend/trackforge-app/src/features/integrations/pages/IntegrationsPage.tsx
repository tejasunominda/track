import { useState } from "react";
import { Cloud, Slack, Github, GitBranch, Search, Settings2, Key, ExternalLink, Check } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface Integration { id: string; name: string; description: string; connected: boolean; category: string; apiKey?: string; }

const iIcon: Record<string, typeof Cloud> = { slack: Slack, github: Github, gitlab: GitBranch, jira: Cloud, linear: GitBranch, figma: Cloud, zendesk: Cloud, sentry: Cloud };

export function IntegrationsPage() {
  const { notify } = useToast();
  const [items, setItems] = useState<Integration[]>([
    { id: "slack", name: "Slack", description: "Send notifications to channels.", connected: false, category: "Communication" },
    { id: "github", name: "GitHub", description: "Link commits and pull requests.", connected: false, category: "Development" },
    { id: "gitlab", name: "GitLab", description: "Sync repositories and issues.", connected: true, category: "Development", apiKey: "glp-xxxx1234" },
    { id: "jira", name: "Jira Importer", description: "Import projects from Jira Cloud.", connected: false, category: "Migration" },
    { id: "linear", name: "Linear", description: "Sync issues with Linear.", connected: false, category: "Development" },
    { id: "figma", name: "Figma", description: "Embed design files in issues.", connected: true, category: "Design", apiKey: "fig-abcd5678" },
    { id: "zendesk", name: "Zendesk", description: "Connect support tickets.", connected: false, category: "Support" },
    { id: "sentry", name: "Sentry", description: "Auto-create issues from errors.", connected: false, category: "Monitoring" },
  ]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [config, setConfig] = useState<string | null>(null);

  const toggle = (id: string) => {
    setItems((p) => p.map((i) => i.id === id ? { ...i, connected: !i.connected, apiKey: !i.connected ? `${i.id.slice(0, 3)}-${Date.now().toString(36)}` : undefined } : i));
    const item = items.find((i) => i.id === id);
    if (item) notify(`${item.name} ${item.connected ? "disconnected" : "connected"}`);
  };
  const categories = ["All", ...new Set(items.map((i) => i.category))];
  const filtered = items.filter((i) => (category === "All" || i.category === category) && (i.name.toLowerCase().includes(search.toLowerCase()) || i.description.toLowerCase().includes(search.toLowerCase())));

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-slate-900">Integrations</h1><p className="text-sm text-slate-500">{items.filter((i) => i.connected).length} of {items.length} connected</p></div>
      </div>
      <div className="mb-4 flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search integrations..." className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500" />
        </div>
        {categories.map((c) => <button key={c} onClick={() => setCategory(c)} className={`rounded-full px-3 py-1 text-xs font-bold transition-all ${category === c ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>{c}</button>)}
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((i) => {
          const Icon = iIcon[i.id] || Cloud;
          return (
            <div key={i.id} className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
              <div className="mb-3 flex items-center justify-between">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg text-white shadow-md ${i.connected ? "bg-gradient-to-br from-green-500 to-emerald-600" : "bg-gradient-to-br from-slate-400 to-slate-600"}`}><Icon className="h-5 w-5" /></div>
                {i.connected ? <span className="flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-1 text-xs font-bold text-green-700"><Check className="h-3 w-3" /> Connected</span> : <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-500">Available</span>}
              </div>
              <div className="mb-1 font-bold text-slate-900">{i.name}</div>
              <div className="mb-3 text-xs text-slate-500">{i.description}</div>
              <div className="flex items-center gap-2">
                <button onClick={() => toggle(i.id)} className={`flex-1 rounded-lg py-2 text-xs font-bold transition-all hover:scale-[1.02] ${i.connected ? "bg-red-100 text-red-700 hover:bg-red-200" : "bg-blue-600 text-white hover:bg-blue-700"}`}>{i.connected ? "Disconnect" : "Connect"}</button>
                {i.connected && <button onClick={() => setConfig(config === i.id ? null : i.id)} className="rounded-lg bg-slate-100 p-2 text-slate-600 transition-all hover:bg-slate-200"><Settings2 className="h-4 w-4" /></button>}
              </div>
              {config === i.id && i.apiKey && (
                <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <div className="mb-1 flex items-center gap-1 text-xs font-bold text-slate-500"><Key className="h-3 w-3" /> API Key</div>
                  <div className="flex items-center gap-2"><code className="flex-1 truncate rounded bg-white px-2 py-1 font-mono text-xs text-slate-700">{i.apiKey}</code><button onClick={() => { navigator.clipboard?.writeText(i.apiKey || ""); notify("API key copied"); }} className="text-blue-600 hover:text-blue-700"><ExternalLink className="h-3.5 w-3.5" /></button></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
