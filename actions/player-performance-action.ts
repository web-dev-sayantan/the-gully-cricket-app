import "server-only";
import { db } from "@/db";
import { playerMatchPerformance } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { NewPlayerMatchPerformance } from "@/db/types";
export async function createPlayerPerformanceAction({
  matchId,
  playerId,
  teamId,
}: NewPlayerMatchPerformance) {
  await db.insert(playerMatchPerformance).values({
    matchId,
    playerId,
    teamId,
  });
}

export async function updatePlayerPerformanceAction(
  playerMatchPerformanceStats: NewPlayerMatchPerformance
) {
  await db
    .update(playerMatchPerformance)
    .set(playerMatchPerformanceStats)
    .where(
      and(
        eq(
          playerMatchPerformance.playerId,
          playerMatchPerformanceStats.playerId
        ),
        eq(playerMatchPerformance.matchId, playerMatchPerformanceStats.matchId)
      )
    );
}
