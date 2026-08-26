interface Props {
  id: string | null;
  size?: number;
}

const palette = [
  "from-blue-500 to-blue-700",
  "from-emerald-500 to-emerald-700",
  "from-violet-500 to-violet-700",
  "from-amber-500 to-amber-700",
  "from-rose-500 to-rose-700",
  "from-cyan-500 to-cyan-700",
];

function colorFor(id: string) {
  let sum = 0;
  for (let i = 0; i < id.length; i++) sum += id.charCodeAt(i);
  return palette[sum % palette.length];
}

export function Avatar({ id, size = 6 }: Props) {
  if (!id) {
    return (
      <div
        className="flex items-center justify-center rounded-full bg-slate-100 text-[10px] leading-none text-slate-500"
        style={{ width: size * 4, height: size * 4 }}
      >
        —
      </div>
    );
  }
  const initial = id.replace(/^u-/, "").slice(0, 1).toUpperCase();
  return (
    <div
      className={`flex items-center justify-center rounded-full bg-gradient-to-br ${colorFor(id)} text-[10px] font-bold text-white shadow-sm`}
      title={id}
      style={{ width: size * 4, height: size * 4 }}
    >
      {initial}
    </div>
  );
}
