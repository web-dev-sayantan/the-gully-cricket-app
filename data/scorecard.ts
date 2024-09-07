import "server-only";
import { db } from "@/db";
import { scoreCard } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export function getScorecardById(id: number) {
  return db.query.scoreCard.findFirst({
    where: eq(scoreCard.id, id),
    with: {
      team: {
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
    },
  });
}
export function getScorecardByMatchId(id: number) {
  return db.query.scoreCard.findMany({
    where: eq(scoreCard.matchId, id),
  });
}

export function getScoreCardByMatchIdAndTeamId(
  matchId: number,
  teamId?: number
) {
  if (!teamId) return;
  return db.query.scoreCard.findFirst({
    where: and(eq(scoreCard.matchId, matchId), eq(scoreCard.teamId, teamId)),
    with: {
      team: {
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
    },
  });
}
