"use server";
import { db } from "@/db";
import { players } from "@/db/schema";
export async function createPlayerAction({
  name,
  age,
  battingStance,
  bowlingStance,
  isWicketKeeper,
}: {
  name: string;
  age: number;
  battingStance: string;
  bowlingStance: string;
  isWicketKeeper?: boolean;
}) {
  const result = await db.insert(players).values({
    name,
    age,
    battingStance,
    bowlingStance,
    isWicketKeeper: !!isWicketKeeper,
  });
  if (result) {
    return result;
  } else {
    return null;
  }
}
