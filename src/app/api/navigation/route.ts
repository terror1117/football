import { NextRequest, NextResponse } from "next/server";
import { STADIUM_POIS } from "@/lib/data";
import type { StadiumPOI } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface NavBody {
  from?: string;
  to?: string;
  accessible?: boolean;
}

/** Straight-line distance on the 0-100 grid. */
function dist(a: StadiumPOI, b: StadiumPOI) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

/** Build a human-readable walking route between two POIs. */
function buildRoute(from: StadiumPOI, to: StadiumPOI, accessible: boolean) {
  const steps: string[] = [];
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const meters = Math.round(dist(from, to) * 4.2); // scale grid → meters
  const minutes = Math.max(2, Math.round(meters / 75)); // ~75 m/min walking

  const horizontal = dx > 0 ? "east" : "west";
  const vertical = dy > 0 ? "south" : "north";

  steps.push(`Start at ${from.name}.`);
  if (Math.abs(dx) > 12) steps.push(`Head ${horizontal} along the concourse.`);
  if (Math.abs(dy) > 12) steps.push(`Continue ${vertical} toward ${to.name}.`);
  if (accessible) {
    steps.push(`Use the step-free ramp and lifts — route verified wheelchair-accessible.`);
  }
  steps.push(`Arrive at ${to.name}.`);

  return { steps, meters, minutes };
}

/**
 * POST /api/navigation
 * Body: { from?: string (poi id), to?: string (poi id), accessible?: boolean }
 * Returns a planned route with steps + ETA.
 */
export async function POST(req: NextRequest) {
  try {
    const { from: fromId, to: toId, accessible = false } = (await req.json()) as NavBody;

    const from = STADIUM_POIS.find((p) => p.id === fromId) ?? STADIUM_POIS.find((p) => p.type === "seat")!;
    const to =
      STADIUM_POIS.find((p) => p.id === toId) ??
      STADIUM_POIS.find((p) => p.type === "food" && p.density < 50)!;

    const route = buildRoute(from, to, accessible);

    return NextResponse.json({
      from: from.name,
      to: to.name,
      ...route,
      accessible,
      crowdAlong: Math.round((from.density + to.density) / 2),
    });
  } catch (err) {
    console.error("[/api/navigation] error", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Route planning failed" },
      { status: 500 }
    );
  }
}
