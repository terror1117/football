"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Siren, HeartPulse, ShieldAlert, Footprints, Phone, MapPin, X, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/brand/glass";

type EmergencyType = "medical" | "security" | "evacuation" | "other";

const OPTIONS: { id: EmergencyType; label: string; icon: React.ElementType; desc: string; tone: string }[] = [
  { id: "medical", label: "Medical", icon: HeartPulse, desc: "First aid / medic dispatch", tone: "text-red-400" },
  { id: "security", label: "Security", icon: ShieldAlert, desc: "Steward / police assist", tone: "text-gold" },
  { id: "evacuation", label: "Evacuation", icon: Footprints, desc: "Guided exit route", tone: "text-cyan" },
  { id: "other", label: "Other", icon: Siren, desc: "Describe your emergency", tone: "text-purple" },
];

export function EmergencySOS() {
  const open = useAppStore((s) => s.emergencyOpen);
  const setOpen = useAppStore((s) => s.setEmergencyOpen);
  const { toast } = useToast();
  const [stage, setStage] = React.useState<"select" | "dispatching" | "confirmed">("select");
  const [type, setType] = React.useState<EmergencyType | null>(null);

  React.useEffect(() => {
    if (!open) {
      const t = setTimeout(() => {
        setStage("select");
        setType(null);
      }, 300);
      return () => clearTimeout(t);
    }
  }, [open]);

  const dispatch = (t: EmergencyType) => {
    setType(t);
    setStage("dispatching");
    toast({ title: "Emergency alert sent", description: "Nearest responder unit notified." });
    setTimeout(() => setStage("confirmed"), 2200);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] grid place-items-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={() => stage === "confirmed" && setOpen(false)}
          />
          <motion.div
            initial={{ scale: 0.92, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.92, y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 24 }}
            className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl glass-strong shadow-float"
          >
            {/* Header */}
            <div className="relative bg-gradient-to-br from-red-500/20 via-gold/10 to-transparent p-5">
              <motion.div
                className="absolute -right-8 -top-8 size-32 rounded-full bg-red-500/30 blur-3xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative grid size-11 place-items-center rounded-2xl bg-red-500/20 text-red-400">
                    <Siren className="size-5" />
                    <motion.span
                      className="absolute inset-0 rounded-2xl border-2 border-red-500"
                      animate={{ scale: [1, 1.5], opacity: [0.7, 0] }}
                      transition={{ duration: 1.6, repeat: Infinity }}
                    />
                  </div>
                  <div>
                    <h2 className="font-display text-lg font-bold">Emergency SOS</h2>
                    <p className="text-xs text-muted-foreground">ArenaMind AI · live response</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="size-8 rounded-lg" onClick={() => setOpen(false)}>
                  <X className="size-4" />
                </Button>
              </div>
            </div>

            {/* Body */}
            <div className="p-5">
              {stage === "select" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Select the type of emergency. Your location is shared automatically with the nearest responder.
                  </p>
                  <div className="grid grid-cols-2 gap-2.5">
                    {OPTIONS.map((o) => (
                      <button
                        key={o.id}
                        onClick={() => dispatch(o.id)}
                        className="group rounded-2xl glass p-4 text-left transition hover:-translate-y-0.5 hover:shadow-soft"
                      >
                        <o.icon className={`size-5 ${o.tone}`} />
                        <div className="mt-2 text-sm font-semibold">{o.label}</div>
                        <div className="text-[11px] text-muted-foreground">{o.desc}</div>
                      </button>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center gap-2 rounded-xl glass p-3 text-xs text-muted-foreground">
                    <MapPin className="size-4 text-cyan" />
                    Your location: <span className="font-medium text-foreground">Section 214 · Row 12 · Seat 7</span>
                  </div>
                  <Button
                    variant="outline"
                    className="mt-3 w-full gap-2 rounded-xl"
                    onClick={() => toast({ title: "Connecting to operator", description: "A human operator will join shortly." })}
                  >
                    <Phone className="size-4" /> Talk to a human operator
                  </Button>
                </motion.div>
              )}

              {stage === "dispatching" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center py-6 text-center"
                >
                  <Loader2 className="size-10 animate-spin text-red-400" />
                  <h3 className="mt-4 font-display text-lg font-bold">Dispatching {type}…</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    AI is planning the fastest responder route and alerting nearby staff.
                  </p>
                  <div className="mt-4 w-full space-y-2 text-left">
                    <Step done label="Location captured · Section 214" />
                    <Step done label={`${type} unit notified`} />
                    <Step loading label="Routing fastest path" />
                  </div>
                </motion.div>
              )}

              {stage === "confirmed" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center py-6 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 12 }}
                    className="grid size-14 place-items-center rounded-full bg-emerald/15 text-emerald"
                  >
                    <CheckCircle2 className="size-8" />
                  </motion.div>
                  <h3 className="mt-4 font-display text-lg font-bold">Help is on the way</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Responder unit M-3 dispatched. ETA <span className="font-semibold text-foreground">90 seconds</span>.
                  </p>
                  <div className="mt-4 w-full rounded-xl glass p-3 text-left text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">AI evacuation route</span>
                      <Badge variant="cyan">Section 214 → Exit N1</Badge>
                    </div>
                    <div className="mt-2 text-muted-foreground">
                      Step-free path · 78 m · 1 min · stewards notified at Gate A & Exit N1
                    </div>
                  </div>
                  <Button className="mt-4 w-full rounded-xl bg-brand-gradient text-white" onClick={() => setOpen(false)}>
                    Close
                  </Button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Step({ done, loading, label }: { done?: boolean; loading?: boolean; label: string }) {
  return (
    <div className="flex items-center gap-2.5 rounded-lg glass px-3 py-2 text-sm">
      {done ? (
        <CheckCircle2 className="size-4 text-emerald" />
      ) : loading ? (
        <Loader2 className="size-4 animate-spin text-cyan" />
      ) : (
        <span className="size-4 rounded-full border border-muted-foreground/40" />
      )}
      <span className={done ? "text-foreground" : "text-muted-foreground"}>{label}</span>
    </div>
  );
}
