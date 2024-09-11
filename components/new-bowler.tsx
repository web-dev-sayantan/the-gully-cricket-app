"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export default function NewBowler({
  bowlingTeam,
  matchId,
  inningsId,
  ballNumber,
  teamId,
  nonStrikerId,
  strikerId,
  runScored,
  onSelectNewBowler,
}: {
  bowlingTeam: {
    id: number;
    teamId: number;
    playerId: number;
    isCaptain: boolean;
    player: {
      id: number;
      name: string;
    };
  }[];
  matchId: number;
  inningsId: number;
  teamId: number;
  ballNumber: number;
  runScored: number;
  nonStrikerId: number;
  strikerId: number;
  onSelectNewBowler: ({
    matchId,
    teamId,
    inningsId,
    ballNumber,
    runScored,
    strikerId,
    nonStrikerId,
    bowlerId,
  }: {
    matchId: number;
    teamId: number;
    inningsId: number;
    ballNumber: number;
    runScored: number;
    strikerId: number;
    nonStrikerId: number;
    bowlerId: number;
  }) => void;
}) {
  const [bowlerId, setBowlerId] = useState<number>(0);
  return (
    <>
      <div className="flex flex-col gap-4 p-4 border">
        <h1 className="font-bold text-center">New Bowler: </h1>
        <Select
          onValueChange={(value) => {
            setBowlerId(+value);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Bowler" />
          </SelectTrigger>
          <SelectContent>
            {bowlingTeam.map((player) => (
              <SelectItem key={player.player.id} value={`${player.player.id}`}>
                {player.player.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button
        className="w-full"
        disabled={!bowlerId}
        onClick={() =>
          bowlerId &&
          onSelectNewBowler({
            matchId,
            teamId,
            inningsId,
            ballNumber,
            runScored,
            nonStrikerId,
            strikerId,
            bowlerId,
          })
        }
      >
        Start
      </Button>
    </>
  );
}
