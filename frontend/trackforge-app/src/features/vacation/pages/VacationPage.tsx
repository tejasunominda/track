export function VacationPage() {
  const items = [{"id":"a","label":"PTO"},{"id":"b","label":"Sample B"},{"id":"c","label":"Sample C"}];
  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Vacation</h1>
      <div className="divide-y rounded-xl border border-slate-200 bg-white shadow-sm">
        {items.map((i) => (
          <div key={i.id} className="flex items-center justify-between p-4 transition-all duration-150 hover:bg-slate-50">
            <span className="font-medium text-slate-900">{i.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
