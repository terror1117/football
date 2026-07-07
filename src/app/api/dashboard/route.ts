import { NextResponse } from "next/server";
import {
  STADIUM,
  STADIUM_POIS,
  LIVE_MATCHES,
  INCIDENTS,
  ACTIVITY,
  AI_SUGGESTIONS,
  TRANSPORT,
  SUSTAINABILITY,
  HEATMAP_GRID,
  CROWD_TIMELINE,
  QUEUE_TIMELINE,
  HOURLY_ATTENDANCE,
  LANG_USAGE,
  WEATHER,
} from "@/lib/data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/dashboard
 * Aggregated, realtime-ish snapshot powering the ArenaMind dashboard.
 */
export async function GET() {
  return NextResponse.json({
    stadium: STADIUM,
    pois: STADIUM_POIS,
    matches: LIVE_MATCHES,
    incidents: INCIDENTS,
    activity: ACTIVITY,
    suggestions: AI_SUGGESTIONS,
    transport: TRANSPORT,
    sustainability: SUSTAINABILITY,
    heatmap: HEATMAP_GRID,
    crowdTimeline: CROWD_TIMELINE,
    queueTimeline: QUEUE_TIMELINE,
    attendance: HOURLY_ATTENDANCE,
    langUsage: LANG_USAGE,
    weather: WEATHER,
    timestamp: Date.now(),
  });
}
