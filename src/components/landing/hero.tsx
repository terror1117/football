"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Play, Radio, Users, Globe, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedCounter, Reveal } from "@/components/brand/animated-counter";
import { GradientBlob } from "@/components/brand/glass";
import { WORLD_CUP_KICKOFF, BRAND } from "@/lib/constants";
import { useAppStore } from "@/lib/store";
import { StadiumViz } from "./stadium-viz";

function useCountdown(target: string) {
  const [now, setNow] = React.useState(() => Date.now());
  React.useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, new Date(target).getTime() - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);
  return { days, hours, mins, secs };
}

const STATS = [
  { label: "Fans served / match", value: 87000, suffix: "+", icon: Users, color: "text-cyan" },
  { label: "Smart venues", value: 16, icon: Radio, color: "text-emerald" },
  { label: "Languages", value: 9, icon: Globe, color: "text-purple" },
  { label: "Avg AI response", value: 1.4, decimals: 1, suffix: "s", icon: Zap, color: "text-gold" },
];

export function Hero() {
  const { days, hours, mins, secs } = useCountdown(WORLD_CUP_KICKOFF);
  const setView = useAppStore((s) => s.setView);
  const setChatOpen = useAppStore((s) => s.setChatOpen);

  const timeUnits = [
    { v: days, l: "Days" },
    { v: hours, l: "Hrs" },
    { v: mins, l: "Min" },
    { v: secs, l: "Sec" },
  ];

  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
      {/* Football stadium-at-night background */}
      <div className="absolute inset-0 -z-10 bg-brand-gradient-soft" />
      <div className="absolute inset-0 -z-10 bg-grass opacity-50" />
      <div className="absolute inset-0 -z-10 bg-floodlights" />

      {/* Center-circle motif — a faint pitch marking behind the hero */}
      <svg
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[min(90vw,60rem)] -translate-x-1/2 -translate-y-1/2 opacity-[0.07]"
        viewBox="0 0 200 200"
        fill="none"
        aria-hidden
      >
        <circle cx="100" cy="100" r="92" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="100" cy="100" r="34" stroke="currentColor" strokeWidth="1.5" />
        <line x1="100" y1="8" x2="100" y2="192" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="100" cy="100" r="2.5" fill="currentColor" />
        <rect x="4" y="60" width="26" height="80" stroke="currentColor" strokeWidth="1.5" />
        <rect x="170" y="60" width="26" height="80" stroke="currentColor" strokeWidth="1.5" />
      </svg>

      <GradientBlob className="-left-20 top-10 size-[28rem] bg-emerald/25" />
      <GradientBlob className="right-0 top-0 size-[26rem] bg-gold/20" />
      <GradientBlob className="left-1/3 bottom-0 size-[24rem] bg-cyan/20" />

      {/* Floating footballs drifting across the hero */}
      {[
        { left: "8%", top: "22%", s: 22, d: 0 },
        { left: "82%", top: "30%", s: 18, d: 0.6 },
        { left: "16%", top: "70%", s: 14, d: 1.2 },
        { left: "88%", top: "72%", s: 20, d: 0.3 },
      ].map((b, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute z-0"
          style={{ left: b.left, top: b.top }}
          animate={{ y: [0, -16, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut", delay: b.d }}
        >
          <Football size={b.s} />
        </motion.div>
      ))}

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Left — copy + CTAs + countdown */}
        <div className="flex flex-col items-start gap-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs font-semibold"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald" />
            </span>
            <span className="text-muted-foreground">{BRAND.edition}</span>
            <span className="text-foreground">· Kickoff in progress</span>
          </motion.div>

          <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
            <AnimatedLine delay={0.05}>Every fan.</AnimatedLine>
            <AnimatedLine delay={0.15} className="text-gradient-brand">
              Every moment.
            </AnimatedLine>
            <AnimatedLine delay={0.25}>
              One <span className="relative whitespace-nowrap">
                intelligent
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 12"
                  fill="none"
                  aria-hidden
                >
                  <motion.path
                    d="M2 8 Q 100 -2 198 8"
                    stroke="url(#underline)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  />
                  <defs>
                    <linearGradient id="underline" x1="0" y1="0" x2="200" y2="0">
                      <stop stopColor="#ffd400" />
                      <stop offset="1" stopColor="#009c3b" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>{" "}
              stadium.
            </AnimatedLine>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="max-w-xl text-base text-muted-foreground sm:text-lg leading-relaxed"
          >
            {BRAND.name} is the generative-AI nervous system for the world's biggest tournament —
            navigation, crowd intelligence, accessibility, sustainability and emergency response,
            in {`${9}`} languages. Built for fans, staff and organizers alike.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex flex-wrap items-center gap-3"
          >
            <Button
              size="lg"
              onClick={() => setView("dashboard")}
              className="group h-12 gap-2 rounded-2xl bg-brand-gradient px-6 text-base text-white shadow-glow hover:opacity-95"
            >
              <Sparkles className="size-4" />
              Launch Dashboard
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setChatOpen(true)}
              className="h-12 gap-2 rounded-2xl glass px-6 text-base hover:bg-foreground/5"
            >
              <Play className="size-4 text-cyan" />
              Try the Assistant
            </Button>
          </motion.div>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="w-full"
          >
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Opening kickoff · Mexico City
            </p>
            <div className="grid grid-cols-4 gap-2 sm:max-w-md">
              {timeUnits.map((u) => (
                <div
                  key={u.l}
                  className="glass rounded-2xl px-2 py-3 text-center"
                >
                  <div className="font-display text-2xl font-bold tabular-nums text-gradient-cyan sm:text-3xl">
                    {String(u.v).padStart(2, "0")}
                  </div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {u.l}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right — stadium visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <StadiumViz />
        </motion.div>
      </div>

      {/* Live stats strip */}
      <Reveal className="mx-auto mt-16 max-w-6xl px-4" delay={0.2}>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="glass group relative overflow-hidden rounded-2xl p-4 sm:p-5"
            >
              <div className="mb-1 flex items-center justify-between">
                <s.icon className={`size-4 ${s.color}`} />
                <span className="size-1.5 rounded-full bg-emerald animate-pulse" />
              </div>
              <div className="font-display text-2xl font-bold sm:text-3xl">
                <AnimatedCounter value={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} />
              </div>
              <div className="mt-0.5 text-xs text-muted-foreground sm:text-sm">{s.label}</div>
              <div className="pointer-events-none absolute -right-6 -top-6 size-20 rounded-full bg-gradient-to-br from-cyan/20 to-transparent opacity-0 blur-2xl transition group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function AnimatedLine({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        className={`block ${className}`}
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/** Small football icon used as a floating decorative element. */
function Football({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="11" fill="#ffffff" stroke="#0b1220" strokeWidth="1" />
      <path
        d="M12 5.5 L15.5 8 L14.2 12 L9.8 12 L8.5 8 Z"
        fill="#0b1220"
      />
      <path d="M12 5.5 L12 2.5 M15.5 8 L18.5 7 M14.2 12 L17 14 M9.8 12 L7 14 M8.5 8 L5.5 7" stroke="#0b1220" strokeWidth="0.8" />
    </svg>
  );
}
