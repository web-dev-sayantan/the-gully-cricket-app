import { db } from "@/db";
import { teamsTable } from "@/db/schema";

export async function createTeamAction({
  name,
  shortName,
  captain,
}: {
  name: string;
  shortName: string;
  captain: number;
}) {
  const result = await db.insert(teamsTable).values({
    name,
    short_name: shortName,
    captain,
    player_1: captain,
    player_2: captain + 1,
    player_3: captain + 2,
    player_4: captain + 3,
    player_5: captain + 4,
    player_6: captain + 5,
    player_7: captain + 6,
    player_8: captain + 7,
  });
  if (result) {
    return result;
  } else {
    return null;
  }
}
