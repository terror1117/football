"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Twitter, Github, Linkedin, ShieldCheck, Sparkles, Globe } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { BRAND } from "@/lib/constants";
import { useAppStore } from "@/lib/store";

const COLUMNS = [
  {
    title: "Platform",
    links: ["AI Assistant", "Smart Navigation", "Crowd Intelligence", "Accessibility AI", "Emergency AI"],
  },
  {
    title: "Audiences",
    links: ["Fans", "Stadium Staff", "Organizers", "Volunteers", "Security Teams", "Transportation Teams"],
  },
  {
    title: "Resources",
    links: ["Architecture", "API Docs", "Database Schema", "Prompt Engineering", "Security Practices", "Roadmap"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Press Kit", "Contact", "Status", "Privacy"],
  },
];

export function Footer() {
  const setView = useAppStore((s) => s.setView);
  const setChatOpen = useAppStore((s) => s.setChatOpen);

  return (
    <footer className="mt-auto relative overflow-hidden border-t border-border/60">
      <div className="absolute inset-0 -z-10 bg-grass opacity-40" />
      <div className="absolute inset-0 -z-10 bg-brand-gradient-soft opacity-40" />
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

      {/* CTA band */}
      <div className="mx-auto max-w-6xl px-4 pt-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-brand-gradient p-8 text-center text-white shadow-float sm:p-12"
        >
          <div className="absolute inset-0 bg-pitch-lines opacity-30" />
          <div className="relative">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">{BRAND.slogan}</h2>
            <p className="mx-auto mt-3 max-w-xl text-white/85">
              Be part of the most intelligent World Cup ever. ArenaMind AI is ready for FIFA 2026™.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setView("dashboard")}
                className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-2.5 text-sm font-semibold text-royal shadow-lg transition hover:scale-105"
              >
                <Sparkles className="size-4" /> Launch Dashboard
              </button>
              <button
                onClick={() => setChatOpen(true)}
                className="inline-flex items-center gap-2 rounded-2xl border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Try the Assistant
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Links */}
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2">
            <Logo size={32} />
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">{BRAND.tagline}</p>
            <div className="mt-4 flex gap-2">
              {[Twitter, Github, Linkedin, Globe].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="grid size-9 place-items-center rounded-xl glass text-muted-foreground transition hover:text-foreground hover:bg-foreground/5"
                  aria-label="Social link"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((c) => (
            <div key={c.title}>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">{c.title}</h4>
              <ul className="mt-3 space-y-2">
                {c.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="text-sm text-muted-foreground transition hover:text-foreground"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © 2026 {BRAND.name}. Built for the FIFA World Cup 2026™. Not affiliated with FIFA.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="size-3.5 text-emerald" /> SOC2 · GDPR · WCAG 2.2 AA
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-emerald animate-pulse" /> All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
