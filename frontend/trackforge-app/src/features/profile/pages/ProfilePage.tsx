export function ProfilePage() {
  return (
    <div className="h-full bg-slate-50 p-6 animate-fadeIn">
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Your profile</h1>
      <div className="max-w-sm rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-700">U</div>
          <div>
            <div className="font-semibold text-slate-900">User</div>
            <div className="text-sm text-slate-500">user@trackforge.io</div>
          </div>
        </div>
        <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm">Edit profile</button>
      </div>
    </div>
  );
}
