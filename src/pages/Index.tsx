import {
  useMemo,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from "react";
import {
  BellRing,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  CreditCard,
  Dumbbell,
  FileText,
  Mail,
  MapPin,
  MessageSquare,
  Plus,
  QrCode,
  Search,
  Settings,
  ShieldCheck,
  TrendingUp,
  Users,
  Phone,
  User as UserIcon,
  UserRoundCheck,
  Shield,
  HeartPulse,
  type LucideIcon,
} from "lucide-react";

export const STRIPE_LINK = "https://buy.stripe.com/00wbJ170NdYhdKPaOs9oc06";
export const WEBSITE_URL = "https://www.karatedesignscn.com";
export const INSTAGRAM_URL = "https://www.instagram.com/karate_designs.cn";

export const openStripe = () => {
  if (typeof window !== "undefined") {
    window.open(STRIPE_LINK, "_blank", "noopener");
  }
};

type SubscribeButtonProps = {
  className?: string;
  children?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

function SubscribeButton({
  className = "",
  children = (
    <>
      <CreditCard className="h-4 w-4" /> Subscribe Monthly
    </>
  ),
  onClick,
  type = "button",
  ...rest
}: SubscribeButtonProps) {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    openStripe();
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      className={className}
      {...rest}
    >
      {children}
    </button>
  );
}

type NavItem = {
  key:
    | "dashboard"
    | "schedule"
    | "attendance"
    | "issues"
    | "leads"
    | "members"
    | "tasks"
    | "docs"
    | "settings";
  label: string;
  icon: typeof Users;
};

const navItems: readonly NavItem[] = [
  { key: "dashboard", label: "Dashboard", icon: TrendingUp },
  { key: "schedule", label: "Schedule", icon: CalendarDays },
  { key: "attendance", label: "Attendance", icon: QrCode },
  { key: "issues", label: "Issues", icon: ClipboardList },
  { key: "leads", label: "Leads", icon: MessageSquare },
  { key: "members", label: "Members", icon: Users },
  { key: "tasks", label: "Tasks", icon: CheckCircle2 },
  { key: "docs", label: "Documents", icon: FileText },
  { key: "settings", label: "Settings", icon: Settings },
];

type ClassSchedule = {
  id: string;
  title: string;
  coach: string;
  room: string;
  start: string;
  end: string;
  days: number[];
};

type Member = {
  id: string;
  name: string;
  tier: string;
  active: boolean;
  beltIndex: number;
  progress: number;
};

type LeadStatus = "New" | "Follow-up" | "Won" | "Lost";

type Lead = {
  id: string;
  name: string;
  channel: string;
  message: string;
  status: LeadStatus;
};

type IssueSeverity = "low" | "medium" | "high";
type IssueStatus = "Open" | "Closed";

type Issue = {
  id: string;
  title: string;
  severity: IssueSeverity;
  status: IssueStatus;
};

type Task = {
  id: string;
  title: string;
  due: string;
  done: boolean;
};

type DocumentItem = {
  id: string;
  title: string;
  updated: string;
};

type AttendanceSummary = {
  total: number;
  last30d: number;
};

export type Profile = {
  id: string;
  name: string;
  dob?: string;
  phone?: string;
  email?: string;
  guardianName?: string;
  emergencyContact?: string;
  medicalNotes?: string;
  address?: string;
  attendance?: AttendanceSummary;
};

const classesSeed: ClassSchedule[] = [
  {
    id: "c1",
    title: "Kids Karate (6-9)",
    coach: "Sensei Aiko",
    room: "Dojo A",
    start: "16:00",
    end: "17:00",
    days: [1, 3, 5],
  },
  {
    id: "c2",
    title: "Teens Kumite",
    coach: "Coach Miguel",
    room: "Dojo B",
    start: "17:15",
    end: "18:30",
    days: [2, 4],
  },
  {
    id: "c3",
    title: "Adults All Levels",
    coach: "Sensei Tanaka",
    room: "Dojo A",
    start: "19:00",
    end: "20:30",
    days: [1, 3],
  },
];

export const BELT_ORDER: { name: string; color: string }[] = [
  { name: "White", color: "from-gray-200 to-gray-300" },
  { name: "Yellow", color: "from-yellow-200 to-yellow-300" },
  { name: "Orange", color: "from-orange-200 to-orange-300" },
  { name: "Green", color: "from-emerald-200 to-emerald-300" },
  { name: "Blue", color: "from-sky-200 to-sky-300" },
  { name: "Purple", color: "from-violet-200 to-violet-300" },
  { name: "Brown", color: "from-amber-300 to-amber-500" },
  { name: "Red", color: "from-rose-300 to-rose-400" },
  { name: "Black", color: "from-gray-800 to-black" },
];

export const clampProgress = (v: number) => Math.max(0, Math.min(100, v));
export const nextBeltIndex = (idx: number, beltCount: number) =>
  Math.min(idx + 1, beltCount - 1);

export const calcAge = (dob?: string) => {
  if (!dob) return undefined;
  const d = new Date(dob);
  if (Number.isNaN(d.getTime())) return undefined;
  const today = new Date();
  let age = today.getFullYear() - d.getFullYear();
  const m = today.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < d.getDate())) age--;
  return age;
};

