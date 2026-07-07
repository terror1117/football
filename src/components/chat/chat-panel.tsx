"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Mic,
  Square,
  Volume2,
  ImagePlus,
  Sparkles,
  Trash2,
  Loader2,
  X,
  Bot,
  User as UserIcon,
  Accessibility,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/brand/glass";
import { useAppStore } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/lib/types";

const QUICK_PROMPTS = [
  "Where is Gate B?",
  "Shortest food queue near me",
  "Wheelchair route to Section 214",
  "Best way to leave after the match",
  "Nearest restroom",
  "Translate 'my seat is 214-12-7' to Spanish",
];

interface ChatPanelProps {
  variant?: "full" | "compact";
  className?: string;
  title?: string;
}

export function ChatPanel({ variant = "full", className, title }: ChatPanelProps) {
  const {
    messages,
    addMessage,
    updateMessage,
    clearMessages,
    lang,
    role,
    chatOpen,
    setChatOpen,
  } = useAppStore();
  const { toast } = useToast();

  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [recording, setRecording] = React.useState(false);
  const [speakingId, setSpeakingId] = React.useState<string | null>(null);
  const [attachment, setAttachment] = React.useState<{ name: string; dataUrl: string } | null>(null);

  const scrollRef = React.useRef<HTMLDivElement>(null);
  const mediaRef = React.useRef<MediaRecorder | null>(null);
  const chunksRef = React.useRef<Blob[]>([]);
  const fileRef = React.useRef<HTMLInputElement>(null);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  // Auto-scroll
  React.useEffect(() => {
    const el = scrollRef.current?.querySelector("[data-radix-scroll-area-viewport]");
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, loading]);

  const send = async (overrideText?: string, overrideAttachment?: { name: string; dataUrl: string } | null) => {
    const text = (overrideText ?? input).trim();
    const att = overrideAttachment ?? attachment;
    if ((!text && !att) || loading) return;

    const userMsg: ChatMessage = {
      id: `u_${Date.now()}`,
      role: "user",
      content: text || "(image attached)",
      createdAt: Date.now(),
      lang,
      attachment: att ? { kind: "image", name: att.name } : undefined,
    };
    addMessage(userMsg);
    setInput("");
    setAttachment(null);
    setLoading(true);

    const pendingId = `p_${Date.now()}`;
    addMessage({
      id: pendingId,
      role: "assistant",
      content: "",
      createdAt: Date.now(),
      pending: true,
    });

    try {
      let replyText = "";
      let visionNote = "";

      if (att) {
        // Vision path
        const vRes = await fetch("/api/vision", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            image: att.dataUrl,
            prompt: text || undefined,
            role,
            lang,
          }),
        });
        const vData = await vRes.json();
        if (!vRes.ok) throw new Error(vData.error || "Vision failed");
        visionNote = vData.analysis || "";
      }

      // Chat path (include vision note as context if present)
      const history = [...messages.filter((m) => m.id !== "welcome" && !m.pending), userMsg].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const cRes = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: visionNote
            ? [...history, { role: "user" as const, content: `Vision module reported: ${visionNote}\n\nRespond to the fan using this visual context.` }]
            : history,
          role,
          lang,
          stadium: "Estadio Azteca",
          section: "214",
          liveDensity: 71,
          liveQueue: 9,
        }),
      });
      const cData = await cRes.json();
      if (!cRes.ok) throw new Error(cData.error || "Chat failed");
      replyText = cData.message?.content || visionNote || "I'm here to help.";

      updateMessage(pendingId, { content: replyText, pending: false, lang });
    } catch (err) {
      updateMessage(pendingId, {
        content: `Sorry, I couldn't reach the AI service just now. ${err instanceof Error ? err.message : ""}`.trim(),
        pending: false,
      });
      toast({ title: "AI request failed", description: err instanceof Error ? err.message : undefined, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const speak = async (msg: ChatMessage) => {
    if (speakingId === msg.id) {
      audioRef.current?.pause();
      setSpeakingId(null);
      return;
    }
    try {
      setSpeakingId(msg.id);
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: msg.content.slice(0, 1000), voice: "tongtong", speed: 1 }),
      });
      if (!res.ok) throw new Error("TTS failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = url;
        audioRef.current.onended = () => setSpeakingId(null);
        await audioRef.current.play();
      }
    } catch (err) {
      setSpeakingId(null);
      toast({ title: "Voice playback failed", variant: "destructive" });
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      chunksRef.current = [];
      mr.ondataavailable = (e) => chunksRef.current.push(e.data);
      mr.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const reader = new FileReader();
        reader.onload = async () => {
          const base64 = reader.result as string;
          try {
            const res = await fetch("/api/asr", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ base64 }),
            });
            const data = await res.json();
            if (data.text) {
              setInput(data.text);
              toast({ title: "Heard you", description: data.text });
            } else {
              toast({ title: "Couldn't catch that", variant: "destructive" });
            }
          } catch {
            toast({ title: "Speech recognition failed", variant: "destructive" });
          }
        };
        reader.readAsDataURL(blob);
        stream.getTracks().forEach((t) => t.stop());
      };
      mr.start();
      mediaRef.current = mr;
      setRecording(true);
    } catch {
      toast({ title: "Microphone access denied", variant: "destructive" });
    }
  };

  const stopRecording = () => {
    mediaRef.current?.stop();
    setRecording(false);
  };

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast({ title: "Please upload an image", variant: "destructive" });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setAttachment({ name: file.name, dataUrl: reader.result as string });
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  return (
    <div className={cn("flex h-full flex-col", className)}>
      <audio ref={audioRef} className="hidden" />

      {/* Header */}
      <div className="flex items-center justify-between gap-2 border-b border-border/60 px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div className="relative grid size-9 place-items-center rounded-xl bg-brand-gradient text-white shadow-glow">
            <Sparkles className="size-4" />
            <span className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full bg-emerald ring-2 ring-background animate-pulse" />
          </div>
          <div>
            <div className="text-sm font-semibold leading-tight">{title ?? "ArenaMind Assistant"}</div>
            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <span className="size-1.5 rounded-full bg-emerald animate-pulse" /> Online · {lang.toUpperCase()} · {role}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="size-8 rounded-lg" onClick={clearMessages} aria-label="Clear chat">
            <Trash2 className="size-3.5" />
          </Button>
          {variant === "compact" && (
            <Button variant="ghost" size="icon" className="size-8 rounded-lg" onClick={() => setChatOpen(false)} aria-label="Close chat">
              <X className="size-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Messages */}
      <ScrollArea ref={scrollRef} className="flex-1 px-3" style={{ maxHeight: variant === "compact" ? "52vh" : "100%" }}>
        <div className="flex flex-col gap-3 py-3">
          {messages.map((m) => (
            <MessageBubble key={m.id} msg={m} onSpeak={() => speak(m)} speaking={speakingId === m.id} />
          ))}
          {loading && (
            <div className="flex items-center gap-2 px-2 text-xs text-muted-foreground">
              <Loader2 className="size-3 animate-spin" /> ArenaMind is thinking…
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Quick prompts */}
      {variant === "full" && (
        <div className="flex flex-wrap gap-1.5 px-3 pb-2">
          {QUICK_PROMPTS.map((p) => (
            <button
              key={p}
              onClick={() => send(p, null)}
              disabled={loading}
              className="rounded-full glass px-2.5 py-1 text-[11px] font-medium text-muted-foreground transition hover:text-foreground hover:bg-foreground/5 disabled:opacity-50"
            >
              {p}
            </button>
          ))}
        </div>
      )}

      {/* Attachment preview */}
      <AnimatePresence>
        {attachment && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="px-3"
          >
            <div className="flex items-center gap-2 rounded-xl glass px-2 py-1.5">
              <img src={attachment.dataUrl} alt="" className="size-9 rounded-lg object-cover" />
              <span className="flex-1 truncate text-xs text-muted-foreground">{attachment.name}</span>
              <Badge variant="cyan">Vision AI</Badge>
              <Button variant="ghost" size="icon" className="size-6" onClick={() => setAttachment(null)}>
                <X className="size-3" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input */}
      <div className="border-t border-border/60 p-3">
        <div className="flex items-end gap-2">
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onFile} />
          <Button
            variant="ghost"
            size="icon"
            className="size-10 shrink-0 rounded-xl glass"
            onClick={() => fileRef.current?.click()}
            aria-label="Upload image"
          >
            <ImagePlus className="size-4 text-purple" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "size-10 shrink-0 rounded-xl glass",
              recording && "bg-destructive/15 text-destructive"
            )}
            onClick={recording ? stopRecording : startRecording}
            aria-label={recording ? "Stop recording" : "Start voice input"}
          >
            {recording ? <Square className="size-4" /> : <Mic className="size-4 text-cyan" />}
          </Button>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            placeholder={recording ? "Listening…" : "Ask about gates, seats, food, routes…"}
            rows={1}
            className="min-h-[40px] max-h-32 resize-none rounded-xl glass text-sm"
          />
          <Button
            size="icon"
            className="size-10 shrink-0 rounded-xl bg-brand-gradient text-white shadow-glow"
            onClick={() => send()}
            disabled={loading || (!input.trim() && !attachment)}
            aria-label="Send message"
          >
            <Send className="size-4" />
          </Button>
        </div>
        <div className="mt-1.5 flex items-center justify-center gap-1 text-[10px] text-muted-foreground">
          <Accessibility className="size-3" /> Voice & vision AI · multilingual · accessible routes
        </div>
      </div>
    </div>
  );
}

