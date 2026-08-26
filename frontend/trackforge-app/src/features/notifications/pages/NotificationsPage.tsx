import { useEffect, useState } from "react";
import { Mail, MailOpen } from "lucide-react";
import { useToast } from "@/app/ToastProvider";
import { listNotifications, markAllRead, markRead, Notification } from "@/features/notifications/api/notifications";

export function NotificationsPage() {
  const { notify } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    listNotifications()
      .then(setNotifications)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const mark = async (id: string) => {
    try {
      await markRead(id);
      setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
    } catch (err) {
      console.error(err);
    }
  };

  const markAll = async () => {
    try {
      await markAllRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      notify("All notifications marked as read");
    } catch (err) {
      notify("Failed to mark read", "error");
      console.error(err);
    }
  };

  if (loading) return <div className="p-6">Loading notifications…</div>;

  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Notifications</h1>
        <button
          onClick={markAll}
          className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:bg-blue-700"
        >
          Mark all read
        </button>
      </div>
      <div className="divide-y rounded-xl border border-slate-200 bg-white shadow-sm">
        {notifications.length === 0 && (
          <div className="p-6 text-center text-slate-500">No notifications.</div>
        )}
        {notifications.map((n) => (
          <button
            key={n.id}
            onClick={() => mark(n.id)}
            className={`flex w-full items-center justify-between p-4 text-left transition-all duration-150 hover:bg-slate-50 ${n.read ? "text-slate-500" : "font-medium text-slate-900"}`}
          >
            <div className="flex items-center gap-3">
              {n.read ? <MailOpen className="h-4 w-4 text-slate-400" /> : <Mail className="h-4 w-4 text-blue-500" />}
              <span className="text-sm">{n.text}</span>
            </div>
            <span className="text-xs text-slate-400">{n.time}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
