"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { FloatingNav } from "@/components/landing/floating-nav";
import { Hero } from "@/components/landing/hero";
import { FootballMatch } from "@/components/landing/football-match";
import { Features } from "@/components/landing/features";
import { AiDemo } from "@/components/landing/ai-demo";
import { CartoonStars } from "@/components/landing/cartoon-stars";
import { StadiumMap } from "@/components/landing/stadium-map";
import { DashboardPreview } from "@/components/landing/dashboard-preview";
import { Sustainability } from "@/components/landing/sustainability";
import { Testimonials } from "@/components/landing/testimonials";
import { Faq } from "@/components/landing/faq";
import { Footer } from "@/components/landing/footer";
import { ChatDrawer } from "@/components/chat/chat-panel";
import { EmergencySOS } from "@/components/emergency/sos-modal";
import { DashboardView } from "@/components/dashboard/dashboard-view";

export default function Home() {
  const view = useAppStore((s) => s.view);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {view === "landing" && <FloatingNav />}

      <AnimatePresence mode="wait">
        {view === "landing" ? (
          <motion.main
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex-1"
          >
            <Hero />
            <FootballMatch />
            <Features />
            <AiDemo />
            <CartoonStars />
            <StadiumMap />
            <DashboardPreview />
            <Sustainability />
            <Testimonials />
            <Faq />
            <Footer />
          </motion.main>
        ) : (
          <motion.main
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex-1"
          >
            <DashboardView />
          </motion.main>
        )}
      </AnimatePresence>

      {/* Global overlays */}
      <ChatDrawer />
      <EmergencySOS />
    </div>
  );
}
