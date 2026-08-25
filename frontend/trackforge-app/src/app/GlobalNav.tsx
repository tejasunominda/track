/**
 * Persistent top bar: logo, global Create button, command palette trigger,
 * notifications, user menu. See Frontend Specification Document §3.1.
 */
export function GlobalNav() {
  return (
    <header className="flex h-12 items-center justify-between border-b border-gray-200 bg-white px-4">
      <div className="font-semibold text-primary">TrackForge</div>
    </header>
  );
}
