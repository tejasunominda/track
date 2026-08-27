import { useState } from "react";
import { NavLink, useMatch } from "react-router-dom";
import {
  Layout, List, Grid3X3, Filter, Home, BarChart3, Settings, Users, Search,
  Bell, Shield, HelpCircle, User, Clock, ChevronDown, Tag, GitBranch,
  Workflow, FileText, DollarSign, Plug, Headphones, Briefcase, Map,
  Mountain, Calendar, Clock3, Layers, Wand2, Download, Upload, Archive,
  Target, FormInput, AlertTriangle,
  Activity, Bookmark, Flag, Trash2, Copy, Move, Edit3, Link2,
  History, BellRing, Mail, AtSign, Eye, ThumbsUp, Star,
  GanttChartSquare, FileSpreadsheet, Presentation, StickyNote,
  RefreshCcw, Users2, TrendingUp, Award, Network, BriefcaseBusiness,
  UserPlus, UserMinus, Palmtree, Receipt, FileCheck, Handshake, ShoppingCart,
  Box, HardDrive, Monitor, Contact, Lightbulb, Quote, Package,
  Truck, CreditCard, Undo, Wallet, Building2, Factory,
  ClipboardList, Wrench, Bug, XOctagon, ShieldCheck, GraduationCap,
  BookOpen, ScrollText, ListChecks, ClipboardCheck, PlayCircle, Server,
  Rocket, ToggleLeft, FlaskConical, Gauge, Siren, Phone, FileSearch,
  BookMarked, Zap, Palette, MailOpen, CheckSquare, SquareStack,
  ArrowRightLeft, FileImage,
  PencilLine, Brain, PenTool, Type, UsersRound, Milestone,
} from "lucide-react";

type IconType = React.ElementType;

interface NavEntry { to: string; icon: IconType; label: string; }
interface NavGroup { title: string; icon: IconType; items: NavEntry[]; }

