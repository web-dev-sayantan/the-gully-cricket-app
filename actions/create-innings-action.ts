import { db } from "@/db";
import { innings } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function createInningsAction({
  matchId,
  battingTeamId,
  bowlingTeamId,
  wickets = 0,
  ballsBowled = 0,
  extras = 0,
  totalScore = 0,
}: {
  matchId: number;
  battingTeamId: number;
  bowlingTeamId: number;
  wickets: number;
  ballsBowled: number;
  extras: number;
  totalScore: number;
}) {
  const newInnings = await db.insert(innings).values({
    matchId,
    battingTeamId,
    bowlingTeamId,
    wickets,
    ballsBowled,
    extras,
    totalScore,
  });
  return newInnings.lastInsertRowid;
}

export async function updateInningsAction({
  id,
  wickets = 0,
  ballsBowled = 0,
  extras = 0,
  totalScore = 0,
}: {
  id: number;
  wickets: number;
  ballsBowled: number;
  extras: number;
  totalScore: number;
}) {
  const newInnings = await db
    .update(innings)
    .set({
      id,
      wickets,
      ballsBowled,
      extras,
      totalScore,
    })
    .where(eq(innings.id, id))
    .returning();
  return newInnings[0];
}
