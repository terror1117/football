"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DoorOpen,
  UtensilsCrossed,
  Bath,
  LogOut,
  Cross,
  Car,
  Armchair,
  ShoppingBag,
  Route,
  Flame,
  ZoomIn,
  ZoomOut,
  Locate,
  Navigation2,
} from "lucide-react";
import { SectionHeading, Reveal, Badge } from "@/components/brand/glass";
import { Button } from "@/components/ui/button";
import { STADIUM_POIS } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";
import type { StadiumPOI } from "@/lib/types";
import { cn } from "@/lib/utils";

const TYPE_META: Record<
  StadiumPOI["type"],
  { label: string; icon: React.ElementType; color: string }
> = {
  gate: { label: "Gates", icon: DoorOpen, color: "#2563eb" },
  food: { label: "Food", icon: UtensilsCrossed, color: "#f59e0b" },
  restroom: { label: "Restrooms", icon: Bath, color: "#0891b2" },
  exit: { label: "Exits", icon: LogOut, color: "#ef4444" },
  firstaid: { label: "First Aid", icon: Cross, color: "#10b981" },
  parking: { label: "Parking", icon: Car, color: "#a855f7" },
  seat: { label: "Your Seat", icon: Armchair, color: "#fbbf24" },
  shop: { label: "Shop", icon: ShoppingBag, color: "#64748b" },
};

const FILTERS: StadiumPOI["type"][] = [
  "gate",
  "food",
  "restroom",
  "exit",
  "firstaid",
  "parking",
  "shop",
];