const groups: NavGroup[] = [
  {
    title: "Main", icon: Home, items: [
      { to: "/", icon: Home, label: "Your work" },
      { to: "/projects", icon: Grid3X3, label: "Projects" },
      { to: "/search", icon: Search, label: "Search" },
      { to: "/filters", icon: Filter, label: "Filters" },
      { to: "/dashboards", icon: Layout, label: "Dashboards" },
      { to: "/notifications", icon: Bell, label: "Notifications" },
    ],
  },
  {
    title: "Planning", icon: Map, items: [
      { to: "/roadmap", icon: Map, label: "Roadmap" },
      { to: "/epics", icon: Mountain, label: "Epics" },
      { to: "/milestones", icon: Milestone, label: "Milestones" },
      { to: "/versions", icon: Tag, label: "Versions" },
      { to: "/releases", icon: GitBranch, label: "Releases" },
      { to: "/calendar", icon: Calendar, label: "Calendar" },
      { to: "/timeline", icon: Clock3, label: "Timeline" },
      { to: "/gantt", icon: GanttChartSquare, label: "Gantt" },
      { to: "/dependencies", icon: ArrowRightLeft, label: "Dependencies" },
      { to: "/goals", icon: Target, label: "Goals" },
      { to: "/portfolio", icon: Briefcase, label: "Portfolio" },
    ],
  },
  {
    title: "Project Config", icon: Settings, items: [
      { to: "/components", icon: Layers, label: "Components" },
      { to: "/labels", icon: Tag, label: "Labels" },
      { to: "/workflows", icon: Workflow, label: "Workflows" },
      { to: "/issue-types", icon: Type, label: "Issue types" },
      { to: "/permissions", icon: Shield, label: "Permissions" },
      { to: "/custom-fields", icon: FormInput, label: "Custom fields" },
      { to: "/screens", icon: Layout, label: "Screens" },
      { to: "/schemes", icon: SquareStack, label: "Schemes" },
      { to: "/field-configs", icon: ListChecks, label: "Field configs" },
      { to: "/automation", icon: Wand2, label: "Automation" },
      { to: "/rule-engine", icon: Zap, label: "Rule engine" },
      { to: "/templates", icon: FileText, label: "Templates" },
    ],
  },
  {
    title: "Teams & People", icon: Users, items: [
      { to: "/people", icon: Users, label: "People" },
      { to: "/teams", icon: UsersRound, label: "Teams" },
      { to: "/roles", icon: Shield, label: "Roles" },
      { to: "/groups", icon: Users2, label: "Groups" },
      { to: "/invitations", icon: UserPlus, label: "Invitations" },
      { to: "/org-chart", icon: Network, label: "Org chart" },
      { to: "/job-descriptions", icon: BriefcaseBusiness, label: "Job descriptions" },
      { to: "/hiring", icon: UserPlus, label: "Hiring" },
      { to: "/onboarding", icon: UserPlus, label: "Onboarding" },
      { to: "/offboarding", icon: UserMinus, label: "Offboarding" },
      { to: "/vacation", icon: Palmtree, label: "Vacation" },
      { to: "/time-sheets", icon: Clock, label: "Time sheets" },
      { to: "/resource-planning", icon: Users, label: "Resource planning" },
      { to: "/skills-matrix", icon: Award, label: "Skills matrix" },
      { to: "/career-path", icon: TrendingUp, label: "Career path" },
      { to: "/performance-review", icon: Star, label: "Performance review" },
      { to: "/one-on-one", icon: Users, label: "1:1s" },
      { to: "/standups", icon: Activity, label: "Standups" },
      { to: "/retrospectives", icon: RefreshCcw, label: "Retrospectives" },
      { to: "/meeting-notes", icon: StickyNote, label: "Meeting notes" },
    ],
  },
  {
    title: "Issue Actions", icon: List, items: [
      { to: "/tasks", icon: CheckSquare, label: "Tasks" },
      { to: "/subtasks", icon: List, label: "Subtasks" },
      { to: "/checklists", icon: ClipboardCheck, label: "Checklists" },
      { to: "/task-dependencies", icon: ArrowRightLeft, label: "Task dependencies" },
      { to: "/bulk-edit", icon: Edit3, label: "Bulk edit" },
      { to: "/copy", icon: Copy, label: "Copy" },
      { to: "/move", icon: Move, label: "Move" },
      { to: "/link", icon: Link2, label: "Link" },
      { to: "/clone", icon: Copy, label: "Clone" },
      { to: "/import", icon: Upload, label: "Import" },
      { to: "/export", icon: Download, label: "Export" },
      { to: "/archive", icon: Archive, label: "Archive" },
      { to: "/trash", icon: Trash2, label: "Trash" },
      { to: "/recycle-bin", icon: Trash2, label: "Recycle bin" },
      { to: "/drafts", icon: FileText, label: "Drafts" },
      { to: "/history", icon: History, label: "History" },
      { to: "/activity", icon: Activity, label: "Activity" },
      { to: "/reminders", icon: BellRing, label: "Reminders" },
      { to: "/bookmarks", icon: Bookmark, label: "Bookmarks" },
      { to: "/flags", icon: Flag, label: "Flags" },
      { to: "/votes", icon: ThumbsUp, label: "Votes" },
      { to: "/watchers", icon: Eye, label: "Watchers" },
      { to: "/mentions", icon: AtSign, label: "Mentions" },
      { to: "/subscriptions", icon: Star, label: "Subscriptions" },
    ],
  },
  {
    title: "DevOps & QA", icon: Rocket, items: [
      { to: "/test-plans", icon: ClipboardList, label: "Test plans" },
      { to: "/test-cases", icon: ClipboardCheck, label: "Test cases" },
      { to: "/test-runs", icon: PlayCircle, label: "Test runs" },
      { to: "/environments", icon: Server, label: "Environments" },
      { to: "/deployments", icon: Rocket, label: "Deployments" },
      { to: "/feature-flags", icon: ToggleLeft, label: "Feature flags" },
      { to: "/a-b-tests", icon: FlaskConical, label: "A/B tests" },
      { to: "/change-log", icon: History, label: "Change log" },
      { to: "/release-notes", icon: FileText, label: "Release notes" },
      { to: "/risk-register", icon: AlertTriangle, label: "Risk register" },
      { to: "/postmortems", icon: FileSearch, label: "Postmortems" },
      { to: "/runbooks", icon: BookOpen, label: "Runbooks" },
      { to: "/service-catalog", icon: BookMarked, label: "Service catalog" },
    ],
  },
  {
    title: "Monitoring", icon: Gauge, items: [
      { to: "/metrics", icon: Gauge, label: "Metrics" },
      { to: "/alerts", icon: Siren, label: "Alerts" },
      { to: "/incidents", icon: AlertTriangle, label: "Incidents" },
      { to: "/on-call", icon: Phone, label: "On-call" },
    ],
  },
  {
    title: "Service Desk", icon: Headphones, items: [
      { to: "/service-desk", icon: Headphones, label: "Service desk" },
      { to: "/queues", icon: List, label: "Queues" },
      { to: "/request-types", icon: FormInput, label: "Request types" },
      { to: "/portal", icon: Layout, label: "Portal" },
      { to: "/s-l-a", icon: Clock, label: "SLA policies" },
      { to: "/canned-responses", icon: MailOpen, label: "Canned responses" },
      { to: "/surveys", icon: FileText, label: "Surveys" },
      { to: "/knowledge-base", icon: BookOpen, label: "Knowledge base" },
    ],
  },
  {
    title: "CRM & Sales", icon: Contact, items: [
      { to: "/customers", icon: Contact, label: "Customers" },
      { to: "/contacts", icon: Users, label: "Contacts" },
      { to: "/leads", icon: Target, label: "Leads" },
      { to: "/deals", icon: Handshake, label: "Deals" },
      { to: "/opportunities", icon: Lightbulb, label: "Opportunities" },
      { to: "/quotes", icon: Quote, label: "Quotes" },
      { to: "/orders", icon: Package, label: "Orders" },
      { to: "/shipments", icon: Truck, label: "Shipments" },
    ],
  },
  {
    title: "Finance", icon: DollarSign, items: [
      { to: "/invoices", icon: FileText, label: "Invoices" },
      { to: "/invoices-received", icon: FileText, label: "Invoices received" },
      { to: "/payments", icon: CreditCard, label: "Payments" },
      { to: "/refunds", icon: Undo, label: "Refunds" },
      { to: "/expenses", icon: Receipt, label: "Expenses" },
      { to: "/budgets", icon: Wallet, label: "Budgets" },
      { to: "/forecasts", icon: TrendingUp, label: "Forecasts" },
      { to: "/cost-centers", icon: Building2, label: "Cost centers" },
      { to: "/purchase-orders", icon: ShoppingCart, label: "Purchase orders" },
      { to: "/billing", icon: DollarSign, label: "Billing" },
    ],
  },
  {
    title: "Procurement & Mfg", icon: Factory, items: [
      { to: "/suppliers", icon: Truck, label: "Suppliers" },
      { to: "/procurement", icon: ShoppingCart, label: "Procurement" },
      { to: "/inventory", icon: Box, label: "Inventory" },
      { to: "/hardware", icon: HardDrive, label: "Hardware" },
      { to: "/software", icon: Monitor, label: "Software" },
      { to: "/manufacturing", icon: Factory, label: "Manufacturing" },
      { to: "/bill-of-materials", icon: ClipboardList, label: "Bill of materials" },
      { to: "/work-orders", icon: Wrench, label: "Work orders" },
    ],
  },
  {
    title: "Quality & Compliance", icon: ShieldCheck, items: [
      { to: "/quality", icon: ShieldCheck, label: "Quality" },
      { to: "/inspections", icon: ClipboardCheck, label: "Inspections" },
      { to: "/defects", icon: Bug, label: "Defects" },
      { to: "/non-conformances", icon: XOctagon, label: "Non-conformances" },
      { to: "/capa", icon: Wrench, label: "CAPA" },
      { to: "/training", icon: GraduationCap, label: "Training" },
      { to: "/certifications", icon: Award, label: "Certifications" },
      { to: "/compliance", icon: ShieldCheck, label: "Compliance" },
      { to: "/policies", icon: ScrollText, label: "Policies" },
      { to: "/procedures", icon: ListChecks, label: "Procedures" },
      { to: "/work-instructions", icon: ClipboardCheck, label: "Work instructions" },
    ],
  },
  {
    title: "Content & Docs", icon: FileText, items: [
      { to: "/wiki", icon: BookOpen, label: "Wiki" },
      { to: "/documents", icon: FileText, label: "Documents" },
      { to: "/files", icon: FileText, label: "Files" },
      { to: "/images", icon: FileImage, label: "Images" },
      { to: "/drawings", icon: PencilLine, label: "Drawings" },
      { to: "/mind-map", icon: Brain, label: "Mind map" },
      { to: "/whiteboard", icon: PenTool, label: "Whiteboard" },
      { to: "/spreadsheets", icon: FileSpreadsheet, label: "Spreadsheets" },
      { to: "/presentations", icon: Presentation, label: "Presentations" },
    ],
  },
  {
    title: "Admin & System", icon: Settings, items: [
      { to: "/admin/audit-log", icon: Shield, label: "Audit log" },
      { to: "/audit-trail", icon: History, label: "Audit trail" },
      { to: "/security", icon: ShieldCheck, label: "Security" },
      { to: "/webhooks", icon: Plug, label: "Webhooks" },
      { to: "/integrations", icon: Plug, label: "Integrations" },
      { to: "/migrate", icon: Move, label: "Migrate" },
      { to: "/analytics", icon: BarChart3, label: "Analytics" },
      { to: "/settings", icon: Settings, label: "Settings" },
      { to: "/color-schemes", icon: Palette, label: "Color schemes" },
      { to: "/email-templates", icon: Mail, label: "Email templates" },
      { to: "/in-app-messages", icon: MailOpen, label: "In-app messages" },
      { to: "/macros", icon: Zap, label: "Macros" },
      { to: "/quick-filters", icon: Filter, label: "Quick filters" },
      { to: "/reports-builder", icon: BarChart3, label: "Reports builder" },
      { to: "/reports-export", icon: Download, label: "Reports export" },
      { to: "/dashboard-builder", icon: Layout, label: "Dashboard builder" },
      { to: "/notifications-hub", icon: Bell, label: "Notifications hub" },
      { to: "/forms", icon: FormInput, label: "Forms" },
      { to: "/assets", icon: Box, label: "Assets" },
      { to: "/approvals", icon: FileCheck, label: "Approvals" },
      { to: "/announcements", icon: BellRing, label: "Announcements" },
      { to: "/time-tracking", icon: Clock, label: "Time tracking" },
    ],
  },
  {
    title: "Account", icon: User, items: [
      { to: "/profile", icon: User, label: "Profile" },
      { to: "/help", icon: HelpCircle, label: "Help" },
    ],
  },
];

