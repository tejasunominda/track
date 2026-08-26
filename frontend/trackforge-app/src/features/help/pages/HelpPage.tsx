const articles = [
  { id: "h-1", title: "Getting started with TrackForge" },
  { id: "h-2", title: "How to create an issue" },
  { id: "h-3", title: "Using TQL search" },
];

export function HelpPage() {
  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Help center</h1>
      <div className="divide-y rounded-xl border border-slate-200 bg-white shadow-sm">
        {articles.map((a) => (
          <div key={a.id} className="flex items-center justify-between p-4 transition-all duration-150 hover:bg-slate-50">
            <span className="font-medium text-slate-900">{a.title}</span>
            <span className="text-sm text-blue-600 hover:underline">Read</span>
          </div>
        ))}
      </div>
    </div>
  );
}
