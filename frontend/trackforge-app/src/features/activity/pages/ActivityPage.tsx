import { useState } from "react";
import { Activity as ActivityIcon, Clock } from "lucide-react";

const initial = [
  { id: "ac-1", user: "Alice", action: "created issue i-1", time: "2 minutes ago" },
  { id: "ac-2", user: "Bob", action: "commented on i-2", time: "15 minutes ago" },
  { id: "ac-3", user: "You", action: "logged work on i-1", time: "1 hour ago" },
];

export function ActivityPage() {
  const [items] = useState(initial);

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Activity</h1>
        <p className="text-sm text-slate-500">Recent actions across the workspace.</p>
      </div>
      <div className="relative pl-6 before:absolute before:left-2 before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-slate-200">
        {items.map((i) => (
          <div key={i.id} className="relative mb-6">
            <span className="absolute -left-4 top-1 flex h-3 w-3 items-center justify-center rounded-full bg-blue-500 ring-4 ring-slate-50" />
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-medium text-slate-900">
                  <ActivityIcon className="h-4 w-4 text-slate-400" /> {i.user} {i.action}
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-500"><Clock className="h-3 w-3" /> {i.time}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
