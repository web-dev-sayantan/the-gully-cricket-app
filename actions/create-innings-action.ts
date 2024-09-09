import { db } from "@/db";
import { innings } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function createInningsAction({
  matchId,
  battingTeamId,
  wickets = 0,
  balls = 0,
  extras = 0,
  totalScore = 0,
}: {
  matchId: number;
  battingTeamId: number;
  wickets: number;
  balls: number;
  extras: number;
  totalScore: number;
}) {
  const newInnings = await db.insert(innings).values({
    matchId,
    battingTeamId,
    wickets,
    balls,
    extras,
    totalScore,
  });
  return newInnings.lastInsertRowid;
}

export async function updateInningsAction({
  id,
  wickets = 0,
  balls = 0,
  extras = 0,
  totalScore = 0,
}: {
  id: number;
  wickets: number;
  balls: number;
  extras: number;
  totalScore: number;
}) {
  const newInnings = await db
    .update(innings)
    .set({
      id,
      wickets,
      balls,
      extras,
      totalScore,
    })
    .where(eq(innings.id, id))
    .returning();
  return newInnings[0];
}
