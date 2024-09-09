import "server-only";
import { db } from "@/db";
import { and, eq, gt, gte, lte, ne } from "drizzle-orm";
import { balls } from "@/db/schema";
import { Ball, Player } from "@/db/types";

export async function getBallById(id: number) {
  return await db.query.balls.findFirst({
    where: eq(balls.id, id),
    with: {
      striker: true,
      nonStriker: true,
      bowler: true,
    },
  });
}

export async function getBallByMatchAndTeamAndBallNumber(
  inningsId: number,
  ballNumber: number
) {
  return await db.query.balls.findFirst({
    where: and(
      eq(balls.inningsId, inningsId),
      eq(balls.ballNumber, ballNumber)
    ),
    with: {
      striker: true,
      nonStriker: true,
      bowler: true,
    },
  });
}

export async function getBallsOfSameOver(
  inningsId: number,
  ballNumber: number
) {
  const firstBallNumber =
    ballNumber % 6 === 0 ? ballNumber - 5 : Math.floor(ballNumber / 6) * 6 + 1;
  const lastBallNumber = Math.ceil(ballNumber / 6) * 6;
  return await db.query.balls.findMany({
    where: and(
      eq(balls.inningsId, inningsId),
      gte(balls.ballNumber, firstBallNumber),
      lte(balls.ballNumber, lastBallNumber)
    ),
    with: {
      striker: true,
      nonStriker: true,
      bowler: true,
    },
  });
}

export type BallWithPlayers = Ball & {
  striker: Player;
  nonStriker: Player;
  bowler: Player;
};
