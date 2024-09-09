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
      team1: {
        with: {
          teamPlayers: {
            with: {
              player: {
                columns: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      },
      team2: {
        with: {
          teamPlayers: {
            with: {
              player: {
                columns: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      },
    },
  });
  return match;
}

export async function getAllMatches() {
  const matches = await db.query.matches.findMany({
    with: {
      team1: true,
      team2: true,
      tossWinner: true,
    },
  });
  return matches;
}
