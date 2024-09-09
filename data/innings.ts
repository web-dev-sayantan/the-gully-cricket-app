import "server-only";
import { and, eq } from "drizzle-orm";

import { db } from "@/db";
import { innings } from "@/db/schema";

export function getInningsById(id: number) {
  return db.query.innings.findFirst({
    where: eq(innings.id, id),
    with: {
      battingTeam: {
        with: {
          teamPlayers: true,
        },
      },
    },
  });
}
export function getInningsByMatchId(id: number) {
  return db.query.innings.findMany({
    where: eq(innings.matchId, id),
  });
}

export function getInningsByMatchIdAndTeamId(matchId: number, teamId?: number) {
  if (!teamId) return;
  return db.query.innings.findFirst({
    where: and(eq(innings.matchId, matchId), eq(innings.battingTeamId, teamId)),
    with: {
      battingTeam: {
        with: {
          teamPlayers: true,
        },
      },
    },
  });
}