const membersSeed: Member[] = [
  { id: "m1", name: "Alex P.", tier: "Basic", active: true, beltIndex: 1, progress: 40 },
  { id: "m2", name: "Sara K.", tier: "Premium", active: true, beltIndex: 3, progress: 75 },
  { id: "m3", name: "Jordan T.", tier: "Trial", active: false, beltIndex: 0, progress: 10 },
];

const leadsSeed: Lead[] = [
  {
    id: "l1",
    name: "Nikos",
    channel: "Instagram",
    message: "My kid is 7, do you have beginner classes?",
    status: "New",
  },
  {
    id: "l2",
    name: "Maria",
    channel: "Website",
    message: "Price for adult classes?",
    status: "Follow-up",
  },
];

const issuesSeed: Issue[] = [
  { id: "i1", title: "Mats need sanitizing", severity: "medium", status: "Open" },
  {
    id: "i2",
    title: "Locker room light flickering",
    severity: "low",
    status: "Open",
  },
];

const tasksSeed: Task[] = [
  { id: "t1", title: "Post weekend schedule on IG", due: "Fri", done: false },
  { id: "t2", title: "Call lead Maria", due: "Today", done: true },
];

const docsSeed: DocumentItem[] = [
  { id: "d1", title: "Liability Waiver.pdf", updated: "2025-09-10" },
  { id: "d2", title: "Belt Test Policy.pdf", updated: "2025-08-20" },
];

const profilesSeed: Record<string, Profile> = {
  m1: {
    id: "m1",
    name: "Alex P.",
    dob: "2014-06-12",
    phone: "+357 99 111 222",
    email: "alex.parents@example.com",
    guardianName: "Peter P.",
    emergencyContact: "Peter • +357 99 111 222",
    medicalNotes: "Peanut allergy (carry EpiPen).",
    address: "123 Dojo St, Nicosia",
    attendance: { total: 86, last30d: 8 },
  },
  m2: {
    id: "m2",
    name: "Sara K.",
    dob: "2009-11-03",
    phone: "+357 99 333 444",
    email: "sara.k@example.com",
    guardianName: "—",
    emergencyContact: "Mother • +357 99 555 666",
    medicalNotes: "None",
    address: "456 Kata Ave, Nicosia",
    attendance: { total: 142, last30d: 11 },
  },
  m3: {
    id: "m3",
    name: "Jordan T.",
    dob: "2017-02-20",
    phone: "+357 99 777 888",
    email: "jordan.parents@example.com",
    guardianName: "Maria T.",
    emergencyContact: "Maria • +357 99 777 000",
    medicalNotes: "Asthma (inhaler at reception).",
    address: "789 Shomen Rd, Nicosia",
    attendance: { total: 23, last30d: 3 },
  },
};

function Header({ onSubscribe }: { onSubscribe: () => void }) {
  return (
    <div className="sticky top-0 z-40 border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 shadow-lg">
            <Dumbbell className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="font-semibold leading-tight text-gray-900">Dojo Admin</div>
            <div className="-mt-0.5 text-xs text-gray-500">Manage classes • Members • Growth</div>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <SubscribeButton className="group relative inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm transition-all hover:shadow-md">
            <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-rose-500/0 via-rose-500/10 to-rose-500/0 opacity-0 transition group-hover:opacity-100" />
            <CreditCard className="h-4 w-4" /> Subscribe Monthly
            <ChevronRight className="h-4 w-4 opacity-60" />
          </SubscribeButton>
          <button
            className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 px-3 py-2 text-sm font-medium shadow-sm transition-all hover:shadow-md"
            onClick={() => alert("Alerts coming soon")}
          >
            <BellRing className="h-4 w-4" /> Alerts
          </button>
        </div>
      </div>
    </div>
  );
}

