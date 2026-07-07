"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, Menu, ShieldAlert, Sparkles, X, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/brand/theme-toggle";
import { LanguageSelector } from "@/components/brand/language-selector";
import { NAV_LINKS, BRAND } from "@/lib/constants";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function FloatingNav() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const setView = useAppStore((s) => s.setView);
  const view = useAppStore((s) => s.view);
  const setEmergencyOpen = useAppStore((s) => s.setEmergencyOpen);
  const setChatOpen = useAppStore((s) => s.setChatOpen);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goLanding = () => setView("landing");
  const goDashboard = () => setView("dashboard");

  const scrollTo = (id: string) => {
    setView("landing");
    setMobileOpen(false);
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 90, damping: 16, delay: 0.1 }}
        className="fixed inset-x-0 top-3 z-50 flex justify-center px-3"
      >
        <nav
          className={cn(
            "flex w-full max-w-6xl items-center justify-between gap-2 rounded-2xl px-3 py-2 transition-all duration-300",
            scrolled ? "glass-nav shadow-soft" : "bg-transparent"
          )}
        >
          <button
            onClick={goLanding}
            className="flex items-center gap-2 rounded-xl px-1.5 py-1 transition hover:opacity-90"
            aria-label="ArenaMind AI home"
          >
            <Logo size={30} animated={!scrolled} />
          </button>

          {/* Desktop nav links */}
          <div className="hidden items-center gap-0.5 lg:flex">
            {view === "dashboard" ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={goLanding}
                className="gap-1.5 rounded-xl text-sm"
              >
                <Home className="size-4" /> Landing
              </Button>
            ) : (
              NAV_LINKS.map((l) => (
                <button
                  key={l.id}
                  onClick={() => scrollTo(l.id)}
                  className="rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition hover:bg-foreground/5 hover:text-foreground"
                >
                  {l.label}
                </button>
              ))
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <LanguageSelector compact />

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setChatOpen(true)}
              className="hidden sm:flex gap-1.5 rounded-xl px-3 text-sm"
            >
              <Sparkles className="size-4 text-cyan" />
              <span className="hidden md:inline">Ask AI</span>
            </Button>

            <Button
              size="sm"
              onClick={goDashboard}
              className="gap-1.5 rounded-xl bg-brand-gradient px-3 text-white shadow-glow hover:opacity-95"
            >
              <LayoutDashboard className="size-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </Button>

            <ThemeToggle />

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setEmergencyOpen(true)}
              className="size-9 rounded-xl glass text-destructive hover:bg-destructive/10"
              aria-label="Emergency SOS"
            >
              <ShieldAlert className="size-4" />
            </Button>

            {/* Mobile menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-9 rounded-xl glass lg:hidden"
                  aria-label="Open menu"
                >
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[300px] sm:w-[340px]" side="right">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <Logo size={28} />
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-6 flex flex-col gap-1">
                  {view === "dashboard" && (
                    <Button variant="outline" onClick={goLanding} className="justify-start gap-2">
                      <Home className="size-4" /> Back to landing
                    </Button>
                  )}
                  {view === "landing" &&
                    NAV_LINKS.map((l) => (
                      <button
                        key={l.id}
                        onClick={() => scrollTo(l.id)}
                        className="rounded-xl px-3 py-2.5 text-left text-sm font-medium transition hover:bg-foreground/5"
                      >
                        {l.label}
                      </button>
                    ))}
                  <div className="my-2 h-px bg-border" />
                  <Button
                    variant="outline"
                    onClick={() => {
                      setChatOpen(true);
                      setMobileOpen(false);
                    }}
                    className="justify-start gap-2"
                  >
                    <Sparkles className="size-4 text-cyan" /> Ask the AI assistant
                  </Button>
                  <Button
                    onClick={() => {
                      goDashboard();
                      setMobileOpen(false);
                    }}
                    className="justify-start gap-2 bg-brand-gradient text-white"
                  >
                    <LayoutDashboard className="size-4" /> Open dashboard
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setEmergencyOpen(true);
                      setMobileOpen(false);
                    }}
                    className="justify-start gap-2 text-destructive"
                  >
                    <ShieldAlert className="size-4" /> Emergency SOS
                  </Button>
                  <p className="mt-4 px-3 text-xs text-muted-foreground">{BRAND.tagline}</p>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </motion.header>
    </>
  );
}
