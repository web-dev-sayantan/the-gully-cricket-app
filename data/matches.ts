import "server-only";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { matches } from "@/db/schema";
export async function getMatchesByDate(date: Date) {
  return db.select().from(matches).where(eq(matches.matchDate, date));
}

export async function getMatchById(id: number) {
  const match = await db.query.matches.findFirst({
    where: eq(matches.id, id),
    with: {
      team_battingFirstTeamId: {
        with: {
          player_player1: true,
          player_player2: true,
          player_player3: true,
          player_player4: true,
          player_player5: true,
          player_player6: true,
          player_player7: true,
          player_player8: true,
          player_player9: true,
          player_player10: true,
          player_player11: true,
        },
      },
      team_battingSecondTeamId: {
        with: {
          player_player1: true,
          player_player2: true,
          player_player3: true,
          player_player4: true,
          player_player5: true,
          player_player6: true,
          player_player7: true,
          player_player8: true,
          player_player9: true,
          player_player10: true,
          player_player11: true,
        },
      },
      team_tossWinnerId: true,
    },
  });
  return match;
}

export async function getAllMatches() {
  const matches = await db.query.matches.findMany({
    with: {
      team_battingFirstTeamId: true,
      team_battingSecondTeamId: true,
      team_tossWinnerId: true,
    },
  });
  return matches;
}
