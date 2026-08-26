import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from "recharts";
import { fetchVelocity } from "@/features/reports/api/reports";
import { Velocity } from "@/features/reports/api/reports";

export function ReportsPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const [velocity, setVelocity] = useState<Velocity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!projectId) return;
    fetchVelocity(projectId)
      .then(setVelocity)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [projectId]);

  const totalCompleted = velocity.reduce((sum, v) => sum + v.completed, 0);

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Reports</h1>

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
          <div className="text-sm text-slate-500">Sprints</div>
          <div className="mt-1 text-3xl font-bold text-slate-900">{velocity.length}</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
          <div className="text-sm text-slate-500">Total completed</div>
          <div className="mt-1 text-3xl font-bold text-green-600">{totalCompleted}</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
          <div className="text-sm text-slate-500">Avg velocity</div>
          <div className="mt-1 text-3xl font-bold text-blue-600">
            {velocity.length ? Math.round(totalCompleted / velocity.length) : 0}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md">
        <h2 className="mb-4 text-lg font-bold text-slate-900">Sprint velocity</h2>
        {loading ? (
          <div className="h-64 animate-pulse rounded bg-slate-100" />
        ) : (
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={velocity} margin={{ top: 8, right: 24, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="sprintName" tick={{ fill: "#64748b", fontSize: 12 }} />
                <YAxis tick={{ fill: "#64748b", fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="committed" name="Committed" fill="#94a3b8" radius={[6, 6, 0, 0]} />
                <Bar dataKey="completed" name="Completed" fill="#0052CC" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
