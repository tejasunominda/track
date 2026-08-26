export function DashboardsPage() {
  const cards = [
    { label: "Open issues", value: 24, color: "text-blue-600" },
    { label: "In progress", value: 12, color: "text-amber-600" },
    { label: "Done this week", value: 8, color: "text-green-600" },
    { label: "Sprint velocity", value: 18, color: "text-purple-600" },
  ];
  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Dashboards</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
            <div className="text-sm text-slate-500">{c.label}</div>
            <div className={`mt-2 text-3xl font-bold ${c.color}`}>{c.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
