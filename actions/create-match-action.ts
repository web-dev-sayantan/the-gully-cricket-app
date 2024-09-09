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
  });

  return newMatch.rows;
}
