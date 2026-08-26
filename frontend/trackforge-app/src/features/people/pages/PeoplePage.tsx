import { useEffect, useState } from "react";
import { Mail, Shield, User } from "lucide-react";
import { listUsers, User as UserType } from "@/features/people/api/people";

export function PeoplePage() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    listUsers()
      .then(setUsers)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6">Loading people…</div>;

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">People</h1>
        <p className="text-sm text-slate-500">Manage team members and roles.</p>
      </div>
      <div className="divide-y rounded-xl border border-slate-200 bg-white shadow-sm">
        {users.map((u) => (
          <div key={u.id} className="flex items-center justify-between p-4 transition-all duration-150 hover:bg-slate-50">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                <User className="h-5 w-5" />
              </div>
              <div>
                <div className="font-semibold text-slate-900">{u.name}</div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Mail className="h-3 w-3" /> {u.email}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 rounded bg-slate-100 px-2 py-1 text-xs font-bold text-slate-600">
              <Shield className="h-3 w-3" /> {u.role}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
