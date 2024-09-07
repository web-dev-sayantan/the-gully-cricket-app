import { db } from "@/db";
import { matches } from "@/db/schema";

export async function createMatchAction({
  matchDate,
  tossWinner,
  battingFirstTeam,
  battingSecondTeam,
  oversPerSide,
  maxOverPerBowler,
  winner,
  loser,
  result,
}: {
  matchDate?: Date;
  tossWinner: number;
  battingFirstTeam: number;
  battingSecondTeam: number;
  oversPerSide: number;
  maxOverPerBowler: number;
  winner?: number;
  loser?: number;
  result?: string;
}) {
  const newMatch = await db.insert(matches).values({
    matchDate: matchDate ? new Date(matchDate) : new Date(),
    tossWinnerId: tossWinner,
    battingFirstTeamId: battingFirstTeam,
    battingSecondTeamId: battingSecondTeam,
    oversPerSide,
    maxOverPerBowler: maxOverPerBowler,
    winner,
    loser,
    result,
  });

  return newMatch.rows;
}
