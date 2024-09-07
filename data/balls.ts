import "server-only";
import { db } from "@/db";
import { and, eq, gt, lte, ne } from "drizzle-orm";
import { Ball, balls, Player, scoreCard } from "@/db/schema";

export async function getBallById(id: number) {
  return await db.query.balls.findFirst({
    where: eq(balls.id, id),
    with: {
      player_strikerId: true,
      player_nonStrikerId: true,
      player_bowlerId: true,
    },
  });
}

export async function getBallByMatchAndTeamAndBallNumber(
  matchId: number,
  battingTeamId: number,
  ballNumber: number
) {
  return await db.query.balls.findFirst({
    where: and(
      eq(balls.matchId, matchId),
      eq(balls.battingTeamId, battingTeamId),
      eq(balls.ballNumber, ballNumber)
    ),
    with: {
      player_strikerId: true,
      player_nonStrikerId: true,
      player_bowlerId: true,
    },
  });
}

export async function getPreviousBallsOfSameOver(
  matchId: number,
  ballNumber: number,
  battingTeamId: number,
  bowlingTeamId: number
) {
  return await db.query.balls.findMany({
    where: and(
      eq(balls.matchId, matchId),
      eq(balls.battingTeamId, battingTeamId),
      eq(balls.bowlingTeamId, bowlingTeamId),
      gt(balls.ballNumber, ballNumber - (ballNumber % 6)),
      lte(balls.ballNumber, Math.ceil(ballNumber / 6) * 6)
    ),
    with: {
      player_strikerId: true,
      player_nonStrikerId: true,
      player_bowlerId: true,
    },
  });
}

export type BallWithPlayers = Ball & {
  player_strikerId: Player;
  player_nonStrikerId: Player;
  player_bowlerId: Player;
};
