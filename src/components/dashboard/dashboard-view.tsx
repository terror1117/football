"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import {
  LayoutDashboard,
  Activity,
  Bus,
  CalendarDays,
  Siren,
  Sparkles,
  Leaf,
  Bell,
  Home,
  CloudSun,
  TrendingUp,
  ChevronRight,
  Radio,
  Users,
  Clock,
  Wind,
  ArrowRight,
  Bot,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Badge, GlassCard } from "@/components/brand/glass";
import { Logo } from "@/components/brand/logo";
import { LanguageSelector } from "@/components/brand/language-selector";
import { ThemeToggle } from "@/components/brand/theme-toggle";
import { ChatPanel } from "@/components/chat/chat-panel";
import { useAppStore } from "@/lib/store";
import {
  STADIUM,
  CROWD_TIMELINE,
  QUEUE_TIMELINE,
  HOURLY_ATTENDANCE,
  LANG_USAGE,
  HEATMAP_GRID,
  LIVE_MATCHES,
  INCIDENTS,
  ACTIVITY,
  AI_SUGGESTIONS,
  TRANSPORT,
  SUSTAINABILITY,
  WEATHER,
} from "@/lib/data";
import type { Role } from "@/lib/types";
import { cn } from "@/lib/utils";

const ROLES: { id: Role; label: string }[] = [
  { id: "fan", label: "Fan" },
  { id: "staff", label: "Staff" },
  { id: "organizer", label: "Organizer" },
  { id: "volunteer", label: "Volunteer" },
  { id: "security", label: "Security" },
  { id: "transport", label: "Transport" },
];

const NAV = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "crowd", label: "Crowd", icon: Activity },
  { id: "transport", label: "Transport", icon: Bus },
  { id: "matches", label: "Matches", icon: CalendarDays },
  { id: "incidents", label: "Incidents", icon: Siren },
  { id: "insights", label: "AI Insights", icon: Sparkles },
  { id: "sustain", label: "Sustainability", icon: Leaf },
] as const;

type Section = (typeof NAV)[number]["id"];

export function DashboardView() {
  const setView = useAppStore((s) => s.setView);
  const role = useAppStore((s) => s.role);
  const setRole = useAppStore((s) => s.setRole);
  const setEmergencyOpen = useAppStore((s) => s.setEmergencyOpen);
  const [section, setSection] = React.useState<Section>("overview");

  return (
    <div className="flex min-h-screen flex-col bg-brand-gradient-soft">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-grass opacity-25" />
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-border/60 glass-nav">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-2 px-3 py-2.5">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => setView("landing")} className="gap-1.5 rounded-xl">
              <Home className="size-4" /> <span className="hidden sm:inline">Landing</span>
            </Button>
            <div className="hidden h-5 w-px bg-border sm:block" />
            <Logo size={28} />
            <Badge variant="cyan" className="hidden sm:inline-flex">Command Center</Badge>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="hidden items-center gap-1 rounded-xl glass p-0.5 md:flex">
              {ROLES.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setRole(r.id)}
                  className={cn(
                    "rounded-lg px-2.5 py-1 text-xs font-medium transition",
                    role === r.id ? "bg-brand-gradient text-white shadow-glow" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {r.label}
                </button>
              ))}
            </div>
            <LanguageSelector compact />
            <ThemeToggle />
            <Button
              size="sm"
              onClick={() => setEmergencyOpen(true)}
              className="gap-1.5 rounded-xl bg-red-500/90 text-white hover:bg-red-500"
            >
              <Siren className="size-4" /> <span className="hidden sm:inline">SOS</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-[1600px] flex-1">
        {/* Sidebar */}
        <aside className="sticky top-[57px] hidden h-[calc(100vh-57px)] w-56 shrink-0 flex-col border-r border-border/60 p-3 lg:flex">
          <nav className="flex flex-col gap-1">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => setSection(n.id)}
                className={cn(
                  "flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium transition",
                  section === n.id
                    ? "glass-strong text-foreground shadow-soft"
                    : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
                )}
              >
                <n.icon className={cn("size-4", section === n.id && "text-cyan")} />
                {n.label}
                {section === n.id && <ChevronRight className="ml-auto size-4" />}
              </button>
            ))}
          </nav>
          <div className="mt-auto rounded-2xl glass p-3">
            <div className="flex items-center gap-2 text-xs">
              <span className="size-2 rounded-full bg-emerald animate-pulse" />
              <span className="text-muted-foreground">Live · {STADIUM.name.split("·")[0]}</span>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2 text-center">
              <div className="rounded-lg glass p-1.5">
                <div className="font-display text-base font-bold text-gradient-cyan">{STADIUM.liveDensity}%</div>
                <div className="text-[9px] uppercase text-muted-foreground">Density</div>
              </div>
              <div className="rounded-lg glass p-1.5">
                <div className="font-display text-base font-bold text-gold">{STADIUM.avgQueueMin}m</div>
                <div className="text-[9px] uppercase text-muted-foreground">Queue</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile section tabs */}
        <div className="lg:hidden sticky top-[57px] z-30 flex gap-1 overflow-x-auto border-b border-border/60 bg-background/80 px-3 py-2 backdrop-blur">
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => setSection(n.id)}
              className={cn(
                "inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition",
                section === n.id ? "bg-brand-gradient text-white" : "glass text-muted-foreground"
              )}
            >
              <n.icon className="size-3.5" />
              {n.label}
            </button>
          ))}
        </div>

        {/* Main */}
        <main className="flex-1 overflow-x-hidden p-3 sm:p-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={section}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {section === "overview" && <Overview />}
              {section === "crowd" && <CrowdSection />}
              {section === "transport" && <TransportSection />}
              {section === "matches" && <MatchesSection />}
              {section === "incidents" && <IncidentsSection />}
              {section === "insights" && <InsightsSection />}
              {section === "sustain" && <SustainSection />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

/* ---------- Overview ---------- */
function Overview() {
  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.5fr_1fr]">
      <div className="flex flex-col gap-4">
        <KpiRow />
        <CrowdChart />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <HeatmapWidget />
          <WeatherWidget />
        </div>
        <TransportWidget />
      </div>
      <div className="flex flex-col gap-4">
        <div className="h-[520px] overflow-hidden rounded-2xl glass-strong shadow-float">
          <ChatPanel variant="full" title="AI Operations Co-pilot" />
        </div>
        <InsightsWidget />
        <ActivityWidget />
      </div>
    </div>
  );
}

