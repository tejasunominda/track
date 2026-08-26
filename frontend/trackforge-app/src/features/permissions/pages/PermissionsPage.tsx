import { useState } from "react";
import { Shield } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

const initialRoles = [
  { id: "r-1", name: "Admin", permissions: ["create_issue", "delete_issue", "manage_users", "view_reports"] },
  { id: "r-2", name: "Developer", permissions: ["create_issue", "edit_issue", "view_reports"] },
  { id: "r-3", name: "Viewer", permissions: ["view_issue", "view_reports"] },
];

const allPermissions = [
  { id: "create_issue", label: "Create issue" },
  { id: "edit_issue", label: "Edit issue" },
  { id: "delete_issue", label: "Delete issue" },
  { id: "view_reports", label: "View reports" },
  { id: "manage_users", label: "Manage users" },
  { id: "admin_workspace", label: "Admin workspace" },
];

export function PermissionsPage() {
  const { notify } = useToast();
  const [roles, setRoles] = useState(initialRoles);

  const toggle = (roleId: string, permId: string) => {
    setRoles((prev) =>
      prev.map((r) =>
        r.id === roleId
          ? { ...r, permissions: r.permissions.includes(permId) ? r.permissions.filter((p) => p !== permId) : [...r.permissions, permId] }
          : r
      )
    );
    notify("Permission updated");
  };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Permissions</h1>
        <p className="text-sm text-slate-500">Manage role-based access.</p>
      </div>
      <div className="space-y-4">
        {roles.map((r) => (
          <div key={r.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md">
            <div className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900">
              <Shield className="h-5 w-5 text-slate-400" /> {r.name}
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {allPermissions.map((p) => (
                <label key={p.id} className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-100 p-2 hover:bg-slate-50">
                  <input
                    type="checkbox"
                    checked={r.permissions.includes(p.id)}
                    onChange={() => toggle(r.id, p.id)}
                    className="h-4 w-4 accent-blue-600"
                  />
                  <span className="text-sm text-slate-700">{p.label}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
