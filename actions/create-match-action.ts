"use server";

import { db } from "@/db";
import { matches } from "@/db/schema";

export async function createMatchAction({
  matchDate,
  tossWinnerId,
  tournamentId,
  tossDecision,
  team1Id,
  team2Id,
  oversPerSide,
  maxOverPerBowler,
  winnerId,
  result,
  ranked,
  hasLBW,
  hasBye,
  hasLegBye,
  hasBoundaryOut,
  hasSuperOver,
  venueId,
  notes,
}: {
  matchDate?: Date;
  tournamentId?: number;
  tossWinnerId: number;
  tossDecision: string;
  team1Id: number;
  team2Id: number;
  oversPerSide: number;
  maxOverPerBowler: number;
  winnerId?: number;
  result?: string;
  ranked?: boolean;
  hasLBW?: boolean;
  hasBye?: boolean;
  hasLegBye?: boolean;
  hasBoundaryOut?: boolean;
  hasSuperOver?: boolean;
  venueId?: number;
  notes?: string;
}) {
  const newMatch = await db.insert(matches).values({
    matchDate: matchDate ? new Date(matchDate) : new Date(),
    tournamentId,
    tossWinnerId,
    tossDecision,
    team1Id,
    team2Id,
    oversPerSide,
    maxOverPerBowler,
    winnerId,
    result,
    ranked,
    hasLBW: hasLBW || false,
    hasBye: hasBye || false,
    hasLegBye: hasLegBye || false,
    hasBoundaryOut: hasBoundaryOut || false,
    hasSuperOver: hasSuperOver || false,
    venueId: venueId || null,
    notes: notes || "",
    isLive: false,
  });

  return newMatch.rows;
}
