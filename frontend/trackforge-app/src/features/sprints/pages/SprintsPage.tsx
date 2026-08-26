const sprints = [
  { id: "sp-1", name: "Sprint 1", status: "ACTIVE" },
  { id: "sp-2", name: "Sprint 2", status: "PLANNED" },
  { id: "sp-3", name: "Sprint 3", status: "CLOSED" },
];

export function SprintsPage() {
  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Sprints</h1>
      <div className="divide-y rounded-xl border border-slate-200 bg-white shadow-sm">
        {sprints.map((s) => (
          <div key={s.id} className="flex items-center justify-between p-4 transition-all duration-150 hover:bg-slate-50">
            <span className="font-medium text-slate-900">{s.name}</span>
            <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-bold uppercase text-slate-600">{s.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
