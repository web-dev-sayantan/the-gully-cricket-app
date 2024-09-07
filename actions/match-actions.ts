"use server";

import {
  createNewBallAction,
  updateBallAction,
} from "@/actions/create-balls-action";
import {
  createScorecardAction,
  updateScorecardAction,
} from "@/actions/create-scorecard-action";
import { getMatchById } from "@/data/matches";
import { ExtrasType, WicketType } from "@/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function revalidateGivenPath(path: string) {
  revalidatePath(path);
}

export async function saveBallData(
  {
    ballId,
    strikerId,
    nonStrikerId,
    bowlerId,
    ballNumber,
    runsScored,
    isExtra,
    extraType,
    wicket,
    wicketType,
  }: {
    ballId: number;
    strikerId: number;
    nonStrikerId: number;
    bowlerId: number;
    ballNumber: number;
    runsScored: number;
    isExtra: boolean;
    extraType?: ExtrasType;
    wicket: boolean;
    wicketType?: WicketType;
  },
  {
    scorecardId,
    wickets,
    balls,
    extras,
    target,
    totalScore,
    teamId,
  }: {
    scorecardId: number;
    wickets: number;
    balls: number;
    extras: number;
    target: number;
    totalScore: number;
    teamId: number;
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

  // Update the current ball
  await updateBallAction({
    id: ballId,
    ballNumber,
    strikerId,
    nonStrikerId,
    bowlerId,
    runsScored,
    isExtra,
    extraType,
    wicket,
    wicketType,
  });

  // Update the scorecard
  const scoreCardData = await updateScorecardAction({
    id: scorecardId,
    wickets: wicket ? wickets + 1 : wickets,
    balls: isExtra ? balls : balls + 1,
    extras: isExtra ? extras + 1 : extras,
    target: target,
    totalScore: totalScore + runsScored + (isExtra ? 1 : 0),
  });

  // Create a new ball
  const newBallId = await createNewBallAction({
    matchId,
    scorecardId,
    battingTeamId: teamId,
    bowlingTeamId,
    ballNumber: isExtra ? ballNumber : ballNumber + 1,
    strikerId: runsScored % 2 === 1 ? nonStrikerId : strikerId,
    nonStrikerId: runsScored % 2 === 1 ? strikerId : nonStrikerId,
    bowlerId,
  });

  const path = `/play/matches/${matchId}/${scoreCardData.id}/${newBallId}`;
  revalidatePath(path);
  redirect(path);
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
  console.log("matchId", matchId);
  console.log("ballNumber", ballNumber);
  console.log("strikerId", strikerId);
  console.log("nonStrikerId", nonStrikerId);
  console.log("bowlerId", bowlerId);
  // Find the match
  const match = await getMatchById(matchId);
  if (!match) {
    throw new Error("Match not found");
  }

  // Create a new scorecard for the match
  const scorecardId = await createScorecardAction({
    matchId: +matchId,
    teamId: match.team_battingFirstTeamId.id,
    wickets: 0,
    balls: 0,
    extras: 0,
    target: 0,
    totalScore: 0,
  });
  if (!scorecardId) {
    throw new Error("Scorecard not created");
  }

  // Create a new ball
  const ballId = await createNewBallAction({
    matchId: +matchId,
    scorecardId: scorecardId as unknown as number,
    battingTeamId: match.team_battingFirstTeamId.id,
    bowlingTeamId: bowlingTeamId,
    ballNumber: ballNumber,
    strikerId,
    nonStrikerId,
    bowlerId,
  });
  revalidatePath(`/play/matches/${matchId}`);
  redirect(`/play/matches/${matchId}/${scorecardId}/${ballId}`);
}
