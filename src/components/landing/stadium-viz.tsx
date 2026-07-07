"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";

/**
 * Interactive stadium visualization — animated top-down bowl with
 * pulsing crowd hotspots, a moving "AI" sweep, and live density legend.
 */
export function StadiumViz() {
  const setChatOpen = useAppStore((s) => s.setChatOpen);

  const hotspots = [
    { x: 50, y: 30, r: 16, density: 88, label: "Gate B · 88%" },
    { x: 28, y: 48, r: 13, density: 72, label: "Food Hall · 72%" },
    { x: 72, y: 56, r: 11, density: 61, label: "Pub · 61%" },
    { x: 50, y: 68, r: 14, density: 70, label: "Sec 214 · 70%" },
    { x: 50, y: 50, r: 8, density: 18, label: "First Aid · 18%" },
  ];

  return (
    <div className="relative aspect-square w-full max-w-md mx-auto">
      {/* Floating glow rings */}
      <div className="absolute inset-0 rounded-full bg-brand-gradient opacity-20 blur-3xl animate-pulse" />

      <motion.div
        className="absolute inset-2 rounded-[2.5rem] glass-strong shadow-float"
        animate={{ rotate: [0, 0.4, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 400 400" className="size-full" aria-label="Stadium visualization">
          <defs>
            <radialGradient id="pitch" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.55" />
              <stop offset="60%" stopColor="#059669" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#064e3b" stopOpacity="0.6" />
            </radialGradient>
            <linearGradient id="stand" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#2563eb" />
              <stop offset="50%" stopColor="#6d28d9" />
              <stop offset="100%" stopColor="#0891b2" />
            </linearGradient>
            <radialGradient id="sweep" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Outer stadium ring (stands) */}
          <motion.circle
            cx="200"
            cy="200"
            r="170"
            fill="none"
            stroke="url(#stand)"
            strokeWidth="46"
            opacity="0.85"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          />
          {/* Tier lines */}
          {[150, 168].map((r, i) => (
            <circle key={r} cx="200" cy="200" r={r} fill="none" stroke="white" strokeOpacity={0.12} strokeWidth="1" strokeDasharray={i ? "2 4" : "0"} />
          ))}

          {/* Inner pitch */}
          <circle cx="200" cy="200" r="120" fill="url(#pitch)" />
          <circle cx="200" cy="200" r="120" fill="none" stroke="#10b981" strokeOpacity="0.5" strokeWidth="1.5" />
          {/* Pitch markings */}
          <line x1="200" y1="92" x2="200" y2="308" stroke="white" strokeOpacity="0.35" strokeWidth="1" />
          <circle cx="200" cy="200" r="34" fill="none" stroke="white" strokeOpacity="0.3" strokeWidth="1" />
          <circle cx="200" cy="200" r="3" fill="white" fillOpacity="0.5" />

          {/* Rotating AI sweep */}
          <g>
            <motion.g
              style={{ transformOrigin: "200px 200px" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            >
              <path d="M200 200 L200 30 A170 170 0 0 1 360 170 Z" fill="url(#sweep)" />
            </motion.g>
          </g>

          {/* Crowd hotspots */}
          {hotspots.map((h, i) => {
            const cx = (h.x / 100) * 400;
            const cy = (h.y / 100) * 400;
            const r = (h.r / 100) * 400;
            const color =
              h.density > 80 ? "#ef4444" : h.density > 60 ? "#f59e0b" : h.density > 30 ? "#22d3ee" : "#10b981";
            return (
              <g key={i}>
                <motion.circle
                  cx={cx}
                  cy={cy}
                  r={r}
                  fill={color}
                  fillOpacity={0.18}
                  stroke={color}
                  strokeOpacity={0.5}
                  strokeWidth="1"
                  animate={{ r: [r, r * 1.12, r], opacity: [0.6, 0.9, 0.6] }}
                  transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.3 }}
                />
                <circle cx={cx} cy={cy} r={3} fill={color} />
              </g>
            );
          })}

          {/* Center pulse */}
          <motion.circle
            cx="200"
            cy="200"
            r="6"
            fill="#fbbf24"
            animate={{ scale: [1, 1.6, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.circle
            cx="200"
            cy="200"
            r="12"
            fill="none"
            stroke="#fbbf24"
            strokeWidth="1.5"
            animate={{ scale: [1, 3], opacity: [0.7, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </svg>

        {/* Floating label chips */}
        <div className="pointer-events-none absolute inset-0">
          <FloatingChip className="left-[8%] top-[14%]" tone="danger" label="Gate B" value="88%" delay={0.4} />
          <FloatingChip className="right-[6%] top-[28%]" tone="gold" label="Food queue" value="9 min" delay={0.6} />
          <FloatingChip className="left-[10%] bottom-[16%]" tone="cyan" label="AI reroute" value="+1,240" delay={0.8} />
          <FloatingChip className="right-[8%] bottom-[12%]" tone="emerald" label="CO₂ saved" value="3.2kg" delay={1} />
        </div>
      </motion.div>

      {/* Legend */}
      <button
        onClick={() => setChatOpen(true)}
        className="absolute -bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full glass-strong px-4 py-2 text-xs font-semibold shadow-float transition hover:scale-105"
      >
        <span className="size-2 rounded-full bg-gold animate-pulse" />
        Live crowd intelligence · tap to ask AI
      </button>
    </div>
  );
}

function FloatingChip({
  className,
  label,
  value,
  tone,
  delay = 0,
}: {
  className: string;
  label: string;
  value: string;
  tone: "danger" | "gold" | "cyan" | "emerald";
  delay?: number;
}) {
  const tones: Record<string, string> = {
    danger: "text-red-400",
    gold: "text-gold",
    cyan: "text-cyan",
    emerald: "text-emerald",
  };
  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{ opacity: 0, scale: 0.6, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, type: "spring", stiffness: 140, damping: 12 }}
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
        className="glass-strong rounded-xl px-2.5 py-1.5 shadow-soft"
      >
        <div className="text-[9px] uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className={`text-sm font-bold tabular-nums ${tones[tone]}`}>{value}</div>
      </motion.div>
    </motion.div>
  );
}
