import { useState } from "react";
import { Check, CheckCircle2, FileText, X } from "lucide-react";
import { useToast } from "@/app/ToastProvider";

export function ApprovalsPage() {
  const { notify } = useToast();
  const [items, setItems] = useState([
    { id: "ap-1", title: "Q2 budget request", requester: "Alice", status: "Pending" },
    { id: "ap-2", title: "New hire requisition", requester: "Bob", status: "Pending" },
  ]);

  const decide = (id: string, approved: boolean) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, status: approved ? "Approved" : "Rejected" } : i)));
    notify(approved ? "Approved" : "Rejected");
  };

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Approvals</h1>
        <p className="text-sm text-slate-500">Review and action pending requests.</p>
      </div>
      <div className="divide-y rounded-xl border border-slate-200 bg-white shadow-sm">
        {items.map((i) => (
          <div key={i.id} className="flex items-center justify-between p-4 transition-all duration-150 hover:bg-slate-50">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-slate-400" />
              <div>
                <div className="font-medium text-slate-900">{i.title}</div>
                <div className="text-xs text-slate-500">Requested by {i.requester}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {i.status === "Pending" ? (
                <>
                  <button onClick={() => decide(i.id, true)} className="rounded-lg bg-green-600 px-3 py-1.5 text-xs font-semibold text-white transition-all duration-150 hover:bg-green-700">
                    <Check className="h-3 w-3" />
                  </button>
                  <button onClick={() => decide(i.id, false)} className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white transition-all duration-150 hover:bg-red-700">
                    <X className="h-3 w-3" />
                  </button>
                </>
              ) : (
                <span className={`flex items-center gap-1 rounded px-2 py-0.5 text-[10px] font-bold uppercase ${i.status === "Approved" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                  <CheckCircle2 className="h-3 w-3" /> {i.status}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
