"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Leaf, Zap, Droplets, Recycle, Wind, TrendingDown } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { SectionHeading, Reveal, GlassCard, Badge } from "@/components/brand/glass";
import { AnimatedCounter } from "@/components/brand/animated-counter";
import { SUSTAINABILITY } from "@/lib/data";

const METRIC_ICON: Record<string, React.ElementType> = {
  "Renewable energy": Zap,
  "Water reused": Droplets,
  "Waste diverted": Recycle,
  "CO₂ saved / fan": Wind,
};

const METRIC_COLOR: Record<string, string> = {
  "Renewable energy": "#10b981",
  "Water reused": "#0891b2",
  "Waste diverted": "#f59e0b",
  "CO₂ saved / fan": "#a855f7",
};

export function Sustainability() {
  return (
    <section id="sustainability" className="relative py-20 sm:py-28">
      <div className="absolute inset-0 -z-10 bg-grass opacity-25" />
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <SectionHeading
            eyebrow="Sustainability AI"
            title={
              <>
                The greenest World Cup,{" "}
                <span className="text-gradient-cyan">measured in real time</span>
              </>
            }
            subtitle="ArenaMind AI tracks energy, water, waste and carbon across every venue — then recommends green routes and operational changes that save tonnes of CO₂ per match."
          />
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {SUSTAINABILITY.map((m, i) => {
            const Icon = METRIC_ICON[m.label] ?? Leaf;
            const color = METRIC_COLOR[m.label] ?? "#10b981";
            return (
              <Reveal key={m.label} delay={i * 0.05}>
                <GlassCard glow="soft" hover className="h-full">
                  <div className="flex items-center justify-between">
                    <Icon className="size-5" style={{ color }} />
                    <Badge variant="emerald">{Math.round((m.value / m.target) * 100)}%</Badge>
                  </div>
                  <div className="mt-3 font-display text-2xl font-bold sm:text-3xl">
                    <AnimatedCounter value={m.value} decimals={m.unit === "kg" ? 1 : 0} suffix={m.unit} />
                  </div>
                  <div className="text-xs text-muted-foreground">{m.label}</div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-foreground/10">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${Math.min(100, (m.value / m.target) * 100)}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                  <p className="mt-1.5 text-[10px] text-muted-foreground">Target {m.target}{m.unit}</p>
                </GlassCard>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1}>
          <GlassCard glow="float" className="mt-4">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h3 className="font-display text-base font-bold">CO₂ saved per fan · trend</h3>
                <p className="text-xs text-muted-foreground">Last 6 matches</p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full glass px-2.5 py-1 text-[11px] font-semibold text-emerald">
                <TrendingDown className="size-3.5" /> −34% vs baseline
              </span>
            </div>
            <div className="h-[220px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={SUSTAINABILITY[3].trend.map((v, i) => ({ match: `M${i + 1}`, kg: v }))} margin={{ top: 4, right: 4, bottom: 0, left: -24 }}>
                  <defs>
                    <linearGradient id="co2bar" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="currentColor" strokeOpacity={0.08} vertical={false} />
                  <XAxis dataKey="match" tick={{ fontSize: 10 }} stroke="currentColor" strokeOpacity={0.3} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 10 }} stroke="currentColor" strokeOpacity={0.3} tickLine={false} axisLine={false} />
                  <Tooltip
                    cursor={{ fill: "currentColor", fillOpacity: 0.04 }}
                    contentStyle={{
                      background: "color-mix(in oklab, var(--card) 90%, transparent)",
                      border: "1px solid color-mix(in oklab, var(--foreground) 12%, transparent)",
                      borderRadius: 12,
                      fontSize: 12,
                    }}
                  />
                  <Bar dataKey="kg" fill="url(#co2bar)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}