function Sidebar({
  active,
  setActive,
}: {
  active: NavItem["key"];
  setActive: (k: NavItem["key"]) => void;
}) {
  return (
    <aside className="h-full w-full shrink-0 border-r bg-white/60 backdrop-blur supports-[backdrop-filter]:bg-white/50 sm:w-64">
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            className="w-full rounded-xl border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
            placeholder="Quick find..."
          />
        </div>
      </div>
      <nav className="space-y-1 px-2 pb-4">
        {navItems.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-all ${
              active === key
                ? "bg-rose-50 text-rose-700 shadow-sm"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            <Icon
              className={`h-4 w-4 ${
                active === key
                  ? "text-rose-600"
                  : "text-gray-500 group-hover:text-gray-700"
              }`}
            />
            {label}
          </button>
        ))}
      </nav>
      <div className="px-4 py-6">
        <div className="rounded-2xl border bg-gradient-to-br from-gray-50 to-white p-4 shadow-sm">
          <div className="mb-1 text-xs font-semibold text-gray-700">Need help?</div>
          <p className="mb-3 text-xs text-gray-500">Email us for onboarding support.</p>
          <a
            href="mailto:support@yourdojo.app"
            className="inline-flex items-center gap-2 text-sm font-medium text-rose-600 hover:underline"
          >
            <Mail className="h-4 w-4" /> support@yourdojo.app
          </a>
        </div>
      </div>
    </aside>
  );
}

type StatCardProps = {
  icon: LucideIcon;
  label: string;
  value: string;
  trend?: string;
};

function StatCard({ icon: Icon, label, value, trend }: StatCardProps) {
  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-rose-500 to-rose-600 text-white shadow">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <div className="text-xs text-gray-500">{label}</div>
          <div className="text-lg font-semibold text-gray-900">{value}</div>
        </div>
        {trend && <div className="ml-auto text-xs font-medium text-emerald-600">{trend}</div>}
      </div>
    </div>
  );
}

