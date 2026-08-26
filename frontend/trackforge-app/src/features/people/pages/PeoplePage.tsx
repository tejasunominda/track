const users = [
  { id: "u-1", name: "Alice", role: "Engineer" },
  { id: "u-2", name: "Bob", role: "Designer" },
  { id: "u-3", name: "Carol", role: "Product Owner" },
];

export function PeoplePage() {
  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <h1 className="mb-6 text-2xl font-bold text-slate-900">People</h1>
      <div className="divide-y rounded-xl border border-slate-200 bg-white shadow-sm">
        {users.map((u) => (
          <div key={u.id} className="flex items-center gap-4 p-4 transition-all duration-150 hover:bg-slate-50">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">{u.name[0]}</div>
            <div>
              <div className="font-semibold text-slate-900">{u.name}</div>
              <div className="text-sm text-slate-500">{u.role}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
