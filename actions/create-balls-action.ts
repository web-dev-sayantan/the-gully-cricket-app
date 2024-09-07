import { db } from "@/db";
import { balls, InsertBall } from "@/db/schema";
import { Dismissed, ExtrasType, WicketType } from "@/types";
import { eq } from "drizzle-orm";

export async function createNewBallAction({
  matchId,
  scorecardId,
  battingTeamId,
  bowlingTeamId,
  strikerId,
  nonStrikerId,
  bowlerId,
  ballNumber,
  runsScored,
  wicket,
  wicketType,
  caughtBy,
  runOutBy,
  stumpedBy,
  isExtra,
  extraType,
}: InsertBall) {
  const newBall = await db
    .insert(balls)
    .values({
      matchId,
      scorecardId,
      battingTeamId,
      bowlingTeamId,
      strikerId,
      nonStrikerId,
      bowlerId,
      ballNumber,
      runsScored,
      wicket,
      wicketType,
      caughtBy,
      runOutBy,
      stumpedBy,
      isExtra,
      extraType,
    })
    .returning({ id: balls.id });
  if (newBall.length === 0) return null;
  return newBall[0].id;
}

export async function updateBallAction({
  id,
  ballNumber = 0,
  strikerId,
  nonStrikerId,
  bowlerId,
  runsScored = 0,
  wicket = false,
  wicketType,
  caughtBy,
  runOutBy,
  stumpedBy,
  isExtra = false,
  extraType,
}: {
  id: number;
  ballNumber: number;
  strikerId: number;
  nonStrikerId: number;
  bowlerId: number;
  runsScored?: number;
  wicket?: boolean;
  wicketType?: WicketType;
  caughtBy?: number;
  runOutBy?: number;
  stumpedBy?: number;
  isExtra?: boolean;
  extraType?: ExtrasType;
}) {
  const updatedBall = await db
    .update(balls)
    .set({
      ballNumber,
      strikerId,
      nonStrikerId,
      bowlerId,
      runsScored,
      wicket,
      wicketType,
      caughtBy,
      runOutBy,
      stumpedBy,
      isExtra,
      extraType,
    })
    .where(eq(balls.id, id))
    .returning();
  if (updatedBall.length === 0) return null;
  return updatedBall[0].id;
}
