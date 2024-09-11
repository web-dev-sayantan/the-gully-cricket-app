import { db } from "@/db";
import { balls } from "@/db/schema";
import { NewBall } from "@/db/types";
import { eq } from "drizzle-orm";

export async function createNewBallAction({
  inningsId,
  strikerId,
  nonStrikerId,
  bowlerId,
  ballNumber,
  runsScored,
  isWicket,
  wicketType,
  assistPlayerId,
  isWide,
  isNoBall,
  isBye,
  isLegBye,
}: NewBall) {
  const newBall = await db
    .insert(balls)
    .values({
      inningsId,
      strikerId,
      nonStrikerId,
      bowlerId,
      ballNumber,
      runsScored,
      isWicket,
      wicketType,
      assistPlayerId,
      isWide,
      isNoBall,
      isBye,
      isLegBye,
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
  isWicket = false,
  wicketType,
  assistPlayerId,
  dismissedPlayerId,
  isBye = false,
  isLegBye = false,
  isWide = false,
  isNoBall = false,
}: NewBall) {
  if (!id) {
    throw new Error("Ball id is required");
  }
  // Update the current ball
  const updatedBall = await db
    .update(balls)
    .set({
      ballNumber,
      strikerId,
      nonStrikerId,
      bowlerId,
      runsScored,
      isWicket,
      wicketType,
      assistPlayerId,
      dismissedPlayerId,
      isNoBall,
      isWide,
      isBye,
      isLegBye,
    })
    .where(eq(balls.id, id))
    .returning();
  if (updatedBall.length === 0) return null;
  return updatedBall[0].id;
}
