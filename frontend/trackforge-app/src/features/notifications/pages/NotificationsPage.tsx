const notifications = [
  { id: "n-1", text: "Alice commented on ENG-12", time: "2 min ago" },
  { id: "n-2", text: "Sprint 2 started", time: "1 hour ago" },
  { id: "n-3", text: "You were assigned to ENG-8", time: "3 hours ago" },
];

export function NotificationsPage() {
  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Notifications</h1>
      <div className="divide-y rounded-xl border border-slate-200 bg-white shadow-sm">
        {notifications.map((n) => (
          <div key={n.id} className="flex items-center justify-between p-4 transition-all duration-150 hover:bg-slate-50">
            <span className="text-sm text-slate-800">{n.text}</span>
            <span className="text-xs text-slate-400">{n.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
