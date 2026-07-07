"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { ArrowRight, Activity, Users, Leaf, ShieldAlert, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading, Reveal, GlassCard } from "@/components/brand/glass";
import { AnimatedCounter } from "@/components/brand/animated-counter";
import { CROWD_TIMELINE, LANG_USAGE, AI_SUGGESTIONS, ACTIVITY } from "@/lib/data";
import { useAppStore } from "@/lib/store";

export function DashboardPreview() {
  const setView = useAppStore((s) => s.setView);

  const kpis = [
    { label: "Live attendance", value: 79432, suffix: "", icon: Users, color: "text-cyan" },
    { label: "Crowd density", value: 71, suffix: "%", icon: Activity, color: "text-gold" },
    { label: "CO₂ saved / fan", value: 3.2, decimals: 1, suffix: "kg", icon: Leaf, color: "text-emerald" },
    { label: "Active incidents", value: 2, icon: ShieldAlert, color: "text-red-400" },
  ];

  return (
    <section id="dashboard" className="relative py-20 sm:py-28">
      <div className="absolute inset-0 -z-10 bg-brand-gradient-soft opacity-50" />
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <SectionHeading
            eyebrow="Live operations dashboard"
            title={
              <>
                One pane of glass for the{" "}
                <span className="text-gradient-cyan">entire matchday</span>
              </>
            }
            subtitle="Real-time analytics, AI insights, crowd prediction, weather, transportation, match schedule and emergency alerts — synchronized across every stadium and team."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {kpis.map((k) => (
              <GlassCard key={k.label} glow="soft" hover className="p-4">
                <k.icon className={`mb-2 size-4 ${k.color}`} />
                <div className="font-display text-2xl font-bold sm:text-3xl">
                  <AnimatedCounter value={k.value} suffix={k.suffix} decimals={k.decimals ?? 0} />
                </div>
                <div className="text-xs text-muted-foreground">{k.label}</div>
              </GlassCard>
            ))}
          </div>
        </Reveal>

        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* Crowd timeline */}
          <Reveal delay={0.15} className="lg:col-span-2">
            <GlassCard glow="float" className="h-full">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <h3 className="font-display text-base font-bold">Crowd density · last 2 hours</h3>
                  <p className="text-xs text-muted-foreground">Concourse · Gates · Food zones</p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full glass px-2.5 py-1 text-[11px] font-semibold text-emerald">
                  <span className="size-1.5 rounded-full bg-emerald animate-pulse" /> Live
                </span>
              </div>
              <div className="h-[240px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={CROWD_TIMELINE} margin={{ top: 4, right: 4, bottom: 0, left: -24 }}>
                    <defs>
                      <linearGradient id="g-concourse" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2563eb" stopOpacity={0.5} />
                        <stop offset="100%" stopColor="#2563eb" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="g-gates" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.5} />
                        <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="g-food" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity={0.5} />
                        <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="currentColor" strokeOpacity={0.08} vertical={false} />
                    <XAxis dataKey="t" tick={{ fontSize: 10 }} stroke="currentColor" strokeOpacity={0.3} tickLine={false} axisLine={false} />
                    <YAxis tick={{ fontSize: 10 }} stroke="currentColor" strokeOpacity={0.3} tickLine={false} axisLine={false} domain={[0, 100]} />
                    <Tooltip
                      contentStyle={{
                        background: "color-mix(in oklab, var(--card) 90%, transparent)",
                        border: "1px solid color-mix(in oklab, var(--foreground) 12%, transparent)",
                        borderRadius: 12,
                        fontSize: 12,
                        backdropFilter: "blur(8px)",
                      }}
                    />
                    <Area type="monotone" dataKey="concourse" stroke="#2563eb" strokeWidth={2} fill="url(#g-concourse)" />
                    <Area type="monotone" dataKey="gates" stroke="#f59e0b" strokeWidth={2} fill="url(#g-gates)" />
                    <Area type="monotone" dataKey="food" stroke="#10b981" strokeWidth={2} fill="url(#g-food)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>
          </Reveal>

          {/* Language usage */}
          <Reveal delay={0.2}>
            <GlassCard glow="purple" className="h-full">
              <h3 className="font-display text-base font-bold">Multilingual usage</h3>
              <p className="text-xs text-muted-foreground">AI replies by language</p>
              <div className="relative mt-2 h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={LANG_USAGE} dataKey="value" nameKey="lang" innerRadius={50} outerRadius={78} paddingAngle={2} strokeWidth={0}>
                      {LANG_USAGE.map((d) => (
                        <Cell key={d.lang} fill={d.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: "color-mix(in oklab, var(--card) 90%, transparent)",
                        border: "1px solid color-mix(in oklab, var(--foreground) 12%, transparent)",
                        borderRadius: 12,
                        fontSize: 12,
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="pointer-events-none absolute inset-0 grid place-items-center">
                  <div className="text-center">
                    <div className="font-display text-2xl font-bold text-gradient-cyan">9</div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">languages</div>
                  </div>
                </div>
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                {LANG_USAGE.map((l) => (
                  <span key={l.lang} className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
                    <span className="size-2 rounded-full" style={{ background: l.color }} />
                    {l.lang}
                  </span>
                ))}
              </div>
            </GlassCard>
          </Reveal>
        </div>

        {/* AI suggestions + activity */}
        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Reveal delay={0.15}>
            <GlassCard glow="cyan" className="h-full">
              <div className="mb-3 flex items-center gap-2">
                <TrendingUp className="size-4 text-cyan" />
                <h3 className="font-display text-base font-bold">Live AI recommendations</h3>
              </div>
              <div className="space-y-2">
                {AI_SUGGESTIONS.map((s) => (
                  <div key={s.id} className="rounded-xl glass p-3">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${
                          s.priority === "critical"
                            ? "bg-red-500/15 text-red-400"
                            : s.priority === "warning"
                            ? "bg-gold/15 text-gold"
                            : "bg-cyan/15 text-cyan"
                        }`}
                      >
                        {s.priority}
                      </span>
                      <span className="text-[10px] text-muted-foreground">{Math.round(s.confidence * 100)}% confidence</span>
                    </div>
                    <p className="mt-1.5 text-sm font-semibold">{s.title}</p>
                    <p className="text-xs text-muted-foreground">{s.detail}</p>
                    <p className="mt-1 text-[11px] font-medium text-emerald">→ {s.action}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.2}>
            <GlassCard glow="soft" className="h-full">
              <div className="mb-3 flex items-center gap-2">
                <Activity className="size-4 text-emerald" />
                <h3 className="font-display text-base font-bold">Activity timeline</h3>
              </div>
              <div className="relative max-h-[300px] overflow-y-auto pr-1">
                <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-cyan/40 via-purple/30 to-emerald/30" />
                <div className="space-y-3">
                  {ACTIVITY.map((a) => (
                    <div key={a.id} className="relative flex gap-3 pl-6">
                      <span
                        className={`absolute left-1 top-1.5 size-2.5 rounded-full ring-2 ring-background ${
                          a.type === "alert"
                            ? "bg-red-400"
                            : a.type === "ai"
                            ? "bg-cyan"
                            : a.type === "staff"
                            ? "bg-gold"
                            : a.type === "system"
                            ? "bg-purple"
                            : "bg-emerald"
                        }`}
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
          </Reveal>
        </div>

        <Reveal className="mt-8 flex justify-center">
          <Button
            size="lg"
            onClick={() => setView("dashboard")}
            className="group h-12 gap-2 rounded-2xl bg-brand-gradient px-6 text-base text-white shadow-glow"
          >
            Open full dashboard
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
