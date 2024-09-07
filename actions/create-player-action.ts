"use server";
import { db } from "@/db";
import { playersTable } from "@/db/schema";
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
  const result = await db.insert(playersTable).values({
    name,
    age,
    batting_stance: battingStance,
    bowling_stance: bowlingStance,
    is_wicket_keeper: !!isWicketKeeper,
  });
  if (result) {
    return result;
  } else {
    return null;
  }
}
