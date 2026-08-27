import { useState } from "react";
import { Pencil, Plus, Circle, Square, Triangle, Minus } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

interface Shape { id: string; type: "circle" | "square" | "triangle" | "line"; x: number; y: number; color: string; }

const COLORS = ["#3B82F6", "#10B981", "#F97316", "#EF4444", "#8B5CF6"];
const TOOLS = [
  { type: "circle" as const, icon: Circle, label: "Circle" },
  { type: "square" as const, icon: Square, label: "Square" },
  { type: "triangle" as const, icon: Triangle, label: "Triangle" },
  { type: "line" as const, icon: Minus, label: "Line" },
];

export function DrawingsPage() {
  const { notify } = useToast();
  const [shapes, setShapes] = useState<Shape[]>([
    { id: "sh-1", type: "circle", x: 80, y: 60, color: COLORS[0] },
    { id: "sh-2", type: "square", x: 200, y: 100, color: COLORS[1] },
    { id: "sh-3", type: "triangle", x: 350, y: 80, color: COLORS[2] },
  ]);
  const [tool, setTool] = useState<Shape["type"]>("circle");
  const [color, setColor] = useState(COLORS[0]);

  const addShape = () => {
    setShapes((p) => [...p, { id: `sh-${Date.now()}`, type: tool, x: Math.random() * 400 + 50, y: Math.random() * 300 + 50, color }]);
    notify("Shape added");
  };
  const move = (id: string, dx: number, dy: number) => setShapes((p) => p.map((s) => (s.id === id ? { ...s, x: Math.max(0, s.x + dx), y: Math.max(0, s.y + dy) } : s)));
  const remove = (id: string) => { setShapes((p) => p.filter((s) => s.id !== id)); notify("Shape removed"); };
  const clear = () => { setShapes([]); notify("Canvas cleared"); };

  const renderShape = (s: Shape) => {
    const common = { fill: s.color, stroke: s.color, strokeWidth: 2 } as const;
    if (s.type === "circle") return <circle cx={s.x + 30} cy={s.y + 30} r={30} {...common} />;
    if (s.type === "square") return <rect x={s.x} y={s.y} width={60} height={60} rx={4} {...common} />;
    if (s.type === "triangle") return <polygon points={`${s.x + 30},${s.y} ${s.x + 60},${s.y + 60} ${s.x},${s.y + 60}`} {...common} />;
    return <line x1={s.x} y1={s.y} x2={s.x + 80} y2={s.y} stroke={s.color} strokeWidth={4} strokeLinecap="round" />;
  };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Drawings</h1>
          <p className="text-sm text-slate-500">{shapes.length} shapes on canvas</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={clear} className="rounded-lg bg-red-100 px-3 py-2 text-sm font-semibold text-red-700 transition-all hover:bg-red-200">Clear</button>
          <button onClick={addShape} className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110"><Plus className="h-4 w-4" /> Add shape</button>
        </div>
      </div>
      <div className="mb-4 flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
        <span className="text-xs font-bold text-slate-500">Tool:</span>
        {TOOLS.map((t) => {
          const Icon = t.icon;
          return <button key={t.type} onClick={() => setTool(t.type)} className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-bold transition-all hover:scale-105 ${tool === t.type ? "bg-blue-600 text-white shadow-sm" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}><Icon className="h-3.5 w-3.5" /> {t.label}</button>;
        })}
        <div className="ml-2 flex items-center gap-1">
          <span className="text-xs font-bold text-slate-500">Color:</span>
          {COLORS.map((c) => <button key={c} onClick={() => setColor(c)} className={`h-6 w-6 rounded-full border-2 transition-all hover:scale-110 ${color === c ? "border-slate-900" : "border-transparent"}`} style={{ background: c }} />)}
        </div>
      </div>
      <div className="relative rounded-xl border-2 border-slate-200 bg-white shadow-sm" style={{ backgroundImage: "linear-gradient(#f1f5f9 1px, transparent 1px), linear-gradient(90deg, #f1f5f9 1px, transparent 1px)", backgroundSize: "20px 20px" }}>
        <svg width="100%" height="450" className="block">
          {shapes.map((s) => (
            <g key={s.id} className="group cursor-pointer">
              {renderShape(s)}
              <foreignObject x={s.x - 10} y={s.y - 25} width="80" height="20" className="opacity-0 group-hover:opacity-100">
                <div className="flex gap-0.5">
                  <button onClick={() => move(s.id, -15, 0)} className="rounded bg-white px-1 text-[10px] shadow">←</button>
                  <button onClick={() => move(s.id, 0, -15)} className="rounded bg-white px-1 text-[10px] shadow">↑</button>
                  <button onClick={() => move(s.id, 0, 15)} className="rounded bg-white px-1 text-[10px] shadow">↓</button>
                  <button onClick={() => move(s.id, 15, 0)} className="rounded bg-white px-1 text-[10px] shadow">→</button>
                  <button onClick={() => remove(s.id)} className="rounded bg-red-100 px-1 text-[10px] text-red-600 shadow">✕</button>
                </div>
              </foreignObject>
            </g>
          ))}
        </svg>
        {shapes.length === 0 && <div className="absolute inset-0 flex items-center justify-center text-slate-400"><div className="text-center"><Pencil className="mx-auto mb-2 h-10 w-10" /><p className="text-sm">Click "Add shape" to start drawing</p></div></div>}
      </div>
    </div>
  );
}
