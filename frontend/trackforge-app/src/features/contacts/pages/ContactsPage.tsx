import { useState } from "react";
import { Mail, Plus, User } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

export function ContactsPage() {
  const { notify } = useToast();
  const [items, setItems] = useState([
    { id: "cn-1", name: "John Doe", email: "john@example.com", role: "Owner" },
    { id: "cn-2", name: "Jane Smith", email: "jane@example.com", role: "Admin" },
  ]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [show, setShow] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setItems((prev) => [...prev, { id: `cn-${Date.now()}`, name, email, role: "User" }]);
    setName("");
    setEmail("");
    setShow(false);
    notify("Contact created");
  };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Contacts</h1>
        <button onClick={() => setShow((s) => !s)} className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-700">
          <Plus className="h-4 w-4" /> New contact
        </button>
      </div>
      {show && (
        <form onSubmit={add} className="mb-6 flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Create</button>
        </form>
      )}
      <div className="divide-y rounded-xl border border-slate-200 bg-white shadow-sm">
        {items.map((i) => (
          <div key={i.id} className="flex items-center justify-between p-4 transition-all duration-150 hover:bg-slate-50">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700"><User className="h-5 w-5" /></div>
              <div>
                <div className="font-medium text-slate-900">{i.name}</div>
                <div className="flex items-center gap-1 text-xs text-slate-500"><Mail className="h-3 w-3" /> {i.email}</div>
              </div>
            </div>
            <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase text-slate-600">{i.role}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
