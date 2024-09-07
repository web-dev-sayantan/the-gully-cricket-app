import { db } from "@/db";
import { scoreCard } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function createScorecardAction({
  matchId,
  teamId,
  wickets = 0,
  balls = 0,
  extras = 0,
  target = 0,
  totalScore = 0,
}: {
  matchId: number;
  teamId: number;
  wickets: number;
  balls: number;
  extras: number;
  target: number;
  totalScore: number;
}) {
  const newScorecard = await db.insert(scoreCard).values({
    matchId,
    teamId,
    wickets,
    balls,
    extras,
    target,
    totalScore,
  });
  return newScorecard.lastInsertRowid;
}

export async function updateScorecardAction({
  id,
  wickets = 0,
  balls = 0,
  extras = 0,
  target = 0,
  totalScore = 0,
}: {
  id: number;
  wickets: number;
  balls: number;
  extras: number;
  target: number;
  totalScore: number;
}) {
  const newScorecard = await db
    .update(scoreCard)
    .set({
      id,
      wickets,
      balls,
      extras,
      target,
      totalScore,
    })
    .where(eq(scoreCard.id, id))
    .returning();
  return newScorecard[0];
}