function KpiRow() {
  const kpis = [
    { label: "Attendance", value: STADIUM.liveAttendance.toLocaleString(), sub: `of ${STADIUM.capacity.toLocaleString()}`, icon: Users, color: "text-cyan" },
    { label: "Density", value: `${STADIUM.liveDensity}%`, sub: "Concourse avg", icon: Activity, color: "text-gold" },
    { label: "Avg queue", value: `${STADIUM.avgQueueMin}m`, sub: "Food & bev", icon: Clock, color: "text-purple" },
    { label: "CO₂ saved", value: "3.2kg", sub: "per fan", icon: Leaf, color: "text-emerald" },
  ];
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {kpis.map((k) => (
        <GlassCard key={k.label} glow="soft" className="p-4">
          <div className="flex items-center justify-between">
            <k.icon className={`size-4 ${k.color}`} />
            <span className="size-1.5 rounded-full bg-emerald animate-pulse" />
          </div>
          <div className="mt-2 font-display text-2xl font-bold tabular-nums">{k.value}</div>
          <div className="text-xs text-muted-foreground">{k.label}</div>
          <div className="text-[10px] text-muted-foreground/70">{k.sub}</div>
        </GlassCard>
      ))}
    </div>
  );
}

function CrowdChart() {
  return (
    <GlassCard glow="float">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h3 className="font-display text-base font-bold">Crowd density prediction</h3>
          <p className="text-xs text-muted-foreground">Concourse · Gates · Food · 2-hour window</p>
        </div>
        <Badge variant="emerald">AI forecast</Badge>
      </div>
      <div className="h-[240px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={CROWD_TIMELINE} margin={{ top: 4, right: 4, bottom: 0, left: -24 }}>
            <defs>
              <linearGradient id="d-concourse" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563eb" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#2563eb" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="d-gates" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="d-food" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="currentColor" strokeOpacity={0.08} vertical={false} />
            <XAxis dataKey="t" tick={{ fontSize: 10 }} stroke="currentColor" strokeOpacity={0.3} tickLine={false} axisLine={false} />
            <YAxis tick={{ fontSize: 10 }} stroke="currentColor" strokeOpacity={0.3} tickLine={false} axisLine={false} domain={[0, 100]} />
            <Tooltip contentStyle={tooltipStyle} />
            <Area type="monotone" dataKey="concourse" stroke="#2563eb" strokeWidth={2} fill="url(#d-concourse)" />
            <Area type="monotone" dataKey="gates" stroke="#f59e0b" strokeWidth={2} fill="url(#d-gates)" />
            <Area type="monotone" dataKey="food" stroke="#10b981" strokeWidth={2} fill="url(#d-food)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
}

const tooltipStyle = {
  background: "color-mix(in oklab, var(--card) 90%, transparent)",
  border: "1px solid color-mix(in oklab, var(--foreground) 12%, transparent)",
  borderRadius: 12,
  fontSize: 12,
  backdropFilter: "blur(8px)",
} as const;

function HeatmapWidget() {
  const max = Math.max(...HEATMAP_GRID.flat());
  return (
    <GlassCard glow="cyan" className="h-full">
      <h3 className="font-display text-base font-bold">Density heatmap</h3>
      <p className="text-xs text-muted-foreground">9×7 zone grid · live</p>
      <div className="mt-3 grid gap-0.5" style={{ gridTemplateColumns: "repeat(9, 1fr)" }}>
        {HEATMAP_GRID.flat().map((v, i) => {
          const t = v / max;
          const color =
            t > 0.8 ? "#ef4444" : t > 0.6 ? "#f59e0b" : t > 0.4 ? "#22d3ee" : t > 0.2 ? "#3b82f6" : "#1e3a8a";
          return (
            <motion.div
              key={i}
              className="aspect-square rounded-[3px]"
              style={{ background: color, opacity: 0.3 + t * 0.7 }}
              animate={{ opacity: [0.3 + t * 0.7, 0.5 + t * 0.5, 0.3 + t * 0.7] }}
              transition={{ duration: 2 + (i % 5) * 0.3, repeat: Infinity, delay: (i % 9) * 0.1 }}
            />
          );
        })}
      </div>
      <div className="mt-3 flex items-center justify-between text-[10px] text-muted-foreground">
        <span>Low</span>
        <div className="h-1.5 flex-1 mx-2 rounded-full bg-gradient-to-r from-blue-900 via-cyan to-red-500" />
        <span>Critical</span>
      </div>
    </GlassCard>
  );
}

function WeatherWidget() {
  const w = WEATHER;
  return (
    <GlassCard glow="gold" className="h-full">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-base font-bold">Matchday weather</h3>
        <CloudSun className="size-5 text-gold" />
      </div>
      <div className="mt-3 flex items-end gap-3">
        <div className="font-display text-5xl font-bold text-gradient-gold">{w.temp}°</div>
        <div className="mb-1.5">
          <div className="text-sm font-semibold">{w.condition}</div>
          <div className="text-xs text-muted-foreground">Mexico City</div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 text-center">
        {[
          { l: "Humidity", v: `${w.humidity}%` },
          { l: "Wind", v: `${w.wind} km/h` },
          { l: "UV index", v: w.uv },
          { l: "Rain", v: `${w.rainChance}%` },
        ].map((s) => (
          <div key={s.l} className="rounded-lg glass p-2">
            <div className="text-sm font-bold">{s.v}</div>
            <div className="text-[10px] uppercase text-muted-foreground">{s.l}</div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

function TransportWidget() {
  return (
    <GlassCard glow="soft">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h3 className="font-display text-base font-bold">Transportation</h3>
          <p className="text-xs text-muted-foreground">Live options to the stadium</p>
        </div>
        <Bus className="size-4 text-cyan" />
      </div>
      <div className="space-y-2">
        {TRANSPORT.map((t) => (
          <div key={t.id} className="flex items-center gap-3 rounded-xl glass p-2.5">
            <div className="grid size-9 place-items-center rounded-lg bg-brand-gradient text-white">
              {t.mode === "metro" ? "🚇" : t.mode === "bus" ? "🚌" : t.mode === "walk" ? "🚶" : t.mode === "rideshare" ? "🚗" : "🅿️"}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="truncate text-sm font-medium">{t.label}</span>
                <span className="text-xs font-semibold text-cyan">{t.eta}</span>
              </div>
              <div className="mt-1 flex items-center gap-2">
                <div className="h-1 flex-1 overflow-hidden rounded-full bg-foreground/10">
                  <div className="h-full rounded-full bg-gradient-to-r from-cyan to-emerald" style={{ width: `${100 - t.load}%` }} />
                </div>
                <span className="text-[10px] text-muted-foreground">{t.cost} · 🌿 {t.green}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

function ActivityWidget() {
  return (
    <GlassCard glow="soft">
      <div className="mb-3 flex items-center gap-2">
        <Bell className="size-4 text-emerald" />
        <h3 className="font-display text-base font-bold">Activity timeline</h3>
      </div>
      <div className="relative max-h-[280px] overflow-y-auto pr-1">
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-cyan/40 via-purple/30 to-emerald/30" />
        <div className="space-y-3">
          {ACTIVITY.map((a) => (
            <div key={a.id} className="relative flex gap-3 pl-6">
              <span
                className={cn(
                  "absolute left-1 top-1.5 size-2.5 rounded-full ring-2 ring-background",
                  a.type === "alert" ? "bg-red-400" : a.type === "ai" ? "bg-cyan" : a.type === "staff" ? "bg-gold" : a.type === "system" ? "bg-purple" : "bg-emerald"
                )}
              />
              <div className="flex-1">
                <p className="text-sm font-medium leading-tight">{a.title}</p>
                <p className="text-xs text-muted-foreground">{a.detail}</p>
                <p className="mt-0.5 text-[10px] text-muted-foreground/70">{a.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}

/* ---------- AI Insights (live from LLM) ---------- */
function InsightsWidget() {
  const { data, isLoading } = useAiInsights();
  const lines = (data?.insights ?? "").split(/\n+/).filter(Boolean).slice(0, 3);
  return (
    <GlassCard glow="cyan">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="size-4 text-cyan" />
          <h3 className="font-display text-base font-bold">Live AI insights</h3>
        </div>
        <Badge variant="cyan">{data?.source === "ai" ? "LLM" : "cached"}</Badge>
      </div>
      {isLoading ? (
        <div className="space-y-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-12 animate-shimmer rounded-lg glass" />
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {lines.map((l, i) => (
            <div key={i} className="rounded-xl glass p-2.5 text-xs leading-relaxed">
              <span className="mr-1.5 font-bold text-cyan">{i + 1}·</span>
              {l}
            </div>
          ))}
        </div>
      )}
    </GlassCard>
  );
}

function useAiInsights() {
  const role = useAppStore((s) => s.role);
  const lang = useAppStore((s) => s.lang);
  return useQuery({
    queryKey: ["insights", role, lang],
    queryFn: async () => {
      const res = await fetch(`/api/insights?role=${role}&lang=${lang}`);
      if (!res.ok) throw new Error("failed");
      return (await res.json()) as { insights: string; source: "ai" | "fallback" };
    },
    refetchInterval: 60000,
    staleTime: 30000,
  });
}

/* ---------- Crowd section ---------- */
function CrowdSection() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <GlassCard glow="float">
        <h3 className="font-display text-base font-bold">Crowd density · zones</h3>
        <div className="mt-3 h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={CROWD_TIMELINE} margin={{ top: 4, right: 4, bottom: 0, left: -24 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" strokeOpacity={0.08} vertical={false} />
              <XAxis dataKey="t" tick={{ fontSize: 10 }} stroke="currentColor" strokeOpacity={0.3} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 10 }} stroke="currentColor" strokeOpacity={0.3} tickLine={false} axisLine={false} domain={[0, 100]} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="concourse" stroke="#2563eb" strokeWidth={2} fill="#2563eb22" />
              <Area type="monotone" dataKey="gates" stroke="#f59e0b" strokeWidth={2} fill="#f59e0b22" />
              <Area type="monotone" dataKey="food" stroke="#10b981" strokeWidth={2} fill="#10b98122" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
      <GlassCard glow="gold">
        <h3 className="font-display text-base font-bold">Queue wait times</h3>
        <div className="mt-3 h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={QUEUE_TIMELINE} margin={{ top: 4, right: 4, bottom: 0, left: -24 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" strokeOpacity={0.08} vertical={false} />
              <XAxis dataKey="t" tick={{ fontSize: 10 }} stroke="currentColor" strokeOpacity={0.3} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 10 }} stroke="currentColor" strokeOpacity={0.3} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="food" stroke="#f59e0b" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="restroom" stroke="#0891b2" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="entry" stroke="#a855f7" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
      <GlassCard glow="cyan" className="lg:col-span-2">
        <h3 className="font-display text-base font-bold">Hourly attendance forecast</h3>
        <div className="mt-3 h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={HOURLY_ATTENDANCE} margin={{ top: 4, right: 4, bottom: 0, left: -24 }}>
              <defs>
                <linearGradient id="att" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0891b2" />
                  <stop offset="100%" stopColor="#6d28d9" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" strokeOpacity={0.08} vertical={false} />
              <XAxis dataKey="h" tick={{ fontSize: 9 }} stroke="currentColor" strokeOpacity={0.3} tickLine={false} axisLine={false} interval={2} />
              <YAxis tick={{ fontSize: 10 }} stroke="currentColor" strokeOpacity={0.3} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "currentColor", fillOpacity: 0.04 }} />
              <Bar dataKey="fans" fill="url(#att)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
    </div>
  );
}

/* ---------- Transport section ---------- */
function TransportSection() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <TransportWidget />
      <GlassCard glow="emerald">
        <h3 className="font-display text-base font-bold">Greenest routes</h3>
        <p className="text-xs text-muted-foreground">Recommended by Sustainability AI</p>
        <div className="mt-3 space-y-2">
          {TRANSPORT.sort((a, b) => b.green - a.green).slice(0, 4).map((t) => (
            <div key={t.id} className="flex items-center gap-3 rounded-xl glass p-3">
              <div className="grid size-10 place-items-center rounded-full bg-emerald/15 text-emerald">
                <Leaf className="size-5" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold">{t.label}</div>
                <div className="text-xs text-muted-foreground">{t.eta} · {t.cost}</div>
              </div>
              <div className="text-right">
                <div className="font-display text-lg font-bold text-emerald">{t.green}%</div>
                <div className="text-[10px] uppercase text-muted-foreground">green</div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}

/* ---------- Matches section ---------- */
function MatchesSection() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {LIVE_MATCHES.map((m) => (
        <GlassCard key={m.id} glow={m.status === "live" ? "gold" : "soft"} hover>
          <div className="flex items-center justify-between">
            <Badge variant={m.status === "live" ? "danger" : "default"}>
              {m.status === "live" && <span className="size-1.5 rounded-full bg-red-500 animate-pulse" />}
              {m.stage}
            </Badge>
            <span className="text-xs text-muted-foreground">{m.city}</span>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex flex-col items-center gap-1 flex-1">
              <span className="text-3xl">{m.homeFlag}</span>
              <span className="text-sm font-semibold">{m.home}</span>
            </div>
            <div className="px-3 text-center">
              {m.score ? (
                <div className="font-display text-2xl font-bold tabular-nums">{m.score}</div>
              ) : (
                <div className="font-display text-lg font-bold text-muted-foreground">VS</div>
              )}
              <div className="text-[10px] uppercase text-muted-foreground">{m.kickoff}</div>
            </div>
            <div className="flex flex-col items-center gap-1 flex-1">
              <span className="text-3xl">{m.awayFlag}</span>
              <span className="text-sm font-semibold">{m.away}</span>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
            <span>🏟️ {m.venue}</span>
            <Button variant="ghost" size="sm" className="h-7 gap-1 rounded-lg text-xs">
              Navigate <ArrowRight className="size-3" />
            </Button>
          </div>
        </GlassCard>
      ))}
    </div>
  );
}

/* ---------- Incidents section ---------- */
function IncidentsSection() {
  const setEmergencyOpen = useAppStore((s) => s.setEmergencyOpen);
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <GlassCard glow="soft">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-display text-base font-bold">Active incidents</h3>
          <Button size="sm" className="gap-1.5 rounded-xl bg-red-500/90 text-white" onClick={() => setEmergencyOpen(true)}>
            <Siren className="size-3.5" /> New SOS
          </Button>
        </div>
        <div className="space-y-2">
          {INCIDENTS.map((i) => (
            <div key={i.id} className="flex items-center gap-3 rounded-xl glass p-3">
              <span
                className={cn(
                  "size-2.5 rounded-full",
                  i.severity === "critical" ? "bg-red-500 animate-pulse" : i.severity === "high" ? "bg-red-400" : i.severity === "medium" ? "bg-gold" : "bg-cyan"
                )}
              />
              <div className="flex-1">
                <div className="text-sm font-semibold">{i.title}</div>
                <div className="text-xs text-muted-foreground">{i.zone}</div>
              </div>
              <div className="text-right">
                <Badge variant={i.status === "active" ? "danger" : i.status === "monitoring" ? "gold" : "emerald"}>
                  {i.status}
                </Badge>
                <div className="mt-1 text-[10px] text-muted-foreground">{i.time}</div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
      <GlassCard glow="cyan">
        <h3 className="font-display text-base font-bold">AI-recommended actions</h3>
        <div className="mt-3 space-y-2">
          {AI_SUGGESTIONS.map((s) => (
            <div key={s.id} className="rounded-xl glass p-3">
              <div className="flex items-center justify-between">
                <Badge variant={s.priority === "critical" ? "danger" : s.priority === "warning" ? "gold" : "cyan"}>
                  {s.priority}
                </Badge>
                <span className="text-[10px] text-muted-foreground">{Math.round(s.confidence * 100)}% confidence</span>
              </div>
              <p className="mt-1.5 text-sm font-semibold">{s.title}</p>
              <p className="text-xs text-muted-foreground">{s.detail}</p>
              <div className="mt-2 flex items-center gap-2">
                <Button size="sm" className="h-7 gap-1 rounded-lg bg-brand-gradient text-white text-xs">
                  <Sparkles className="size-3" /> {s.action}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}

/* ---------- Insights section ---------- */
function InsightsSection() {
  const { data, isLoading } = useAiInsights();
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.3fr_1fr]">
      <GlassCard glow="cyan">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="size-5 text-cyan" />
            <h3 className="font-display text-base font-bold">Live operational recommendations</h3>
          </div>
          <Badge variant="cyan">{data?.source === "ai" ? "Streaming LLM" : "cached"}</Badge>
        </div>
        {isLoading ? (
          <div className="space-y-3">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-16 animate-shimmer rounded-xl glass" />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {(data?.insights ?? "").split(/\n+/).filter(Boolean).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="rounded-xl glass p-3"
              >
                <div className="flex items-start gap-2">
                  <span className="grid size-6 shrink-0 place-items-center rounded-lg bg-brand-gradient text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <p className="text-sm leading-relaxed">{line}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </GlassCard>
      <div className="flex flex-col gap-4">
        <GlassCard glow="purple">
          <h3 className="font-display text-base font-bold">Multilingual load</h3>
          <div className="mt-2 h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={LANG_USAGE} dataKey="value" nameKey="lang" innerRadius={40} outerRadius={70} paddingAngle={2}>
                  {LANG_USAGE.map((d) => (
                    <Cell key={d.lang} fill={d.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
        <ActivityWidget />
      </div>
    </div>
  );
}

/* ---------- Sustainability section ---------- */
function SustainSection() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {SUSTAINABILITY.map((m) => (
        <GlassCard key={m.label} glow="soft" className="p-4">
          <div className="text-xs text-muted-foreground">{m.label}</div>
          <div className="font-display text-2xl font-bold">
            {m.value}
            <span className="text-sm text-muted-foreground">{m.unit}</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-foreground/10">
            <div className="h-full rounded-full bg-gradient-to-r from-cyan to-emerald" style={{ width: `${Math.min(100, (m.value / m.target) * 100)}%` }} />
          </div>
          <div className="mt-1 text-[10px] text-muted-foreground">Target {m.target}{m.unit}</div>
        </GlassCard>
      ))}
      <GlassCard glow="emerald" className="col-span-2 sm:col-span-4">
        <h3 className="font-display text-base font-bold">6-match CO₂ savings trend</h3>
        <div className="mt-3 h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={SUSTAINABILITY[3].trend.map((v, i) => ({ m: `M${i + 1}`, kg: v }))} margin={{ top: 4, right: 4, bottom: 0, left: -24 }}>
              <defs>
                <linearGradient id="sco2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" strokeOpacity={0.08} vertical={false} />
              <XAxis dataKey="m" tick={{ fontSize: 10 }} stroke="currentColor" strokeOpacity={0.3} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 10 }} stroke="currentColor" strokeOpacity={0.3} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "currentColor", fillOpacity: 0.04 }} />
              <Bar dataKey="kg" fill="url(#sco2)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
    </div>
  );
}
