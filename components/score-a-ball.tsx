"use client";

import { MinusIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";

import { cn, getFirstName } from "@/lib/utils";
import { BallWithPlayers } from "@/data/balls";
import { Dismissed, TeamPlayerType, WicketType } from "@/types";
import { useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Innings, NewBall } from "@/db/types";

function ScoreABall({
  ball,
  otherBalls,
  innings,
  bowlingTeamId,
  bowlingTeamPlayers,
  onSaveBallData,
}: {
  ball: BallWithPlayers;
  otherBalls: BallWithPlayers[];
  innings: Innings;
  bowlingTeamPlayers: TeamPlayerType[];
  bowlingTeamId: number;
  onSaveBallData: (
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
  ) => Promise<void>;
}) {
  const [run, setRun] = useState(ball.runsScored);
  const [dismissed, setDismissed] = useState<Dismissed>();
  const [wide, setWide] = useState(ball.isWide);
  const [noBall, setNoBall] = useState(ball.isNoBall);
  const [batsman, setBatsman] = useState(ball.striker);
  const [dismissedBy, setDismissedBy] = useState<number | undefined | null>(
    null
  );
  const [batterDismissed, setBatterDismissed] = useState<
    number | undefined | null
  >(null);
  const ballScore = useMemo(
    () => run + (wide || noBall ? 1 : 0),
    [run, wide, noBall]
  );
  const dismissedbyLabel = useMemo(
    () =>
      dismissed
        ? getFirstName(
            bowlingTeamPlayers.find(({ player }) => player.id === dismissedBy)
              ?.player.name
          )
        : undefined,
    [bowlingTeamPlayers, dismissed, dismissedBy]
  );
  const wicketLabel: Record<string, string> = {
    "run out": "R.O",
    caught: "W",
    stumped: "W",
    bold: "W",
    "boundary out": "W",
  };
  function handleWide() {
    setWide(!wide);
  }
  function handleNo() {
    setNoBall(!noBall);
  }

  function handleBoldOut() {
    if (dismissed?.type === "bold") {
      setDismissed(undefined);
      setDismissedBy(undefined);
      setBatterDismissed(undefined);
    } else {
      setDismissed({ value: true, type: "bold" });
      setDismissedBy(undefined);
      setBatterDismissed(ball.strikerId);
      setRun(0);
      if (wide) {
        setWide(false);
      }
      if (noBall) {
        setNoBall(false);
      }
    }
  }

  function handleBoundaryOut() {
    if (dismissed?.value && dismissed.type === "boundary out") {
      setDismissed(undefined);
      setDismissedBy(undefined);
      setBatterDismissed(undefined);
    } else {
      setDismissed({ value: true, type: "boundary out" });
      setBatterDismissed(ball.strikerId);
      setRun(0);
      if (wide) {
        setWide(false);
      }
      if (noBall) {
        setNoBall(false);
      }
    }
  }

  function handleOtherDismissals() {
    if (dismissed?.value) {
      setDismissed(undefined);
      setDismissedBy(undefined);
      setBatterDismissed(undefined);
    }
  }
  function saveDismissal(type: WicketType) {
    setDismissed({
      value: true,
      type,
    });
    if (type !== "run out") {
      setBatterDismissed(ball.strikerId);
      setRun(0);
      if (type !== "stumped") {
        if (wide) {
          setWide(false);
        }
      }
      if (noBall) {
        setNoBall(false);
      }
    }
  }

  function handleNext() {
    onSaveBallData(
      {
        id: ball.id,
        inningsId: innings.id,
        strikerId: batsman.id,
        nonStrikerId:
          batsman.id === ball.striker.id ? ball.nonStriker.id : batsman.id,
        runsScored: run,
        isWide: wide,
        isNoBall: noBall,
        isWicket: dismissed ? dismissed.value : false,
        wicketType: dismissed && dismissed.value ? dismissed.type : undefined,
        assistPlayerId: dismissedBy ? dismissedBy : undefined,
        dismissedPlayerId: batterDismissed ? batterDismissed : undefined,
        ballNumber: ball.ballNumber,
        bowlerId: ball.bowlerId,
      },
      {
        inningsId: innings.id,
        balls: innings.balls,
        wickets: innings.wickets,
        extras: innings.extras,
        totalScore: innings.totalScore,
      },
      {
        matchId: innings.matchId,
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
            onClick={() => setBatsman(ball.striker)}
            variant={batsman.id === ball.striker.id ? "gradient" : "secondary"}
          >
            <span className="overflow-ellipsis">{ball.striker.name}</span>
          </Button>
        </div>
        <div className="flex flex-1">
          <Button
            className="w-full"
            onClick={() => setBatsman(ball.nonStriker)}
            variant={batsman.id === ball.nonStrikerId ? "default" : "secondary"}
          >
            {ball.nonStriker.name}
          </Button>
        </div>
      </div>
      <div className="flex-y-center gap-2">
        <h1 className="font-bold">{ball.bowler.name} : </h1>
        <div className="flex-y-center gap-2">
          {otherBalls.map((b) => (
            <div
              key={b.id}
              className={cn(
                "flex-center items-baseline px-2 py-1 rounded-lg bg-secondary",
                {
                  "animate-pulse": b.id === ball.id,
                }
              )}
            >
              {b.isWicket && b.wicketType
                ? wicketLabel[b.wicketType]
                : b.runsScored}
              <span className="text-muted-foreground text-sm">
                {b.isWide ? "wd" : ""}
                {b.isNoBall ? "nb" : ""}
              </span>
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
            variant={wide ? "default" : "secondary"}
          >
            Wide
          </Button>
          <Button
            size={"lg"}
            className="flex-1"
            onClick={handleNo}
            variant={noBall ? "default" : "secondary"}
          >
            No Ball
          </Button>
        </div>
      </div>
      <Separator className="my-2" />
      <div className="flex flex-col gap-4">
        <h1 className="text-lg font-bold flex items-baseline justify-between">
          Dismissed:
          <span className="text-muted-foreground font-normal text-sm capitalize">
            {dismissedbyLabel && dismissed?.value
              ? `${dismissed.type} by `
              : ""}{" "}
            {dismissedbyLabel}
          </span>
        </h1>
        <div className="flex gap-4 items-center justify-center w-full">
          <Button
            size={"lg"}
            className="flex-1"
            variant={
              dismissed && dismissed.type === "bold"
                ? "destructive"
                : "secondary"
            }
            onClick={handleBoldOut}
          >
            Bold
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                size={"lg"}
                className="flex-1"
                variant={
                  dismissed && dismissed.type === "caught"
                    ? "destructive"
                    : "secondary"
                }
                onClick={handleOtherDismissals}
              >
                Caught
              </Button>
            </SheetTrigger>
            <SheetContent side={"bottom"}>
              <SheetHeader>
                <h1 className="font-bold">Caught By</h1>
              </SheetHeader>
              <div className="flex flex-col py-4">
                <Select
                  onValueChange={(value) => {
                    setDismissedBy(+value);
                  }}
                  value={dismissedBy?.toString() || ""}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Catcher" />
                  </SelectTrigger>
                  <SelectContent>
                    {bowlingTeamPlayers.map(({ player }) => (
                      <SelectItem key={player.id} value={`${player.id}`}>
                        {player.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button onClick={saveDismissal.bind(null, "caught")}>
                    Save
                  </Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
        <div className="flex gap-4 items-center justify-center w-full">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                className="flex-1"
                variant={
                  dismissed && dismissed.type === "run out"
                    ? "destructive"
                    : "secondary"
                }
                onClick={handleOtherDismissals}
              >
                Run Out
              </Button>
            </SheetTrigger>
            <SheetContent side={"bottom"}>
              <SheetHeader>
                <h1 className="font-bold">Run Out Details</h1>
              </SheetHeader>
              <div className="flex flex-col gap-8 py-4">
                <Select
                  onValueChange={(value) => {
                    setBatterDismissed(+value);
                  }}
                  defaultValue={ball.strikerId.toString()}
                  value={batterDismissed?.toString() || ""}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Who got out" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      key={ball.strikerId}
                      value={`${ball.strikerId}`}
                    >
                      {ball.striker.name}
                    </SelectItem>
                    <SelectItem
                      key={ball.nonStrikerId}
                      value={`${ball.nonStrikerId}`}
                    >
                      {ball.nonStriker.name}
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  onValueChange={(value) => {
                    setDismissedBy(+value);
                  }}
                  value={dismissedBy?.toString() || ""}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Fielder" />
                  </SelectTrigger>
                  <SelectContent>
                    {bowlingTeamPlayers.map(({ player }) => (
                      <SelectItem key={player.id} value={`${player.id}`}>
                        {player.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button onClick={saveDismissal.bind(null, "run out")}>
                    Save
                  </Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
          <Button
            className="flex-1"
            variant={
              dismissed && dismissed.type === "boundary out"
                ? "destructive"
                : "secondary"
            }
            onClick={handleBoundaryOut}
          >
            Boundary Out
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                className="flex-1"
                variant={
                  dismissed && dismissed.type === "stumped"
                    ? "destructive"
                    : "secondary"
                }
                onClick={handleOtherDismissals}
              >
                Stumped
              </Button>
            </SheetTrigger>
            <SheetContent side={"bottom"}>
              <SheetHeader>
                <h1 className="font-bold">Stumped By</h1>
              </SheetHeader>
              <div className="flex flex-col py-4">
                <Select
                  onValueChange={(value) => {
                    setDismissedBy(+value);
                  }}
                  value={dismissedBy?.toString() || ""}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Player" />
                  </SelectTrigger>
                  <SelectContent>
                    {bowlingTeamPlayers.map(({ player }) => (
                      <SelectItem key={player.id} value={`${player.id}`}>
                        {player.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button onClick={saveDismissal.bind(null, "stumped")}>
                    Save
                  </Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <Separator className="my-1" />
      <div className="flex gap-4">
        <Button variant={"destructive"}>Clear</Button>
        <Button className="flex-1" onClick={handleNext}>
          Next Ball
        </Button>
      </div>
    </section>
  );
}

export default ScoreABall;