export function StadiumMap() {
  const [active, setActive] = React.useState<StadiumPOI["type"][]>(["gate", "food", "exit", "firstaid"]);
  const [showHeat, setShowHeat] = React.useState(true);
  const [selected, setSelected] = React.useState<StadiumPOI | null>(STADIUM_POIS.find((p) => p.id === "f-2") ?? null);
  const [route, setRoute] = React.useState<{ from: string; to: string; steps: string[]; minutes: number; meters: number } | null>(null);
  const [zoom, setZoom] = React.useState(1);
  const [loadingRoute, setLoadingRoute] = React.useState(false);
  const { toast } = useToast();

  const toggle = (t: StadiumPOI["type"]) =>
    setActive((a) => (a.includes(t) ? a.filter((x) => x !== t) : [...a, t]));

  const planRoute = async (to: StadiumPOI, accessible = false) => {
    setLoadingRoute(true);
    try {
      const res = await fetch("/api/navigation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ from: "s-1", to: to.id, accessible }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setRoute(data);
      toast({ title: `Route to ${to.name}`, description: `${data.minutes} min · ${data.meters} m` });
    } catch (e) {
      toast({ title: "Route failed", variant: "destructive" });
    } finally {
      setLoadingRoute(false);
    }
  };

  return (
    <section id="stadium" className="relative py-20 sm:py-28">
      <div className="absolute inset-0 -z-10 bg-pitch-lines opacity-30" />
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <SectionHeading
            eyebrow="Interactive stadium map"
            title={
              <>
                See the crowd.{" "}
                <span className="text-gradient-brand">Find your way.</span>
              </>
            }
            subtitle="A live, zoomable map of Estadio Azteca — gates, food, restrooms, exits, parking, first-aid and your seat. Toggle the density heatmap and let AI plan the fastest route."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-[1.4fr_1fr]">
            {/* Map */}
            <div className="relative overflow-hidden rounded-2xl glass-strong p-3 shadow-float">
              {/* Controls */}
              <div className="absolute right-5 top-5 z-20 flex flex-col gap-1.5">
                <Button variant="ghost" size="icon" className="size-8 rounded-lg glass" onClick={() => setZoom((z) => Math.min(2, z + 0.2))} aria-label="Zoom in">
                  <ZoomIn className="size-4" />
                </Button>
                <Button variant="ghost" size="icon" className="size-8 rounded-lg glass" onClick={() => setZoom((z) => Math.max(0.8, z - 0.2))} aria-label="Zoom out">
                  <ZoomOut className="size-4" />
                </Button>
                <Button variant="ghost" size="icon" className="size-8 rounded-lg glass" onClick={() => setZoom(1)} aria-label="Reset">
                  <Locate className="size-4" />
                </Button>
              </div>

              {/* Heat toggle */}
              <div className="absolute left-5 top-5 z-20 flex gap-2">
                <button
                  onClick={() => setShowHeat((v) => !v)}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition",
                    showHeat ? "bg-brand-gradient text-white shadow-glow" : "glass text-muted-foreground"
                  )}
                >
                  <Flame className="size-3.5" /> Heatmap
                </button>
              </div>

              <div className="relative aspect-[5/4] w-full overflow-hidden rounded-xl bg-brand-gradient-soft">
                <motion.div
                  className="absolute inset-0"
                  animate={{ scale: zoom }}
                  transition={{ type: "spring", stiffness: 120, damping: 20 }}
                >
                  {/* Pitch + stands */}
                  <svg viewBox="0 0 100 80" className="absolute inset-0 size-full" preserveAspectRatio="none">
                    <defs>
                      <radialGradient id="pitch2" cx="50%" cy="50%" r="55%">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#064e3b" stopOpacity="0.7" />
                      </radialGradient>
                    </defs>
                    {/* Outer stand ring */}
                    <rect x="2" y="2" width="96" height="76" rx="14" fill="none" stroke="url(#pitch2)" strokeWidth="6" opacity="0.5" />
                    <rect x="14" y="10" width="72" height="60" rx="10" fill="url(#pitch2)" opacity="0.6" />
                    {/* pitch lines */}
                    <line x1="50" y1="10" x2="50" y2="70" stroke="white" strokeOpacity="0.25" strokeWidth="0.4" />
                    <circle cx="50" cy="40" r="10" fill="none" stroke="white" strokeOpacity="0.25" strokeWidth="0.4" />

                    {/* Heatmap blobs */}
                    {showHeat &&
                      STADIUM_POIS.filter((p) => p.density > 20).map((p) => {
                        const d = p.density;
                        const color = d > 80 ? "#ef4444" : d > 60 ? "#f59e0b" : d > 40 ? "#22d3ee" : "#10b981";
                        return (
                          <circle
                            key={`h-${p.id}`}
                            cx={p.x}
                            cy={p.y}
                            r={6 + d / 12}
                            fill={color}
                            opacity={0.18 + d / 400}
                          />
                        );
                      })}

                    {/* Route line */}
                    {route && selected && (
                      <motion.path
                        d={`M${STADIUM_POIS.find((p) => p.id === "s-1")!.x} ${STADIUM_POIS.find((p) => p.id === "s-1")!.y} Q 50 40 ${selected.x} ${selected.y}`}
                        fill="none"
                        stroke="#fbbf24"
                        strokeWidth="1.2"
                        strokeDasharray="2 1.5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1 }}
                      />
                    )}
                  </svg>

                  {/* POI markers */}
                  {STADIUM_POIS.filter((p) => active.includes(p.type) || p.id === selected?.id).map((p) => {
                    const meta = TYPE_META[p.type];
                    const isSel = selected?.id === p.id;
                    return (
                      <button
                        key={p.id}
                        onClick={() => setSelected(p)}
                        className="group absolute -translate-x-1/2 -translate-y-1/2"
                        style={{ left: `${p.x}%`, top: `${p.y}%` }}
                        aria-label={p.name}
                      >
                        <span
                          className="relative grid place-items-center rounded-full transition"
                          style={{
                            width: isSel ? 30 : 24,
                            height: isSel ? 30 : 24,
                            background: `${meta.color}22`,
                            border: `1.5px solid ${meta.color}`,
                            boxShadow: isSel ? `0 0 0 4px ${meta.color}33` : "none",
                          }}
                        >
                          <meta.icon className="size-3 text-foreground" style={{ color: meta.color }} />
                          {p.density > 60 && (
                            <motion.span
                              className="absolute inset-0 rounded-full"
                              style={{ border: `1px solid ${meta.color}` }}
                              animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
                              transition={{ duration: 1.8, repeat: Infinity }}
                            />
                          )}
                        </span>
                        <span
                          className={cn(
                            "absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded-md px-1.5 py-0.5 text-[9px] font-semibold glass-strong transition-opacity",
                            isSel ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                          )}
                        >
                          {p.name}
                        </span>
                      </button>
                    );
                  })}
                </motion.div>
              </div>

              {/* Legend */}
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {FILTERS.map((t) => {
                  const meta = TYPE_META[t];
                  const on = active.includes(t);
                  return (
                    <button
                      key={t}
                      onClick={() => toggle(t)}
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium transition",
                        on ? "glass-strong text-foreground" : "glass text-muted-foreground opacity-60"
                      )}
                    >
                      <span className="size-2 rounded-full" style={{ background: meta.color }} />
                      {meta.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Side panel */}
            <div className="flex flex-col gap-4">
              <div className="rounded-2xl glass p-4">
                <h3 className="font-display text-base font-bold">Selected point</h3>
                <AnimatePresence mode="wait">
                  {selected ? (
                    <motion.div
                      key={selected.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="mt-3"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="grid size-10 place-items-center rounded-xl"
                          style={{ background: `${TYPE_META[selected.type].color}22`, color: TYPE_META[selected.type].color }}
                        >
                          {React.createElement(TYPE_META[selected.type].icon, { className: "size-5" })}
                        </div>
                        <div>
                          <div className="font-semibold leading-tight">{selected.name}</div>
                          <div className="text-xs text-muted-foreground capitalize">{selected.type}</div>
                        </div>
                      </div>
                      {selected.note && (
                        <p className="mt-2 text-xs text-muted-foreground">{selected.note}</p>
                      )}
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <div className="rounded-lg glass p-2">
                          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Density</div>
                          <div className="font-bold tabular-nums">{selected.density}%</div>
                        </div>
                        <div className="rounded-lg glass p-2">
                          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Status</div>
                          <div className="font-bold text-emerald">
                            {selected.density > 80 ? "Congested" : selected.density > 50 ? "Moderate" : "Clear"}
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <Button
                          size="sm"
                          className="gap-1.5 rounded-xl bg-brand-gradient text-white shadow-glow"
                          onClick={() => planRoute(selected)}
                          disabled={loadingRoute}
                        >
                          <Navigation2 className="size-3.5" />
                          {loadingRoute ? "Planning…" : "Plan route from seat"}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-1.5 rounded-xl glass"
                          onClick={() => planRoute(selected, true)}
                          disabled={loadingRoute}
                        >
                          <Route className="size-3.5" /> Accessible
                        </Button>
                      </div>
                    </motion.div>
                  ) : (
                    <p className="mt-3 text-sm text-muted-foreground">Tap any point on the map to inspect it.</p>
                  )}
                </AnimatePresence>
              </div>

              <AnimatePresence>
                {route && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="rounded-2xl glass p-4"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-base font-bold">AI route</h3>
                      <Badge variant="gold">{route.minutes} min · {route.meters} m</Badge>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{route.from} → {route.to}</p>
                    <ol className="mt-3 space-y-2">
                      {route.steps.map((s, i) => (
                        <li key={i} className="flex gap-2.5 text-sm">
                          <span className="grid size-5 shrink-0 place-items-center rounded-full bg-brand-gradient text-[10px] font-bold text-white">
                            {i + 1}
                          </span>
                          <span className="text-muted-foreground">{s}</span>
                        </li>
                      ))}
                    </ol>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="rounded-2xl glass p-4">
                <h3 className="font-display text-sm font-bold">Live density</h3>
                <div className="mt-2 space-y-2">
                  {STADIUM_POIS.filter((p) => p.density > 0).sort((a, b) => b.density - a.density).slice(0, 5).map((p) => (
                    <div key={p.id} className="flex items-center gap-2">
                      <span className="w-24 truncate text-xs text-muted-foreground">{p.name}</span>
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-foreground/10">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: p.density > 80 ? "#ef4444" : p.density > 60 ? "#f59e0b" : p.density > 40 ? "#22d3ee" : "#10b981" }}
                          initial={{ width: 0 }}
                          animate={{ width: `${p.density}%` }}
                          transition={{ duration: 0.8 }}
                        />
                      </div>
                      <span className="w-8 text-right text-xs font-semibold tabular-nums">{p.density}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
