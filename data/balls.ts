import "server-only";
import { db } from "@/db";
import { and, eq, gt, gte, lte, ne } from "drizzle-orm";
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

export async function getBallsOfSameOver(
  matchId: number,
  ballNumber: number,
  battingTeamId: number,
  bowlingTeamId: number
) {
  const firstBallNumber =
    ballNumber % 6 === 0 ? ballNumber - 5 : Math.floor(ballNumber / 6) * 6 + 1;
  const lastBallNumber = Math.ceil(ballNumber / 6) * 6;
  return await db.query.balls.findMany({
    where: and(
      eq(balls.matchId, matchId),
      eq(balls.battingTeamId, battingTeamId),
      eq(balls.bowlingTeamId, bowlingTeamId),
      gte(balls.ballNumber, firstBallNumber),
      lte(balls.ballNumber, lastBallNumber)
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
