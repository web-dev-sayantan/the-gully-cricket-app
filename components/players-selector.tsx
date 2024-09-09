"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function PlayerSelector({
  battingTeam,
  bowlingTeam,
  matchId,
  bowlingTeamId,
  ballNumber,
  onSelectCurrentBattersAndBowler,
}: {
  battingTeam: {
    id: number;
    teamId: number;
    playerId: number;
    isCaptain: boolean;
    player: {
      id: number;
      name: string;
    };
  }[];
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
  bowlingTeamId: number;
  ballNumber: number;
  onSelectCurrentBattersAndBowler: ({
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
  }) => Promise<void>;
}) {
  const [strikerId, setStrikerId] = useState(0);
  const [nonStrikerId, setNonStrikerId] = useState(0);
  const [bowlerId, setBowlerId] = useState(0);
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-col gap-4 p-4 border">
        <h1 className="font-bold text-center">Striker: </h1>
        <Select
          onValueChange={(value) => {
            if (+value === nonStrikerId) {
              setNonStrikerId(0);
            }
            setStrikerId(+value);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Striker" />
          </SelectTrigger>
          <SelectContent>
            {battingTeam.map(({ player }) => (
              <SelectItem key={player.id} value={`${player.id}`}>
                {player.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <h1
          className={cn("font-bold text-center", {
            "text-muted-foreground": !strikerId,
          })}
        >
          Non Striker:{" "}
        </h1>
        <Select
          disabled={!strikerId}
          onValueChange={(value) => {
            setNonStrikerId(+value);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Non Striker" />
          </SelectTrigger>
          <SelectContent>
            {battingTeam
              .filter(({ player }) => player.id !== strikerId)
              .map(({ player }) => (
                <SelectItem key={player.id} value={`${player.id}`}>
                  {player.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-4 p-4 border">
        <h1 className="font-bold text-center">Bowler: </h1>
        <Select
          onValueChange={(value) => {
            setBowlerId(+value);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Bowler" />
          </SelectTrigger>
          <SelectContent>
            {bowlingTeam.map(({ player }) => (
              <SelectItem key={player.id} value={`${player.id}`}>
                {player.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button
        className="w-full"
        disabled={!strikerId || !nonStrikerId || !bowlerId}
        onClick={() =>
          strikerId &&
          nonStrikerId &&
          bowlerId &&
          onSelectCurrentBattersAndBowler({
            matchId,
            bowlingTeamId,
            ballNumber,
            strikerId,
            nonStrikerId,
            bowlerId,
          })
        }
      >
        Start
      </Button>
    </div>
  );
}
