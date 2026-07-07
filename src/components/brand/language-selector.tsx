"use client";

import * as React from "react";
import { Check, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LANGUAGES } from "@/lib/constants";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function LanguageSelector({ compact = false }: { compact?: boolean }) {
  const lang = useAppStore((s) => s.lang);
  const setLang = useAppStore((s) => s.setLang);
  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "h-9 rounded-xl glass hover:bg-foreground/5 gap-2 px-2.5 text-sm font-medium",
            compact && "px-2"
          )}
          aria-label="Select language"
        >
          <Globe className="size-4 text-cyan" />
          <span className="hidden sm:inline">{current.flag}</span>
          <span className="hidden md:inline">{current.native}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuLabel className="text-xs uppercase tracking-wider text-muted-foreground">
          Multilingual AI · 9 languages
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {LANGUAGES.map((l) => (
          <DropdownMenuItem
            key={l.code}
            onClick={() => setLang(l.code)}
            className="gap-2 cursor-pointer"
          >
            <span className="text-base">{l.flag}</span>
            <span className="flex-1">{l.native}</span>
            {l.code === lang && <Check className="size-4 text-emerald" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
