import { useState } from "react";

export function SettingsPage() {
  const [name, setName] = useState("Acme");
  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Settings</h1>
      <div className="max-w-xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <label className="mb-1 block text-sm font-medium text-slate-700">Organization name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} className="mb-4 w-full rounded-lg border border-slate-200 p-2 text-sm" />
        <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm">Save changes</button>
      </div>
    </div>
  );
}
