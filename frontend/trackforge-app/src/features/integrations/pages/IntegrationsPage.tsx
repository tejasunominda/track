import { useState } from "react";
import { Cloud, Slack, ToggleLeft, ToggleRight } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

const initial = [
  { id: "slack", name: "Slack", description: "Send notifications to channels.", connected: false },
  { id: "github", name: "GitHub", description: "Link commits and pull requests.", connected: false },
  { id: "gitlab", name: "GitLab", description: "Sync repositories and issues.", connected: true },
  { id: "jira", name: "Jira Importer", description: "Import projects from Jira Cloud.", connected: false },
];

export function IntegrationsPage() {
  const { notify } = useToast();
  const [items, setItems] = useState(initial);

  const toggle = (id: string) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, connected: !i.connected } : i)));
    const item = items.find((i) => i.id === id);
    if (item) notify(`${item.name} ${item.connected ? "disconnected" : "connected"}`);
  };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Integrations</h1>
        <p className="text-sm text-slate-500">Connect tools to TrackForge.</p>
      </div>
      <div className="divide-y rounded-xl border border-slate-200 bg-white shadow-sm">
        {items.map((i) => (
          <div key={i.id} className="flex items-center justify-between p-4 transition-all duration-150 hover:bg-slate-50">
            <div className="flex items-center gap-3">
              {i.id === "slack" ? <Slack className="h-5 w-5 text-slate-500" /> : <Cloud className="h-5 w-5 text-slate-500" />}
              <div>
                <div className="font-medium text-slate-900">{i.name}</div>
                <div className="text-xs text-slate-500">{i.description}</div>
              </div>
            </div>
            <button onClick={() => toggle(i.id)} className="flex items-center gap-1 text-sm font-semibold text-blue-600 transition-all duration-150 hover:text-blue-700">
              {i.connected ? <ToggleRight className="h-5 w-5" /> : <ToggleLeft className="h-5 w-5" />}
              {i.connected ? "Connected" : "Connect"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