function DashboardView({ members, leads }: { members: Member[]; leads: Lead[] }) {
  const nextPromotions = members.filter((m) => (m.progress || 0) >= 90).length;
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={Users}
          label="Active Members"
          value={`${members.filter((m) => m.active).length}`}
          trend="+3 this month"
        />
        <StatCard icon={MessageSquare} label="New Leads" value={`${leads.length}`} trend="+5%" />
        <StatCard icon={CalendarDays} label="Classes This Week" value="12" />
        <StatCard icon={ShieldCheck} label="Ready for Belt Test" value={`${nextPromotions}`} />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border bg-white p-4 shadow-sm lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Announcements</h3>
            <button className="inline-flex items-center gap-2 text-sm text-rose-600 hover:underline">
              <Plus className="h-4 w-4" /> New
            </button>
          </div>
          <ul className="space-y-3">
            {[
              { t: "Belt test on Oct 20 – register by Oct 15." },
              { t: "Parents day this Saturday 10:00." },
              { t: "Remember to bring water bottles." },
            ].map((a, i) => (
              <li
                key={i}
                className="rounded-xl border p-3 transition-shadow hover:shadow-sm"
              >
                <div className="text-sm text-gray-800">{a.t}</div>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border bg-white p-4 shadow-sm">
          <h3 className="mb-3 font-semibold text-gray-900">Billing Overview</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span>MRR</span>
              <span className="font-semibold">€1,240</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Past-due invoices</span>
              <span className="font-medium text-amber-600">3</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Churn</span>
              <span className="font-medium text-emerald-600">1.8%</span>
            </div>
          </div>
          <SubscribeButton className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-rose-700 active:scale-[.99]">
            <CreditCard className="h-4 w-4" /> Subscribe / Manage
          </SubscribeButton>
        </div>
      </div>
    </div>
  );
}

function ScheduleView({
  classes,
  addClass,
}: {
  classes: ClassSchedule[];
  addClass: (c: ClassSchedule) => void;
}) {
  const [form, setForm] = useState<Omit<ClassSchedule, "id">>({
    title: "",
    coach: "",
    room: "Dojo A",
    start: "17:00",
    end: "18:00",
    days: [],
  });

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const submit = () => {
    if (!form.title || !form.coach || form.days.length === 0) {
      alert("Please fill title, coach and select days.");
      return;
    }

    const id =
      (globalThis.crypto as Crypto | undefined)?.randomUUID?.() ??
      Math.random().toString(36).slice(2);

    addClass({ ...form, id });
    setForm({ title: "", coach: "", room: "Dojo A", start: "17:00", end: "18:00", days: [] });
  };

  const fieldConfig: {
    key: keyof Pick<ClassSchedule, "title" | "coach" | "room" | "start" | "end">;
    label: string;
    type: string;
  }[] = [
    { key: "title", label: "Title", type: "text" },
    { key: "coach", label: "Coach", type: "text" },
    { key: "room", label: "Room", type: "text" },
    { key: "start", label: "Start", type: "time" },
    { key: "end", label: "End", type: "time" },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <div className="rounded-2xl border bg-white p-4 shadow-sm lg:col-span-2">
        <h3 className="mb-3 font-semibold text-gray-900">Weekly Classes</h3>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {classes.map((c) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border p-4 hover:shadow-sm"
            >
              <div className="flex items-start gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-rose-100 text-rose-700 shadow">
                  <Dumbbell className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{c.title}</div>
                  <div className="text-xs text-gray-500">
                    {c.coach} • {c.room}
                  </div>
                  <div className="mt-1 text-xs text-gray-600">
                    {c.start}–{c.end} • {c.days.map((d) => weekdays[d]).join(", ")}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="rounded-2xl border bg-white p-4 shadow-sm">
        <h3 className="mb-3 font-semibold text-gray-900">Add Class</h3>
        <div className="space-y-3">
          {fieldConfig.map(({ key, label, type }) => (
            <div key={key}>
              <label className="text-xs text-gray-600">{label}</label>
              <input
                type={type}
                value={form[key]}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, [key]: e.target.value }))
                }
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>
          ))}
          <div>
            <label className="text-xs text-gray-600">Days</label>
            <div className="mt-2 grid grid-cols-7 gap-1">
              {[0, 1, 2, 3, 4, 5, 6].map((d) => (
                <button
                  key={d}
                  onClick={() =>
                    setForm((prev) => {
                      const has = prev.days.includes(d);
                      return {
                        ...prev,
                        days: has ? prev.days.filter((x) => x !== d) : [...prev.days, d],
                      };
                    })
                  }
                  className={`rounded-lg border px-2 py-1 text-xs ${
                    form.days.includes(d)
                      ? "border-rose-600 bg-rose-600 text-white"
                      : "bg-white hover:bg-gray-50"
                  }`}
                >
                  {["S", "M", "T", "W", "T", "F", "S"][d]}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={submit}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-rose-700"
          >
            <Plus className="h-4 w-4" /> Add Class
          </button>
        </div>
      </div>
    </div>
  );
}

function AttendanceView() {
  const [code] = useState(() => Math.random().toString(36).slice(2, 8).toUpperCase());
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <div className="grid min-h-[280px] place-items-center rounded-2xl border bg-white p-6 shadow-sm lg:col-span-2">
        <div className="text-center">
          <div className="mx-auto grid h-24 w-24 place-items-center rounded-2xl border-2 border-dashed">
            <QrCode className="h-12 w-12 text-gray-500" />
          </div>
          <div className="mt-4 text-sm text-gray-600">
            Show this code at reception to mark attendance
          </div>
          <div className="mt-1 text-2xl font-bold tracking-widest">{code}</div>
        </div>
      </div>
      <div className="rounded-2xl border bg-white p-4 shadow-sm">
        <h3 className="mb-2 font-semibold text-gray-900">How it works</h3>
        <ol className="list-inside list-decimal space-y-1 text-sm text-gray-700">
          <li>Member opens their app and shows QR/code.</li>
          <li>Staff scans / enters code on front desk tablet.</li>
          <li>Attendance is recorded instantly.</li>
        </ol>
      </div>
    </div>
  );
}

function IssuesView({
  issues,
  addIssue,
  resolveIssue,
}: {
  issues: Issue[];
  addIssue: (i: Issue) => void;
  resolveIssue: (id: string) => void;
}) {
  const [title, setTitle] = useState("");
  const [severity, setSeverity] = useState<IssueSeverity>("medium");

  const submit = () => {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      alert("Please add a title");
      return;
    }

    const id =
      (globalThis.crypto as Crypto | undefined)?.randomUUID?.() ??
      Math.random().toString(36).slice(2);

    addIssue({ id, title: trimmedTitle, severity, status: "Open" });
    setTitle("");
    setSeverity("medium");
  };

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <div className="rounded-2xl border bg-white p-4 shadow-sm lg:col-span-2">
        <h3 className="mb-3 font-semibold text-gray-900">Open Issues</h3>
        <div className="space-y-3">
          {issues.map((x) => (
            <motion.div
              key={x.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 rounded-xl border p-4 hover:shadow-sm"
            >
              <ClipboardList className="h-5 w-5 text-gray-500" />
              <div className="flex-1">
                <div className="font-medium text-gray-900">{x.title}</div>
                <div className="text-xs text-gray-500">
                  Severity:
                  <span
                    className={`ml-1 inline-flex rounded px-1.5 py-0.5 ${
                      x.severity === "high"
                        ? "bg-rose-100 text-rose-700"
                        : x.severity === "medium"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-emerald-100 text-emerald-700"
                    }`}
                  >
                    {x.severity}
                  </span>
                </div>
              </div>
              {x.status !== "Closed" && (
                <button
                  onClick={() => resolveIssue(x.id)}
                  className="rounded-lg border px-2 py-1 text-xs hover:bg-gray-50"
                >
                  Resolve
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </div>
      <div className="rounded-2xl border bg-white p-4 shadow-sm">
        <h3 className="mb-3 font-semibold text-gray-900">Report Issue</h3>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-600">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
              placeholder="e.g., Broken mirror in locker room"
            />
          </div>
          <div>
            <label className="text-xs text-gray-600">Severity</label>
            <select
              value={severity}
              onChange={(e) => setSeverity(e.target.value as IssueSeverity)}
              className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <button
            onClick={submit}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-rose-700"
          >
            <Plus className="h-4 w-4" /> Submit
          </button>
        </div>
      </div>
    </div>
  );
}

function LeadsView({ leads, updateLead }: { leads: Lead[]; updateLead: (id: string, status: LeadStatus) => void }) {
  const statuses: LeadStatus[] = ["New", "Follow-up", "Won", "Lost"];
  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">Leads Inbox</h3>
        <div className="text-xs text-gray-500">Connect IG/FB later</div>
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {leads.map((l) => (
          <motion.div
            key={l.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border p-4 hover:shadow-sm"
          >
            <div className="font-medium text-gray-900">
              {l.name}
              <span className="ml-2 rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-600">
                {l.channel}
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-600">{l.message}</p>
            <div className="mt-3 flex items-center gap-2">
              {statuses.map((s) => (
                <button
                  key={s}
                  onClick={() => updateLead(l.id, s)}
                  className={`rounded-lg border px-2 py-1 text-xs ${
                    l.status === s
                      ? "border-emerald-600 bg-emerald-600 text-white"
                      : "hover:bg-gray-50"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function BeltChip({ index }: { index: number }) {
  const belt = BELT_ORDER[Math.min(index, BELT_ORDER.length - 1)];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border border-black/5 bg-gradient-to-r px-2 py-0.5 text-xs font-medium text-gray-900 ${
        belt.color
      } shadow-sm`}
    >
      {belt.name}
    </span>
  );
}

function ProgressBar({ value }: { value: number }) {
  const v = clampProgress(value);
  return (
    <div className="h-2 w-full rounded-full border bg-gray-100">
      <div
        className="h-2 rounded-full bg-gradient-to-r from-rose-500 to-rose-600"
        style={{ width: `${v}%` }}
      />
    </div>
  );
}

function ProfilePanel({
  profile,
  beltIndex,
  progress,
  onClose,
}: {
  profile: Profile;
  beltIndex: number;
  progress: number;
  onClose: () => void;
}) {
  const age = calcAge(profile.dob);
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <motion.aside
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 20, stiffness: 200 }}
        className="absolute right-0 top-0 h-full w-full overflow-y-auto border-l bg-white p-6 shadow-2xl sm:w-[480px]"
      >
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 text-lg font-semibold text-gray-900">
              <UserIcon className="h-5 w-5" />
              {profile.name}
            </div>
            <div className="mt-1 flex items-center gap-2 text-xs text-gray-600">
              <BeltChip index={beltIndex} />
              <span>Progress: {Math.round(progress)}%</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl border px-3 py-1 text-sm hover:bg-gray-50"
          >
            Close
          </button>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-3">
          <div className="rounded-xl border p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
              <UserRoundCheck className="h-4 w-4" /> Athlete
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2 text-sm text-gray-700">
              <div>
                <span className="text-gray-500">DOB:</span> {profile.dob || "—"}
                {age !== undefined ? ` (${age})` : ""}
              </div>
              <div>
                <span className="text-gray-500">Guardian:</span> {profile.guardianName || "—"}
              </div>
              <div>
                <span className="text-gray-500">Email:</span> {profile.email || "—"}
              </div>
              <div className="flex items-center gap-1">
                <Phone className="h-3.5 w-3.5" /> {profile.phone || "—"}
              </div>
              <div className="col-span-2">
                <span className="text-gray-500">Address:</span> {profile.address || "—"}
              </div>
            </div>
          </div>
          <div className="rounded-xl border p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
              <Shield className="h-4 w-4" /> Emergency
            </div>
            <div className="mt-2 text-sm text-gray-700">
              <div>
                <span className="text-gray-500">Contact:</span> {profile.emergencyContact || "—"}
              </div>
              <div className="mt-1 flex items-center gap-2">
                <HeartPulse className="h-4 w-4" />
                <span className="text-gray-500">Medical Notes:</span> {profile.medicalNotes || "None"}
              </div>
            </div>
          </div>
          <div className="rounded-xl border p-4">
            <div className="text-sm font-medium text-gray-900">Attendance</div>
            <div className="mt-2 grid grid-cols-2 gap-2 text-sm text-gray-700">
              <div>
                <span className="text-gray-500">Total:</span> {profile.attendance?.total ?? 0}
              </div>
              <div>
                <span className="text-gray-500">Last 30d:</span> {profile.attendance?.last30d ?? 0}
              </div>
            </div>
          </div>
        </div>
      </motion.aside>
    </div>
  );
}

function MembersView({
  members,
  toggleMember,
  updateProgress,
  promote,
  onViewProfile,
}: {
  members: Member[];
  toggleMember: (id: string) => void;
  updateProgress: (id: string, delta: number) => void;
  promote: (id: string) => void;
  onViewProfile: (id: string) => void;
}) {
  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">Members</h3>
        <button className="inline-flex items-center gap-2 text-sm text-rose-600 hover:underline">
          <Plus className="h-4 w-4" /> Add
        </button>
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {members.map((m) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border p-4 transition-shadow hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-medium text-gray-900">{m.name}</div>
                <div className="mt-1 flex items-center gap-2">
                  <BeltChip index={m.beltIndex || 0} />
                  <span className="text-xs text-gray-500">Tier: {m.tier}</span>
                </div>
              </div>
              <span
                className={`self-start rounded px-1.5 py-0.5 text-xs ${
                  m.active
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {m.active ? "Active" : "Inactive"}
              </span>
            </div>
            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span>Belt Progress</span>
                <span className="font-medium text-gray-800">{Math.round(m.progress || 0)}%</span>
              </div>
              <ProgressBar value={m.progress || 0} />
              <div className="mt-2 flex items-center gap-2">
                <button
                  onClick={() => updateProgress(m.id, +10)}
                  className="rounded-lg border px-2 py-1 text-xs hover:bg-gray-50"
                >
                  +10%
                </button>
                <button
                  onClick={() => updateProgress(m.id, -10)}
                  className="rounded-lg border px-2 py-1 text-xs hover:bg-gray-50"
                >
                  -10%
                </button>
                <button
                  onClick={() => promote(m.id)}
                  className="rounded-lg border border-rose-600 bg-rose-600 px-2 py-1 text-xs text-white hover:bg-rose-700"
                >
                  Promote
                </button>
                <button
                  onClick={() => onViewProfile(m.id)}
                  className="ml-auto rounded-lg border px-2 py-1 text-xs hover:bg-gray-50"
                >
                  Profile
                </button>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <button
                onClick={() => toggleMember(m.id)}
                className="rounded-lg border px-2 py-1 text-xs hover:bg-gray-50"
              >
                Toggle Active
              </button>
              <button className="rounded-lg border px-2 py-1 text-xs hover:bg-gray-50">Edit</button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function TasksView({
  tasks,
  toggleDone,
  addTask,
}: {
  tasks: Task[];
  toggleDone: (id: string) => void;
  addTask: (task: Task) => void;
}) {
  const [title, setTitle] = useState("");
  const [due, setDue] = useState("Tomorrow");

  const submit = () => {
    const trimmedTitle = title.trim();
    const trimmedDue = due.trim();

    if (!trimmedTitle) {
      alert("Add a title");
      return;
    }

    const id =
      (globalThis.crypto as Crypto | undefined)?.randomUUID?.() ??
      Math.random().toString(36).slice(2);

    addTask({ id, title: trimmedTitle, due: trimmedDue || "Soon", done: false });
    setTitle("");
    setDue("Tomorrow");
  };

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <div className="rounded-2xl border bg-white p-4 shadow-sm lg:col-span-2">
        <h3 className="mb-3 font-semibold text-gray-900">Tasks</h3>
        <div className="space-y-3">
          {tasks.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between rounded-xl border p-3 hover:shadow-sm"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={t.done}
                  onChange={() => toggleDone(t.id)}
                  className="h-4 w-4"
                />
                <div>
                  <div className={`text-sm ${t.done ? "line-through text-gray-400" : "text-gray-800"}`}>
                    {t.title}
                  </div>
                  <div className="text-xs text-gray-500">Due: {t.due}</div>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </motion.div>
          ))}
        </div>
      </div>
      <div className="rounded-2xl border bg-white p-4 shadow-sm">
        <h3 className="mb-3 font-semibold text-gray-900">Add Task</h3>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-600">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
              placeholder="e.g., Email parents about belt test"
            />
          </div>
          <div>
            <label className="text-xs text-gray-600">Due</label>
            <input
              value={due}
              onChange={(e) => setDue(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>
          <button
            onClick={submit}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-rose-700"
          >
            <Plus className="h-4 w-4" /> Add Task
          </button>
        </div>
      </div>
    </div>
  );
}

function DocsView({ docs }: { docs: DocumentItem[] }) {
  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <h3 className="mb-3 font-semibold text-gray-900">Documents</h3>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {docs.map((d) => (
          <motion.div
            key={d.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border p-4 hover:shadow-sm"
          >
            <div className="font-medium text-gray-900">{d.title}</div>
            <div className="text-xs text-gray-500">Updated {d.updated}</div>
            <div className="mt-3 flex items-center gap-2">
              <button className="rounded-lg border px-2 py-1 text-xs hover:bg-gray-50">View</button>
              <button className="rounded-lg border px-2 py-1 text-xs hover:bg-gray-50">Download</button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SettingsView() {
  return (
    <div className="space-y-4 rounded-2xl border bg-white p-4 shadow-sm">
      <h3 className="font-semibold text-gray-900">Settings</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border p-4">
          <div className="text-sm font-medium text-gray-900">Business Info</div>
          <div className="mt-3 space-y-2">
            <input
              placeholder="Dojo name"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm shadow-sm"
            />
            <input
              placeholder="Address"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm shadow-sm"
            />
            <div className="flex gap-2">
              <input
                placeholder="City"
                className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm shadow-sm"
              />
              <input
                placeholder="Postal"
                className="w-32 rounded-lg border border-gray-200 px-3 py-2 text-sm shadow-sm"
              />
            </div>
          </div>
        </div>
        <div className="rounded-xl border p-4">
          <div className="text-sm font-medium text-gray-900">Integrations</div>
          <div className="mt-3 space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span>Instagram</span>
              <button className="rounded-lg border px-2 py-1 text-xs hover:bg-gray-50">Connect</button>
            </div>
            <div className="flex items-center justify-between">
              <span>Facebook</span>
              <button className="rounded-lg border px-2 py-1 text-xs hover:bg-gray-50">Connect</button>
            </div>
            <div className="flex items-center justify-between">
              <span>Stripe</span>
              <SubscribeButton className="rounded-lg border px-2 py-1 text-xs hover:bg-gray-50">
                Manage
              </SubscribeButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Index() {
  const [active, setActive] = useState<NavItem["key"]>("dashboard");
  const [classes, setClasses] = useState(classesSeed);
  const [members, setMembers] = useState(membersSeed);
  const [leads, setLeads] = useState(leadsSeed);
  const [issues, setIssues] = useState(issuesSeed);
  const [tasks, setTasks] = useState(tasksSeed);
  const [docs] = useState(docsSeed);
  const [profiles] = useState<Record<string, Profile>>(profilesSeed);
  const [openProfileId, setOpenProfileId] = useState<string | null>(null);

  const onSubscribe = openStripe;

  const addClass = (c: ClassSchedule) => setClasses((prev) => [c, ...prev]);
  const addIssue = (i: Issue) => setIssues((prev) => [i, ...prev]);
  const resolveIssue = (id: string) =>
    setIssues((prev) => prev.map((x) => (x.id === id ? { ...x, status: "Closed" } : x)));
  const updateLead = (id: string, status: LeadStatus) =>
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
  const toggleMember = (id: string) =>
    setMembers((prev) => prev.map((m) => (m.id === id ? { ...m, active: !m.active } : m)));
  const toggleDone = (id: string) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  const addTask = (task: Task) => setTasks((prev) => [task, ...prev]);

  const updateProgress = (id: string, delta: number) => {
    setMembers((prev) =>
      prev.map((m) =>
        m.id === id
          ? { ...m, progress: clampProgress((m.progress || 0) + delta) }
          : m,
      ),
    );
  };

  const promote = (id: string) => {
    setMembers((prev) =>
      prev.map((m) => {
        if (m.id !== id) return m;
        const nextIndex = nextBeltIndex(m.beltIndex || 0, BELT_ORDER.length);
        return { ...m, beltIndex: nextIndex, progress: 0 };
      }),
    );
  };

  const view = useMemo(() => {
    switch (active) {
      case "dashboard":
        return <DashboardView members={members} leads={leads} />;
      case "schedule":
        return <ScheduleView classes={classes} addClass={addClass} />;
      case "attendance":
        return <AttendanceView />;
      case "issues":
        return <IssuesView issues={issues} addIssue={addIssue} resolveIssue={resolveIssue} />;
      case "leads":
        return <LeadsView leads={leads} updateLead={updateLead} />;
      case "members":
        return (
          <>
            <MembersView
              members={members}
              toggleMember={toggleMember}
              updateProgress={updateProgress}
              promote={promote}
              onViewProfile={(id) => setOpenProfileId(id)}
            />
            <AnimatePresence>
              {openProfileId && profiles[openProfileId] && (
                <ProfilePanel
                  profile={profiles[openProfileId]}
                  beltIndex={
                    members.find((m) => m.id === openProfileId)?.beltIndex || 0
                  }
                  progress={
                    members.find((m) => m.id === openProfileId)?.progress || 0
                  }
                  onClose={() => setOpenProfileId(null)}
                />
              )}
            </AnimatePresence>
          </>
        );
      case "tasks":
        return <TasksView tasks={tasks} toggleDone={toggleDone} addTask={addTask} />;
      case "docs":
        return <DocsView docs={docs} />;
      case "settings":
        return <SettingsView />;
      default:
        return null;
    }
  }, [
    active,
    members,
    leads,
    classes,
    issues,
    tasks,
    docs,
    openProfileId,
    profiles,
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-900">
      <Header onSubscribe={onSubscribe} />
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-[260px_1fr]">
          <Sidebar active={active} setActive={setActive} />
          <main>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                {view}
              </motion.div>
            </AnimatePresence>
            <motion.button
              onClick={onSubscribe}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="fixed bottom-6 right-6 inline-flex items-center gap-2 rounded-2xl bg-rose-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-600/30 hover:bg-rose-700 active:scale-[.99]"
            >
              <CreditCard className="h-4 w-4" /> Subscribe Monthly
            </motion.button>
          </main>
        </div>
      </div>
      <footer className="border-t bg-white/60 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" /> Built for dojos & martial arts schools • Modern UI • ©
            {" "}
            {new Date().getFullYear()}
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-600">
            <a
              href={WEBSITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-rose-600 hover:underline"
            >
              www.karatedesignscn.com
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-rose-600 hover:underline"
            >
              @karate_designs.cn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

(() => {
  const isProd = typeof process !== "undefined" && process?.env?.NODE_ENV === "production";
  if (typeof window === "undefined" || isProd) return;

  const tests: { test: string; pass: boolean }[] = [];

  tests.push({ test: "clampProgress floors to 0", pass: clampProgress(-10) === 0 });
  tests.push({ test: "clampProgress ceilings to 100", pass: clampProgress(150) === 100 });
  tests.push({ test: "clampProgress keeps mid values", pass: clampProgress(55) === 55 });
  tests.push({ test: "clampProgress handles 0", pass: clampProgress(0) === 0 });
  tests.push({ test: "clampProgress handles 100", pass: clampProgress(100) === 100 });

  tests.push({
    test: "nextBeltIndex increments",
    pass: nextBeltIndex(2, BELT_ORDER.length) === 3,
  });
  tests.push({
    test: "nextBeltIndex caps at last",
    pass: nextBeltIndex(BELT_ORDER.length - 1, BELT_ORDER.length) === BELT_ORDER.length - 1,
  });
  tests.push({
    test: "nextBeltIndex from 0",
    pass: nextBeltIndex(0, BELT_ORDER.length) === 1,
  });

  tests.push({
    test: "Stripe link matches provided",
    pass: STRIPE_LINK === "https://buy.stripe.com/00wbJ170NdYhdKPaOs9oc06",
  });
  tests.push({ test: "Website link ok", pass: WEBSITE_URL.includes("karatedesignscn.com") });
  tests.push({
    test: "Instagram link ok",
    pass: INSTAGRAM_URL.endsWith("/karate_designs.cn"),
  });

  tests.push({
    test: "leadsSeed defined",
    pass: Array.isArray(leadsSeed) && leadsSeed.length >= 1,
  });
  tests.push({
    test: "issuesSeed defined",
    pass: Array.isArray(issuesSeed) && issuesSeed.length >= 1,
  });
  tests.push({ test: "tasksSeed defined", pass: Array.isArray(tasksSeed) && tasksSeed.length >= 1 });
  tests.push({ test: "docsSeed defined", pass: Array.isArray(docsSeed) && docsSeed.length >= 1 });

  tests.push({ test: "profilesSeed has m1", pass: Boolean(profilesSeed["m1"]) });
  tests.push({ test: "calcAge parses YYYY-MM-DD", pass: typeof calcAge("2010-01-01") === "number" });
  tests.push({ test: "calcAge invalid returns undefined", pass: calcAge("not-a-date") === undefined });

  try {
    // eslint-disable-next-line no-console
    console.table(
      tests.map((t) => ({
        test: t.test,
        pass: t.pass ? "✅" : "❌",
      })),
    );
  } catch (error) {
    // ignore console errors in unsupported environments
  }
})();
type MotionConfig = {
  initial?: unknown;
  animate?: unknown;
  exit?: unknown;
  transition?: unknown;
};

type AnimatePresenceProps = { children: ReactNode } & Record<string, unknown>;

const AnimatePresence = ({ children }: AnimatePresenceProps) => <>{children}</>;

const MotionDiv = ({ initial: _i, animate: _a, exit: _e, transition: _t, ...rest }: HTMLAttributes<HTMLDivElement> & MotionConfig) => (
  <div {...rest} />
);

const MotionButton = ({ initial: _i, animate: _a, exit: _e, transition: _t, ...rest }: ButtonHTMLAttributes<HTMLButtonElement> & MotionConfig) => (
  <button {...rest} />
);

const MotionAside = ({ initial: _i, animate: _a, exit: _e, transition: _t, ...rest }: HTMLAttributes<HTMLElement> & MotionConfig) => (
  <aside {...rest} />
);

const motion = {
  div: MotionDiv,
  button: MotionButton,
  aside: MotionAside,
};
