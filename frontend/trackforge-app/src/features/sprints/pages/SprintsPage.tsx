import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Flag, Play, Plus, Square } from "lucide-react";
import { useToast } from "@/app/ToastProvider";
import { completeSprint, createSprint, listSprints, Sprint, startSprint } from "@/features/sprints/api/sprints";

const statusColor: Record<string, string> = {
  PLANNED: "bg-slate-100 text-slate-600",
  ACTIVE: "bg-blue-100 text-blue-700",
  CLOSED: "bg-green-100 text-green-700",
};

export function SprintsPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const { notify } = useToast();
  const [sprints, setSprints] = useState<Sprint[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");

  const load = async () => {
    if (!projectId) return;
    setLoading(true);
    try {
      const data = await listSprints(projectId);
      setSprints(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [projectId]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectId || !name.trim()) return;
    try {
      const sprint = await createSprint(projectId, { name, goal });
      setSprints((prev) => [...prev, sprint]);
      setName("");
      setGoal("");
      setShowForm(false);
      notify("Sprint created");
    } catch (err) {
      notify("Failed to create sprint", "error");
      console.error(err);
    }
  };

  const start = async (id: string) => {
    try {
      await startSprint(id);
      setSprints((prev) => prev.map((s) => (s.id === id ? { ...s, status: "ACTIVE" } : s)));
      notify("Sprint started");
    } catch (err) {
      notify("Failed to start sprint", "error");
      console.error(err);
    }
  };

  const complete = async (id: string) => {
    try {
      await completeSprint(id);
      setSprints((prev) => prev.map((s) => (s.id === id ? { ...s, status: "CLOSED" } : s)));
      notify("Sprint completed");
    } catch (err) {
      notify("Failed to complete sprint", "error");
      console.error(err);
    }
  };

  if (loading) return <div className="p-6">Loading sprints…</div>;

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Sprints</h1>
          <p className="text-sm text-slate-500">Plan and manage iterations</p>
        </div>
        <button
          onClick={() => setShowForm((s) => !s)}
          className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          Create sprint
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="mb-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Sprint name"
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500"
              required
            />
            <input
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="Sprint goal (optional)"
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500"
            />
          </div>
          <button type="submit" className="mt-3 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-all duration-150 hover:bg-blue-700">
            Save sprint
          </button>
        </form>
      )}

      <div className="divide-y rounded-xl border border-slate-200 bg-white shadow-sm">
        {sprints.length === 0 && (
          <div className="p-6 text-center text-slate-500">No sprints yet.</div>
        )}
        {sprints.map((s) => (
          <div key={s.id} className="flex flex-col gap-2 p-4 transition-all duration-150 hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2 font-medium text-slate-900">
                <Flag className="h-4 w-4 text-slate-400" />
                {s.name}
                <span className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase ${statusColor[s.status]}`}>{s.status}</span>
              </div>
              {s.goal && <div className="mt-1 text-sm text-slate-500">{s.goal}</div>}
            </div>
            <div className="flex items-center gap-2">
              {s.status === "PLANNED" && (
                <button onClick={() => start(s.id)} className="flex items-center gap-1 rounded-lg bg-green-600 px-3 py-1.5 text-sm font-semibold text-white transition-all duration-150 hover:bg-green-700">
                  <Play className="h-3 w-3" /> Start
                </button>
              )}
              {s.status === "ACTIVE" && (
                <button onClick={() => complete(s.id)} className="flex items-center gap-1 rounded-lg bg-slate-800 px-3 py-1.5 text-sm font-semibold text-white transition-all duration-150 hover:bg-slate-700">
                  <Square className="h-3 w-3" /> Complete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