function SidebarItem({ to, icon: Icon, label }: NavEntry) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `group flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium transition-all duration-200 ${
          isActive
            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/20"
            : "text-slate-600 hover:translate-x-0.5 hover:bg-slate-100 hover:text-slate-900"
        }`
      }
    >
      <Icon className={`h-4 w-4 shrink-0 transition-transform duration-200 ${"group-hover:scale-110"}`} />
      <span className="truncate">{label}</span>
    </NavLink>
  );
}

function CollapsibleSection({ group, defaultOpen }: { group: NavGroup; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const GroupIcon = group.icon;

  return (
    <div className="mb-1">
      <button
        onClick={() => setOpen((o) => !o)}
        className="group flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-500 transition-all duration-200 hover:bg-slate-100 hover:text-slate-700"
      >
        <GroupIcon className="h-3.5 w-3.5 text-slate-400 transition-transform group-hover:scale-110" />
        <span className="flex-1 text-left">{group.title}</span>
        <ChevronDown className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="space-y-0.5 pb-2 pl-1">
          {group.items.map((item) => (
            <SidebarItem key={item.to} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function SidebarNav() {
  const projectMatch = useMatch("/projects/:projectId/*");
  const projectId = projectMatch?.params.projectId;

  const projectGroup: NavGroup | null = projectId
    ? {
        title: "Project", icon: Grid3X3, items: [
          { to: `/projects/${projectId}/board`, icon: Layout, label: "Board" },
          { to: `/projects/${projectId}/issues`, icon: List, label: "Issues" },
          { to: `/projects/${projectId}/backlog`, icon: List, label: "Backlog" },
          { to: `/projects/${projectId}/sprints`, icon: Clock, label: "Sprints" },
          { to: `/projects/${projectId}/reports`, icon: BarChart3, label: "Reports" },
        ],
      }
    : null;

  return (
    <nav className="flex w-64 shrink-0 flex-col border-r border-slate-200 bg-gradient-to-b from-slate-50 to-slate-100/50">
      <div className="flex-1 overflow-y-auto px-3 py-4 sidebar-scroll">
        {projectGroup && (
          <div className="mb-3 rounded-xl border border-blue-200 bg-blue-50/50 p-2">
            <CollapsibleSection group={projectGroup} defaultOpen={true} />
          </div>
        )}
        {groups.map((g, i) => (
          <CollapsibleSection key={g.title} group={g} defaultOpen={i < 2} />
        ))}
      </div>
    </nav>
  );
}

