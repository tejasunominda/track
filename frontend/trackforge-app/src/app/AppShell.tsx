import { Outlet } from "react-router-dom";
import { Breadcrumbs } from "@/app/Breadcrumbs";
import { GlobalNav } from "@/app/GlobalNav";
import { SidebarNav } from "@/app/SidebarNav";

/**
 * Persistent 3-pane app shell: top global nav, contextual sidebar, main content.
 * See Frontend Specification Document §3.
 */
export function AppShell() {
  return (
    <div className="flex h-screen flex-col">
      <GlobalNav />
      <Breadcrumbs />
      <div className="flex flex-1 overflow-hidden">
        <SidebarNav />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