function MessageBubble({
  msg,
  onSpeak,
  speaking,
}: {
  msg: ChatMessage;
  onSpeak: () => void;
  speaking: boolean;
}) {
  const isUser = msg.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("flex gap-2.5", isUser && "flex-row-reverse")}
    >
      <div
        className={cn(
          "grid size-7 shrink-0 place-items-center rounded-lg",
          isUser ? "bg-foreground/10" : "bg-brand-gradient text-white"
        )}
      >
        {isUser ? <UserIcon className="size-3.5" /> : <Bot className="size-3.5" />}
      </div>
      <div className={cn("flex max-w-[82%] flex-col gap-1", isUser && "items-end")}>
        <div
          className={cn(
            "rounded-2xl px-3.5 py-2 text-sm leading-relaxed",
            isUser ? "bg-brand-gradient text-white rounded-tr-md" : "glass rounded-tl-md",
            msg.pending && "animate-pulse"
          )}
        >
          {msg.pending ? (
            <span className="inline-flex gap-1">
              <Dot /> <Dot d={0.15} /> <Dot d={0.3} />
            </span>
          ) : (
            <span className="whitespace-pre-wrap">{msg.content}</span>
          )}
        </div>
        {!isUser && !msg.pending && msg.content && (
          <button
            onClick={onSpeak}
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium transition",
              speaking ? "text-cyan" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Volume2 className={cn("size-3", speaking && "animate-pulse")} />
            {speaking ? "Speaking…" : "Listen"}
          </button>
        )}
      </div>
    </motion.div>
  );
}

function Dot({ d = 0 }: { d?: number }) {
  return (
    <motion.span
      className="inline-block size-1.5 rounded-full bg-current opacity-60"
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 0.8, repeat: Infinity, delay: d }}
    />
  );
}

/** Floating chat drawer (opens from nav "Ask AI"). */
export function ChatDrawer() {
  const chatOpen = useAppStore((s) => s.chatOpen);
  const setChatOpen = useAppStore((s) => s.setChatOpen);
  return (
    <AnimatePresence>
      {chatOpen && (
        <motion.div
          className="fixed inset-0 z-[60] flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setChatOpen(false)} />
          <motion.div
            initial={{ x: 420 }}
            animate={{ x: 0 }}
            exit={{ x: 420 }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            className="relative z-10 flex h-full w-full max-w-md flex-col glass-strong shadow-float"
          >
            <ChatPanel variant="compact" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
