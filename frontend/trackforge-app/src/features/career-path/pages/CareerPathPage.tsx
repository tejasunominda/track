import { useState } from "react";
import { ArrowRight, Plus, Trash2, TrendingUp, Award, Briefcase } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface CareerStep { id: string; role: string; next: string; level: number; skills: string; }

const levelColor = ["from-slate-400 to-slate-600", "from-blue-500 to-indigo-600", "from-green-500 to-emerald-600", "from-purple-500 to-pink-500", "from-amber-500 to-orange-500"];

export function CareerPathPage() {
  const { notify } = useToast();
  const [items, setItems] = useState<CareerStep[]>([
    { id: "cp-1", role: "Junior", next: "Senior", level: 1, skills: "Basics, Git, Testing" },
    { id: "cp-2", role: "Senior", next: "Staff", level: 2, skills: "Architecture, Mentoring" },
    { id: "cp-3", role: "Staff", next: "Principal", level: 3, skills: "Strategy, Cross-team" },
  ]);
  const [role, setRole] = useState("");
  const [next, setNext] = useState("");
  const [skills, setSkills] = useState("");
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => { e.preventDefault(); if (!role.trim() || !next.trim()) return; setItems((p) => [...p, { id: `cp-${Date.now()}`, role, next, level: p.length + 1, skills: skills || "TBD" }]); setRole(""); setNext(""); setSkills(""); setShow(false); notify("Career step added"); };
  const remove = (id: string) => { setItems((p) => p.filter((i) => i.id !== id)); notify("Career step removed"); };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-slate-900">Career path</h1><p className="text-sm text-slate-500">{items.length} levels defined</p></div>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110"><Plus className="h-4 w-4" /> New step</button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[1fr_1fr_1fr_auto]">
          <input value={role} onChange={(e) => setRole(e.target.value)} placeholder="Role" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" autoFocus />
          <input value={next} onChange={(e) => setNext(e.target.value)} placeholder="Next" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <input value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="Key skills" className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="relative pl-8 before:absolute before:left-4 before:top-2 before:h-[calc(100%-1rem)] before:w-0.5 before:bg-gradient-to-b before:from-blue-200 before:to-indigo-200">
        {items.map((i, idx) => (
          <div key={i.id} className="group relative mb-4">
            <span className={`absolute -left-4 top-3 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br ${levelColor[idx % levelColor.length]} ring-4 ring-slate-50`} />
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${levelColor[idx % levelColor.length]} text-white shadow-md`}><Briefcase className="h-5 w-5" /></div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{i.role}</span>
                      <span className="flex items-center gap-0.5 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500"><Award className="h-3 w-3" /> L{i.level}</span>
                    </div>
                    <div className="mt-0.5 flex items-center gap-1 text-xs text-slate-400"><TrendingUp className="h-3 w-3" /> {i.skills}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700"><ArrowRight className="h-3.5 w-3.5" /> {i.next}</span>
                  <button onClick={() => remove(i.id)} className="text-slate-300 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
