import type { Metadata } from "next";
import { Inter, Space_Grotesk, Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Providers } from "@/components/providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ArenaMind AI — FIFA World Cup 2026 · GenAI Stadium Assistant",
  description:
    "ArenaMind AI is the intelligent nervous system for FIFA World Cup 2026 stadiums — AI navigation, crowd intelligence, accessibility, sustainability, emergency response and multilingual assistance for fans, staff and organizers.",
  keywords: [
    "FIFA World Cup 2026",
    "ArenaMind AI",
    "AI Stadium Assistant",
    "Crowd Intelligence",
    "Stadium Navigation",
    "GenAI",
    "Sustainability AI",
  ],
  authors: [{ name: "ArenaMind AI" }],
  openGraph: {
    title: "ArenaMind AI — FIFA World Cup 2026",
    description: "Every fan. Every moment. One intelligent arena.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ArenaMind AI — FIFA World Cup 2026",
    description: "Every fan. Every moment. One intelligent arena.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${plusJakarta.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <Providers>
          {children}
          <Toaster />
          <Sonner position="top-center" />
        </Providers>
      </body>
    </html>
  );
}
