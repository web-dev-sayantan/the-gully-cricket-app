"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { BallWithPlayers } from "@/data/balls";
import { ScoreCard } from "@/db/schema";
import { cn } from "@/lib/utils";
import { Dismissed, Extras, ExtrasType, WicketType } from "@/types";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useMemo, useState } from "react";

function ScoreABall({
  ball,
  otherBalls,
  scorecard,
  bowlingTeamId,
  onSaveBallData,
}: {
  ball: BallWithPlayers;
  otherBalls: BallWithPlayers[];
  scorecard: ScoreCard;
  bowlingTeamId: number;
  onSaveBallData: (
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
  ) => Promise<void>;
}) {
  const [run, setRun] = useState(ball.runsScored);
  const [dismissed, setDismissed] = useState<Dismissed>();
  const [extra, setExtra] = useState<Extras | null>(
    ball.isExtra ? { value: true, type: ball.extraType as ExtrasType } : null
  );
  const [batsman, setBatsman] = useState(ball.player_strikerId);
  const ballScore = useMemo(() => run + (extra?.value ? 1 : 0), [run, extra]);
  function handleWide() {
    if (extra?.type === "wide") {
      setExtra(null);
    } else {
      setExtra({ value: true, type: "wide" });
    }
  }
  function handleNo() {
    if (extra?.type === "no") {
      setExtra(null);
    } else {
      setExtra({ value: true, type: "no" });
      if (dismissed?.value && dismissed.type !== "run out")
        setDismissed(undefined);
    }
  }

  function handleRegDismissal(type: "bold" | "caught") {
    if (dismissed?.type === type) {
      setDismissed(undefined);
    } else {
      setDismissed({ value: true, type });
      setRun(0);
      if (extra?.value) setExtra(null);
    }
  }
  function handleStumped() {
    if (dismissed?.type === "stumped") {
      setDismissed(undefined);
    } else {
      setDismissed({ value: true, type: "stumped" });
      setRun(0);
      if (extra?.value && extra?.type !== "no") setExtra(null);
    }
  }

  function handleNext() {
    onSaveBallData(
      {
        ballId: ball.id,
        strikerId: batsman.id,
        nonStrikerId:
          batsman.id === ball.player_strikerId.id
            ? ball.player_nonStrikerId.id
            : batsman.id,
        runsScored: run,
        isExtra: extra && extra.value ? extra.value : false,
        extraType: extra && extra.value ? extra.type : undefined,
        wicket: dismissed ? dismissed.value : false,
        wicketType: dismissed && dismissed.value ? dismissed.type : undefined,
        ballNumber: ball.ballNumber,
        bowlerId: ball.bowlerId,
      },
      {
        scorecardId: scorecard.id,
        balls: scorecard.balls,
        wickets: scorecard.wickets,
        extras: scorecard.extras,
        target: scorecard.target,
        totalScore: scorecard.totalScore,
        teamId: scorecard.teamId,
      },
      {
        matchId: scorecard.matchId,
        bowlingTeamId,
      }
    );
  }

  return (
    <section className="flex flex-col size-full gap-3">
      <div className="flex-y-center justify-center gap-4 w-full">
        <div className="flex flex-1">
          <Button
            className="w-full"
            onClick={() => setBatsman(ball.player_strikerId)}
            variant={
              batsman.id === ball.player_strikerId.id ? "default" : "secondary"
            }
          >
            <span className="overflow-ellipsis">
              {ball.player_strikerId.name}
            </span>
          </Button>
        </div>
        <div className="flex flex-1">
          <Button
            className="w-full"
            onClick={() => setBatsman(ball.player_nonStrikerId)}
            variant={
              batsman.id === ball.player_nonStrikerId.id
                ? "default"
                : "secondary"
            }
          >
            {ball.player_nonStrikerId.name}
          </Button>
        </div>
      </div>
      <div className="flex-y-center gap-2">
        <h1 className="font-bold">{ball.player_bowlerId.name} : </h1>
        <div className="flex-y-center gap-2">
          {otherBalls.map((b) => (
            <div
              key={b.id}
              className={cn("flex-center px-2 py-1 rounded-lg bg-secondary", {
                "animate-pulse": b.id === ball.id,
              })}
            >
              {b.runsScored}
            </div>
          ))}
        </div>
      </div>
      <div className="flex-y-center gap-4">
        <Input
          className="w-full h-[6rem] text-4xl font-bold"
          type="number"
          onChange={(e) => {
            setRun(Number(e.target.value));
          }}
          value={ballScore}
          max={7}
          min={0}
        />
        <div className="flex flex-col gap-2">
          <Button
            size={"lg"}
            variant={run > 0 ? "default" : "secondary"}
            onClick={() => run > 0 && setRun(run - 1)}
          >
            <MinusIcon />
          </Button>
          <Button
            size={"lg"}
            variant={run < 7 ? "default" : "secondary"}
            onClick={() => run < 8 && setRun(run + 1)}
          >
            <PlusIcon />
          </Button>
        </div>
      </div>
      <Separator className="mt-1" />
      <div className="flex flex-col gap-4 w-full">
        <div className="flex gap-4 items-center justify-center w-full">
          <Button
            size={"squareLg"}
            className="flex-1"
            onClick={() => setRun(0)}
            variant={run === 0 ? "default" : "secondary"}
          >
            0
          </Button>
          <Button
            size={"squareLg"}
            className="flex-1"
            onClick={() => setRun(1)}
            variant={run === 1 ? "default" : "secondary"}
          >
            1
          </Button>
          <Button
            size={"squareLg"}
            className="flex-1"
            onClick={() => setRun(4)}
            variant={run === 4 ? "default" : "secondary"}
          >
            4
          </Button>
          <Button
            size={"squareLg"}
            className="flex-1"
            onClick={() => setRun(6)}
            variant={run === 6 ? "default" : "secondary"}
          >
            6
          </Button>
        </div>
      </div>
      <Separator className="my-1" />
      <div className="flex flex-col gap-2">
        <h1 className="text-lg font-bold">Extras: </h1>
        <div className="flex gap-4 items-center justify-center w-full">
          <Button
            size={"lg"}
            className="flex-1"
            onClick={handleWide}
            variant={
              extra && extra.value === true && extra.type === "wide"
                ? "default"
                : "secondary"
            }
          >
            Wide
          </Button>
          <Button
            size={"lg"}
            className="flex-1"
            onClick={handleNo}
            variant={
              extra && extra.value === true && extra.type === "no"
                ? "default"
                : "secondary"
            }
          >
            No Ball
          </Button>
        </div>
      </div>
      <Separator className="my-2" />
      <div className="flex flex-col gap-4">
        <h1 className="text-lg font-bold ">Dismissed: </h1>
        <div className="flex gap-4 items-center justify-center w-full">
          <Button
            size={"lg"}
            className="flex-1"
            variant={
              dismissed && dismissed.type === "bold"
                ? "destructive"
                : "secondary"
            }
            onClick={handleRegDismissal.bind(null, "bold")}
          >
            Bold
          </Button>
          <Button
            size={"lg"}
            className="flex-1"
            variant={
              dismissed && dismissed.type === "caught"
                ? "destructive"
                : "secondary"
            }
            onClick={handleRegDismissal.bind(null, "caught")}
          >
            Caught
          </Button>
        </div>
        <div className="flex gap-4 items-center justify-center w-full">
          <Button
            className="flex-1"
            variant={
              dismissed && dismissed.type === "run out"
                ? "destructive"
                : "secondary"
            }
            onClick={() => {
              dismissed && dismissed.type === "run out"
                ? setDismissed(undefined)
                : setDismissed({
                    value: true,
                    type: "run out",
                  });
            }}
          >
            Run Out
          </Button>
          <Button
            className="flex-1"
            variant={
              dismissed && dismissed.type === "boundary out"
                ? "destructive"
                : "secondary"
            }
            onClick={() => {
              dismissed && dismissed.type === "boundary out"
                ? setDismissed(undefined)
                : setDismissed({
                    value: true,
                    type: "boundary out",
                  });
            }}
          >
            Boundary Out
          </Button>
          <Button
            className="flex-1"
            variant={
              dismissed && dismissed.type === "stumped"
                ? "destructive"
                : "secondary"
            }
            onClick={handleStumped}
          >
            Stumped
          </Button>
        </div>
      </div>
      <Separator className="my-1" />
      <div className="flex gap-4">
        <Button variant={"destructive"}>Clear</Button>
        <Button className="flex-1" onClick={handleNext}>
          Next
        </Button>
      </div>
    </section>
  );
}

export default ScoreABall;
