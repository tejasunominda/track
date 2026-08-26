import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, Hourglass, Layers, TrendingUp } from "lucide-react";
import { listIssues } from "@/features/issues/api/issues";
import { Issue } from "@/features/issues/types/issue";
import { listSprints, Sprint } from "@/features/sprints/api/sprints";

export function DashboardsPage() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [sprints, setSprints] = useState<Sprint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([listIssues("p-1"), listSprints("p-1")])
      .then(([i, s]) => {
        setIssues(i);
        setSprints(s);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const { open, inProgress, done, velocity } = useMemo(() => {
    const open = issues.filter((i) => i.statusName === "To Do").length;
    const inProgress = issues.filter((i) => i.statusName === "In Progress").length;
    const done = issues.filter((i) => i.statusName === "Done").length;
    const closed = sprints.filter((s) => s.status === "CLOSED").length;
    const velocity = closed > 0 ? Math.round(done / closed) : 0;
    return { open, inProgress, done, velocity };
  }, [issues, sprints]);

  if (loading) {
    return (
      <div className="h-full bg-slate-50 p-6 animate-fadeIn">
        <div className="mb-6 h-8 w-40 animate-pulse rounded bg-slate-200" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
              <div className="mt-2 h-10 w-16 animate-pulse rounded bg-slate-200" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const cards = [
    { label: "Open issues", value: open, color: "text-blue-600", icon: Layers },
    { label: "In progress", value: inProgress, color: "text-amber-600", icon: Hourglass },
    { label: "Done this week", value: done, color: "text-green-600", icon: CheckCircle },
    { label: "Velocity / sprint", value: velocity, color: "text-purple-600", icon: TrendingUp },
  ];

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Dashboards</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Link
            key={c.label}
            to="/projects/p-1/issues"
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <c.icon className="h-4 w-4" />
              {c.label}
            </div>
            <div className={`mt-2 text-3xl font-bold ${c.color}`}>{c.value}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
