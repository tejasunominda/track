import { useState } from "react";
import { Camera, Mail, Shield, User } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

export function ProfilePage() {
  const { notify } = useToast();
  const [name, setName] = useState("Devin User");
  const [email, setEmail] = useState("user@trackforge.io");
  const [role, setRole] = useState("Admin");

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    notify("Profile saved");
  };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Your profile</h1>
      <div className="max-w-xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-4">
          <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-3xl font-bold text-blue-700">
            U
            <button className="absolute -bottom-1 -right-1 rounded-full bg-white p-1 text-slate-400 shadow-sm hover:text-blue-600">
              <Camera className="h-4 w-4" />
            </button>
          </div>
          <div>
            <div className="text-lg font-bold text-slate-900">{name}</div>
            <div className="text-sm text-slate-500">{email}</div>
          </div>
        </div>
        <form onSubmit={save} className="space-y-4">
          <div>
            <label className="mb-1 flex items-center gap-1 text-sm font-medium text-slate-700"><User className="h-3.5 w-3.5" /> Display name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-lg border border-slate-200 p-2 text-sm outline-none focus:border-blue-500" />
          </div>
          <div>
            <label className="mb-1 flex items-center gap-1 text-sm font-medium text-slate-700"><Mail className="h-3.5 w-3.5" /> Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-lg border border-slate-200 p-2 text-sm outline-none focus:border-blue-500" />
          </div>
          <div>
            <label className="mb-1 flex items-center gap-1 text-sm font-medium text-slate-700"><Shield className="h-3.5 w-3.5" /> Role</label>
            <input value={role} onChange={(e) => setRole(e.target.value)} className="w-full rounded-lg border border-slate-200 p-2 text-sm outline-none focus:border-blue-500" />
          </div>
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-700">Edit profile</button>
        </form>
      </div>
    </div>
  );
}
