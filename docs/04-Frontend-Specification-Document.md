# Frontend Specification Document
## TrackForge — Enterprise Project & Issue Tracking Platform

**Version:** 1.0
**Audience:** Frontend Engineering / AI coding agents (Windsurf)

---

## 1. Design Philosophy

TrackForge's UI must read as **enterprise-grade software**, not a template or MVP demo. Reference bar: Jira, Linear, Azure DevOps, GitHub Projects. Concretely, that means:

- **Information density done well** — enterprise users manage hundreds of issues; the UI favors compact, scannable tables/cards over generous marketing-site whitespace, while staying uncluttered.
- **Consistency over novelty** — one spacing scale, one type scale, one color system, applied identically everywhere. No page should look like it came from a different app.
- **Fast perceived performance** — optimistic UI updates, skeleton loaders (never blank white screens), instant drag-and-drop feedback.
- **Restrained color** — neutral grays as the dominant palette; color reserved for status, priority, and semantic meaning (not decoration).
- **Keyboard-first power users supported** — shortcuts for create issue (`c`), search (`/` or `g` then `s`), navigate boards, etc.

## 2. Design System Foundations

### 2.1 Color System
- Neutral scale: 10-step gray scale (`gray-50` → `gray-900`) as the primary UI palette (backgrounds, borders, text).
- Brand/primary accent: single primary color (e.g., deep indigo/blue — avoid Jira's exact blue for trademark distinctiveness) used sparingly for primary actions, links, active states.
- Semantic colors: 
  - Success/Done green, Warning/amber, Danger/red, Info blue.
  - Priority colors: Highest (red), High (orange), Medium (yellow), Low (blue-gray), Lowest (gray).
  - Status category colors: To Do (gray), In Progress (blue), Done (green) — individual custom statuses inherit their category color unless explicitly overridden.
- All colors must meet WCAG 2.1 AA contrast ratios against their backgrounds (4.5:1 for text).

### 2.2 Typography
- Font: Inter (or system font stack fallback: `-apple-system, Segoe UI, Roboto`) — a neutral, highly legible UI font standard in enterprise SaaS.
- Type scale (px): 12 (caption/meta) / 13 (dense table text) / 14 (body default) / 16 (section headers) / 20 (page titles) / 24 (dashboard headers).
- Font weights: 400 (body), 500 (medium emphasis/labels), 600 (headers/buttons).

### 2.3 Spacing & Layout Grid
- 4px base spacing unit (4/8/12/16/24/32/48px scale).
- Max content width for forms/detail panels: 720px for readability; boards/tables are full-width.
- Consistent 3-pane app shell: **left global nav rail** (collapsible) → **secondary/project nav sidebar** (contextual) → **main content area**.

### 2.4 Component Library Approach
- Build on **shadcn/ui** (Radix primitives + Tailwind) for accessible, unstyled-by-default primitives (Dialog, Dropdown, Popover, Tabs, Tooltip, Command palette) then theme to TrackForge's design tokens — this avoids both "generic Bootstrap look" and reinventing accessible primitives from scratch.
- Icon set: Lucide (consistent, enterprise-neutral, matches shadcn ecosystem).

## 3. Application Shell & Navigation

### 3.1 Global Navigation (top bar, persistent)
- Left: Product logo/mark, global "Create" button (primary CTA, opens issue creation modal from anywhere).
- Center: Global search (expands to full-screen command palette with fuzzy search across issues/projects/people — `Cmd+K` / `Ctrl+K`).
- Right: Notifications bell (badge count, dropdown preview), Help menu, User avatar menu (profile, settings, org switcher, logout).

### 3.2 Left Sidebar (collapsible, per-context)
- **Global level:** Your Work, Projects (list/starred), Filters, Dashboards, Apps/Integrations.
- **Project level (when inside a project):** Board, Backlog, Timeline/Roadmap, Reports (submenu: Burndown, Velocity, Cumulative Flow), Issues (list view), Releases/Versions, Project Settings (if permitted).
- Sidebar collapses to icon-only rail on smaller viewports or user preference (persisted).

### 3.3 Breadcrumb / Context Header
- Every project-scoped page shows: Project icon + name → current section, with a project switcher dropdown.

## 4. Key Screens — Detailed Specification

### 4.1 Scrum/Kanban Board
- Column header: status name, WIP limit indicator (count/limit, turns red if exceeded), collapse column toggle.
- Card: issue type icon, key (e.g., `ENG-142`), summary (truncated 2 lines), avatar stack (assignee), priority icon, label chips (max 3 visible + overflow count), story point badge.
- Drag-and-drop via `@dnd-kit` (accessible, keyboard-operable drag-drop — required for WCAG compliance, unlike older `react-beautiful-dnd`).
- Swimlane grouping toggle (none / by epic / by assignee).
- Quick-filter chips above board (Only My Issues, Recently Updated) + avatar filter row.
- Sprint header (Scrum only): sprint name, date range, days remaining, "Complete Sprint" action, sprint goal display.

### 4.2 Backlog View
- Sprint sections (collapsible) stacked above a single "Backlog" section.
- Each row: drag handle, type icon, key, summary, story points (inline editable), assignee avatar (click to reassign inline), quick-add to sprint.
- "Create Sprint" and "Start Sprint" (opens modal: date range, sprint goal) actions.
- Epic panel (collapsible right rail): filter backlog by epic, color-coded epic bars on rows.

### 4.3 Issue Detail View (modal or full-page, both supported)
- Layout: 2-column. Left (main): breadcrumb, editable title (inline), description (rich text editor), activity tabs (Comments / History / Work Log), comment composer at bottom.
- Right (metadata rail): Status dropdown (workflow-aware, only shows valid transitions), Assignee, Reporter, Priority, Labels, Sprint, Story Points, Fix Version, Components, Due Date, Linked Issues section, Attachments section, Created/Updated timestamps.
- Sub-tasks section (inline mini-list with add-subtask affordance) if applicable to issue type.
- All field edits are inline (click-to-edit), auto-save on blur with optimistic update + toast on failure/rollback.

### 4.4 Issue List / Table View
- Dense data table (virtualized for performance with 10,000+ rows — `@tanstack/react-table` + `@tanstack/react-virtual`).
- Configurable/reorderable columns, column-level sort, inline cell editing for status/assignee/priority.
- Bulk-select checkbox column → bulk action toolbar (bulk edit, bulk transition, bulk export).
- Saved filter tabs above the table; TQL query bar with autocomplete.

### 4.5 Dashboards
- Grid layout, drag-to-reorder/resize widgets (`react-grid-layout`).
- Widget types: Assigned to Me, Filter Results (mini table), Pie Chart by Field, Two-Dimensional Stats, Sprint Health, Activity Stream.
- "Add Widget" gallery modal; per-widget config panel (choose filter/project/field).

### 4.6 Reports (Burndown/Velocity/CFD)
- Left: chart (Recharts or Visx — Recharts recommended for faster enterprise-standard delivery), full-width, with legend and hover tooltips.
- Right/below: supporting data table and interpretation summary text (auto-generated, e.g., "Team completed 34 of 40 committed points").

### 4.7 Admin Console
- Distinct visual context (subtle background tint or top banner "Organization Settings") so admins are never confused about whether they're editing global vs. project settings.
- Left sub-nav: Users & Groups, Roles & Permissions, Projects, Workflows, Custom Fields, Notification Schemes, Audit Log, Security (SSO/SAML config), Billing.
- Users & Groups: searchable/sortable table, bulk invite (CSV upload with column mapping step), role assignment inline.
- Workflow Builder: visual node/edge canvas (React Flow) — statuses as nodes, transitions as directed edges, click-to-configure conditions/validators/post-functions in a side panel.

## 5. Interaction & Feedback Patterns
- **Optimistic updates everywhere** for drag-drop, inline edits, comment posting — rollback with a toast error if the server rejects.
- **Skeleton loaders**, not spinners, for initial page/section loads (matches perceived-performance standard of Linear/Jira).
- **Toasts** (bottom-right) for background action confirmations ("Issue moved to Done", with Undo affordance where feasible).
- **Empty states** are designed, not blank — every list/board/dashboard has an illustrated/actionable empty state ("No issues yet — Create your first issue").
- **Command palette** (`Cmd+K`) as a first-class navigation method, not an afterthought.

## 6. Responsive Behavior
- Breakpoints: `sm` 640px / `md` 768px / `lg` 1024px / `xl` 1280px / `2xl` 1536px (Tailwind defaults).
- Board and table views: below `lg`, sidebar auto-collapses to icon rail; below `md`, board columns become horizontally swipeable, table views switch to stacked card layout.
- Full mobile-native experience is out of scope for v1 (per PRD) — responsive web must remain usable, not necessarily optimized, at mobile widths.

## 7. Accessibility Requirements
- WCAG 2.1 AA target (per PRD NFRs).
- All interactive elements keyboard-navigable; drag-and-drop has keyboard-equivalent (via `@dnd-kit` built-in support).
- Focus states visible and consistent (2px ring, brand-colored).
- Color never the sole indicator of status/priority — always paired with icon and/or text label.
- Modal dialogs trap focus and are dismissible via `Esc`.

## 8. Frontend Technical Conventions

| Concern | Choice |
|---|---|
| State (server) | TanStack Query (React Query) — caching, background refetch, optimistic mutations |
| State (client/UI) | Zustand for lightweight global UI state (sidebar collapsed, active filters) |
| Forms | React Hook Form + Zod schema validation, shared validation schemas mirrored from backend DTOs |
| Routing | React Router v6 (nested routes matching project/board/issue hierarchy) |
| Styling | Tailwind CSS with a `tokens.ts` design-token source feeding the Tailwind config (single source of truth for colors/spacing) |
| Rich text editor | Tiptap (ProseMirror-based) for issue descriptions/comments |
| Drag & drop | @dnd-kit |
| Tables | TanStack Table + TanStack Virtual |
| Charts | Recharts |
| API client | Auto-generated TypeScript client from backend OpenAPI spec (`openapi-typescript-codegen`) — never hand-write fetch calls |
| Testing | Vitest + React Testing Library (unit/component), Playwright (e2e critical flows: create issue, move card, complete sprint) |

## 9. Component Inventory (for Windsurf ticket mapping)
`AppShell`, `GlobalNav`, `SidebarNav`, `CommandPalette`, `IssueCard`, `BoardColumn`, `BoardView`, `BacklogRow`, `SprintHeader`, `IssueDetailPanel`, `RichTextEditor`, `IssueMetadataRail`, `IssueTable`, `BulkActionToolbar`, `FilterBar`, `TQLQueryInput`, `DashboardGrid`, `DashboardWidget`, `WorkflowBuilderCanvas`, `AdminUserTable`, `RoleEditor`, `AuditLogTable`, `NotificationCenter`, `Toast`, `EmptyState`, `SkeletonLoader`.
