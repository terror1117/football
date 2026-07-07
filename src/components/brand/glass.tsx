"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Re-export animation helpers so callers can import everything from one module.
export { AnimatedCounter, Reveal } from "./animated-counter";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: "none" | "cyan" | "purple" | "gold" | "soft" | "float";
  gradientBorder?: boolean;
  hover?: boolean;
  children: React.ReactNode;
}

const GLOW: Record<NonNullable<GlassCardProps["glow"]>, string> = {
  none: "",
  cyan: "shadow-glow",
  purple: "shadow-glow-purple",
  gold: "shadow-glow-gold",
  soft: "shadow-soft",
  float: "shadow-float",
};

export function GlassCard({
  className,
  glow = "soft",
  gradientBorder = false,
  hover = false,
  children,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-2xl p-5 sm:p-6",
        gradientBorder ? "border-gradient" : "glass",
        GLOW[glow],
        hover && "transition-transform duration-300 hover:-translate-y-1",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          <span className="size-1.5 rounded-full bg-emerald animate-pulse" />
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl max-w-3xl">
        {title}
      </h2>
      {subtitle && (
        <p className="max-w-2xl text-sm text-muted-foreground sm:text-base leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}

/** Pill badge with brand gradient. */
export function Badge({
  children,
  className,
  variant = "default",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "cyan" | "gold" | "purple" | "emerald" | "danger";
}) {
  const variants: Record<string, string> = {
    default: "glass text-foreground",
    cyan: "bg-cyan/15 text-cyan border border-cyan/30",
    gold: "bg-gold/15 text-gold border border-gold/30",
    purple: "bg-purple/15 text-purple border border-purple/30",
    emerald: "bg-emerald/15 text-emerald border border-emerald/30",
    danger: "bg-destructive/15 text-destructive border border-destructive/30",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

/** Animated gradient blob used as a decorative background. */
export function GradientBlob({ className }: { className?: string }) {
  return (
    <motion.div
      aria-hidden
      className={cn("pointer-events-none absolute rounded-full blur-3xl", className)}
      animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.75, 0.5] }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}
