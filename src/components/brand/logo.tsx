"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: number;
  className?: string;
  withWordmark?: boolean;
  animated?: boolean;
}

/**
 * ArenaMind AI logo — football edition.
 * A goalpost frame forming an "A", with a football resting at the
 * base and a neural pulse above the crossbar. Brand gradient:
 * Brazil green → yellow meets Argentina blue.
 */
export function Logo({ size = 36, className, withWordmark = true, animated = true }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="ArenaMind AI logo"
        initial={animated ? { rotate: -6, opacity: 0, scale: 0.9 } : false}
        animate={animated ? { rotate: 0, opacity: 1, scale: 1 } : undefined}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
        className="shrink-0"
      >
        <defs>
          <linearGradient id="amGoal" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop stopColor="#009c3b" />
            <stop offset="0.5" stopColor="#ffd400" />
            <stop offset="1" stopColor="#6cb4e4" />
          </linearGradient>
          <linearGradient id="amBall" x1="0" y1="48" x2="48" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ffffff" />
            <stop offset="1" stopColor="#e5e7eb" />
          </linearGradient>
        </defs>

        {/* Goalpost frame forming an A — two posts + crossbar */}
        <path
          d="M24 7 L11 40 M24 7 L37 40"
          stroke="url(#amGoal)"
          strokeWidth="3.4"
          strokeLinecap="round"
        />
        <path d="M16.5 28 L31.5 28" stroke="url(#amGoal)" strokeWidth="3" strokeLinecap="round" />

        {/* Net hint behind the goal */}
        <g stroke="url(#amGoal)" strokeOpacity="0.25" strokeWidth="0.8">
          <line x1="14" y1="14" x2="14" y2="40" />
          <line x1="34" y1="14" x2="34" y2="40" />
          <line x1="14" y1="20" x2="34" y2="20" />
          <line x1="14" y1="34" x2="34" y2="34" />
        </g>

        {/* Football at the base of the goal */}
        <motion.g
          animate={animated ? { y: [0, -1.5, 0] } : undefined}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <circle cx="24" cy="41" r="3.4" fill="url(#amBall)" stroke="#0b1220" strokeWidth="1" />
          <path
            d="M24 38.2 L25.6 39.4 L25 41.2 L23 41.2 L22.4 39.4 Z"
            fill="#0b1220"
          />
          <path d="M21 40.4 L22.4 39.4 M27 40.4 L25.6 39.4" stroke="#0b1220" strokeWidth="0.6" />
        </motion.g>

        {/* Neural pulse above the crossbar */}
        <motion.circle
          cx="24"
          cy="7"
          r="2.2"
          fill="#ffd400"
          animate={animated ? { scale: [1, 1.4, 1], opacity: [1, 0.6, 1] } : undefined}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.circle
          cx="24"
          cy="7"
          r="3.5"
          stroke="#ffd400"
          strokeWidth="1"
          fill="none"
          animate={animated ? { scale: [1, 2], opacity: [0.7, 0] } : undefined}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
        />
      </motion.svg>

      {withWordmark && (
        <div className="leading-none">
          <span className="font-display text-[17px] font-bold tracking-tight">
            ArenaMind
            <span className="text-gradient-brand"> AI</span>
          </span>
        </div>
      )}
    </div>
  );
}
