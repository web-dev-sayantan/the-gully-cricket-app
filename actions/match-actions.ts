"use server";

import {
  createNewBallAction,
  updateBallAction,
} from "@/actions/create-balls-action";
import {
  createInningsAction,
  updateInningsAction,
} from "@/actions/create-innings-action";
import { getMatchById } from "@/data/matches";
import { NewBall } from "@/db/types";
import { ExtrasType, WicketType } from "@/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function revalidateGivenPath(path: string) {
  revalidatePath(path);
}

export async function saveBallData(
  {
    id,
    strikerId,
    nonStrikerId,
    bowlerId,
    ballNumber,
    runsScored,
    isBye,
    isLegBye,
    isWide,
    isNoBall,
    isWicket,
    wicketType,
    assistPlayerId,
    dismissedPlayerId,
  }: NewBall,
  {
    inningsId,
    wickets,
    balls,
    extras,
    totalScore,
  }: {
    inningsId: number;
    wickets: number;
    balls: number;
    extras: number;
    totalScore: number;
  },
  {
    matchId,
    bowlingTeamId,
  }: {
    matchId: number;
    bowlingTeamId: number;
  }
) {
  "use server";

  if (!id) {
    throw new Error("Ball id is required");
  }
  // Update the current ball
  await updateBallAction({
    id,
    inningsId,
    ballNumber,
    strikerId,
    nonStrikerId,
    bowlerId,
    runsScored,
    isWicket,
    wicketType,
    assistPlayerId,
    dismissedPlayerId,
    isBye,
    isLegBye,
    isWide,
    isNoBall,
  });

  // Update the scorecard
  const isExtra = isWide || isNoBall;
  const inningsData = await updateInningsAction({
    id: inningsId,
    wickets: isWicket ? wickets + 1 : wickets,
    balls: isExtra ? balls : balls + 1,
    extras: isExtra ? extras + 1 : extras,
    totalScore: totalScore + (runsScored || 0) + (isExtra ? 1 : 0),
  });

  let path = `/play/matches/${matchId}/${inningsId}/${id}/new-batter`;
  if (isWicket) {
    // open new batter selection page
    revalidatePath(path);
    redirect(path);
  } else if (!isExtra && ballNumber % 6 === 0) {
    // open new bowler selection page
    path = `/play/matches/${matchId}/${inningsId}/${id}/new-bowler`;
    revalidatePath(path);
    redirect(path);
  } else {
    // Create a new ball
    const newBallId = await createNewBallAction({
      inningsId,
      ballNumber: isExtra ? ballNumber : ballNumber + 1,
      strikerId: runsScored! % 2 === 1 ? nonStrikerId : strikerId,
      nonStrikerId: runsScored! % 2 === 1 ? strikerId : nonStrikerId,
      bowlerId,
    });

    path = `/play/matches/${matchId}/${inningsData.id}/${newBallId}`;
    revalidatePath(path);
    redirect(path);
  }
}

export async function onSelectCurrentBattersAndBowler({
  matchId,
  bowlingTeamId,
  ballNumber,
  strikerId,
  nonStrikerId,
  bowlerId,
}: {
  matchId: number;
  bowlingTeamId: number;
  ballNumber: number;
  strikerId: number;
  nonStrikerId: number;
  bowlerId: number;
}) {
  "use server";
  // Find the match
  const match = await getMatchById(matchId);
  if (!match) {
    throw new Error("Match not found");
  }

  // Create a new scorecard for the match
  const inningsId = await createInningsAction({
    matchId: +matchId,
    battingTeamId: match.team1Id,
    wickets: 0,
    balls: 0,
    extras: 0,
    totalScore: 0,
  });
  if (!inningsId) {
    throw new Error("Scorecard not created");
  }

  // Create a new ball
  const ballId = await createNewBallAction({
    inningsId: inningsId as unknown as number,
    ballNumber: ballNumber,
    strikerId,
    nonStrikerId,
    bowlerId,
  });
  revalidatePath(`/play/matches/${matchId}`);
  redirect(`/play/matches/${matchId}/${inningsId}/${ballId}`);
}

export async function onSelectNewBatter({
  matchId,
  inningsId,
  isExtra,
  ballNumber,
  strikerId,
  nonStrikerId,
  bowlerId,
}: {
  matchId: number;
  inningsId: number;
  ballNumber: number;
  isExtra: boolean;
  strikerId: number;
  nonStrikerId: number;
  bowlerId: number;
}) {
  "use server";

  // Create a new ball
  const ballId = await createNewBallAction({
    inningsId,
    ballNumber: isExtra ? ballNumber : ballNumber + 1,
    strikerId,
    nonStrikerId,
    bowlerId,
  });
  if (isExtra || ballNumber % 6 !== 0) {
    revalidatePath(`/play/matches/${matchId}/${inningsId}/${ballId}`);
    redirect(`/play/matches/${matchId}/${inningsId}/${ballId}`);
  } else {
    redirect(`/play/matches/${matchId}/${inningsId}/${ballId}/new-bowler`);
  }
}

export async function onSelectNewBowler({
  matchId,
  inningsId,
  ballNumber,
  runScored,
  strikerId,
  nonStrikerId,
  bowlerId,
}: {
  matchId: number;
  inningsId: number;
  ballNumber: number;
  runScored: number;
  strikerId: number;
  nonStrikerId: number;
  bowlerId: number;
}) {
  "use server";

  // Create a new ball
  const ballId = await createNewBallAction({
    inningsId,
    ballNumber: ballNumber + 1,
    strikerId: runScored % 2 === 1 ? strikerId : nonStrikerId,
    nonStrikerId: runScored % 2 === 1 ? nonStrikerId : strikerId,
    bowlerId,
  });
  revalidatePath(`/play/matches/${matchId}/${inningsId}/${ballId}`);
  redirect(`/play/matches/${matchId}/${inningsId}/${ballId}`);
}
