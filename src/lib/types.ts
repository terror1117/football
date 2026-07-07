/**
 * ArenaMind AI — Shared domain types
 */

export type Role = "fan" | "staff" | "organizer" | "volunteer" | "security" | "transport";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  createdAt: number;
  lang?: string;
  voice?: boolean;
  attachment?: { kind: "image"; name: string };
  pending?: boolean;
}

export interface LiveStat {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  delta?: number;
  icon: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  gradient: string;
  tag: string;
}

export interface StadiumPOI {
  id: string;
  name: string;
  type: "gate" | "food" | "restroom" | "exit" | "firstaid" | "parking" | "seat" | "shop";
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  density: number; // 0-100 crowd density
  note?: string;
}

export interface Incident {
  id: string;
  severity: "low" | "medium" | "high" | "critical";
  title: string;
  zone: string;
  status: "active" | "monitoring" | "resolved";
  time: string;
}

export interface ActivityItem {
  id: string;
  type: "ai" | "alert" | "system" | "staff" | "fan";
  title: string;
  detail: string;
  time: string;
}

export interface MatchInfo {
  id: string;
  home: string;
  away: string;
  homeFlag: string;
  awayFlag: string;
  stage: string;
  venue: string;
  city: string;
  kickoff: string;
  status: "scheduled" | "live" | "final";
  score?: string;
}

export interface TransportOption {
  id: string;
  mode: "metro" | "bus" | "car" | "walk" | "rideshare";
  label: string;
  eta: string;
  load: number; // 0-100
  green: number; // 0-100 sustainability score
  cost: string;
}

export interface AISuggestion {
  id: string;
  priority: "info" | "warning" | "critical";
  title: string;
  detail: string;
  action: string;
  confidence: number;
}

export interface SustainabilityMetric {
  label: string;
  value: number;
  unit: string;
  target: number;
  trend: number[];
}
