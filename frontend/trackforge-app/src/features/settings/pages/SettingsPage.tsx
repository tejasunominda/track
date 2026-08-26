import { useState } from "react";
import { useToast } from "@/app/ToastProvider";

export function SettingsPage() {
  const { notify } = useToast();
  const [name, setName] = useState("Acme");
  const [email, setEmail] = useState("admin@acme.com");

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    notify("Settings saved");
  };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Settings</h1>
      <form onSubmit={save} className="max-w-xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-slate-700">Organization name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-lg border border-slate-200 p-2 text-sm outline-none focus:border-blue-500" />
        </div>
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-slate-700">Admin email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-lg border border-slate-200 p-2 text-sm outline-none focus:border-blue-500" />
        </div>
        <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-700">Save changes</button>
      </form>
    </div>
  );
}
