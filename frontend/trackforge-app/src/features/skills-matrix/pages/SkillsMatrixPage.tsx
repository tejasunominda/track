import { useState } from "react";
import { Plus, Star } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

export function SkillsMatrixPage() {
  const { notify } = useToast();
  const [items, setItems] = useState([
    { id: "sm-1", skill: "React", person: "Alice", level: 4 },
    { id: "sm-2", skill: "Java", person: "Bob", level: 3 },
  ]);
  const [skill, setSkill] = useState("");
  const [person, setPerson] = useState("");
  const [level, setLevel] = useState("3");
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!skill.trim() || !person.trim()) return;
    setItems((prev) => [...prev, { id: `sm-${Date.now()}`, skill, person, level: parseInt(level) }]);
    setSkill("");
    setPerson("");
    setShow(false);
    notify("Skill added");
  };

  const bump = (id: string) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, level: Math.min(i.level + 1, 5) } : i)));
    notify("Skill level up");
  };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Skills matrix</h1>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-700">
          <Plus className="h-4 w-4" /> New
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={skill} onChange={(e) => setSkill(e.target.value)} placeholder="Skill" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <input value={person} onChange={(e) => setPerson(e.target.value)} placeholder="Person" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <select value={level} onChange={(e) => setLevel(e.target.value)} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none">
            {[1,2,3,4,5].map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="divide-y rounded-xl border border-slate-200 bg-white shadow-sm">
        {items.map((i) => (
          <div key={i.id} className="flex items-center justify-between p-4 transition-all duration-150 hover:bg-slate-50">
            <div className="flex items-center gap-3">
              <Star className="h-5 w-5 text-slate-400" />
              <div>
                <div className="font-medium text-slate-900">{i.skill}</div>
                <div className="text-xs text-slate-500">{i.person}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-700">{i.level}/5</span>
              {i.level < 5 && (
                <button onClick={() => bump(i.id)} className="rounded-lg bg-blue-600 px-2 py-1 text-xs font-semibold text-white hover:bg-blue-700">+</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
