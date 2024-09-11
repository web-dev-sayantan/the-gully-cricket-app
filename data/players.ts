import "server-only";
import { db } from "@/db";
import { playerMatchPerformance, players } from "@/db/schema";
import { Player } from "@/db/types";
import { and, eq } from "drizzle-orm";

export const getAllPlayers: () => Promise<Player[]> = async () => {
  return await db.select().from(players);
};

export async function getPlayerById(id: number) {
  return await db.select().from(players).where(eq(players.id, id)).limit(1);
}

export async function getPlayerMatchPerformance(
  playerId: number,
  matchId: number
) {
  return await db
    .select()
    .from(playerMatchPerformance)
    .where(
      and(
        eq(playerMatchPerformance.playerId, playerId),
        eq(playerMatchPerformance.matchId, matchId)
      )
    )
    .limit(1);
}
