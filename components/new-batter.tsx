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

export default function NewBatter({
  battingTeam,
  matchId,
  inningsId,
  ballNumber,
  nonStrikerId,
  bowlerId,
  isExtra,
  onSelectNewBatter,
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
  matchId: number;
  inningsId: number;
  ballNumber: number;
  nonStrikerId: number;
  bowlerId: number;
  isExtra: boolean;
  onSelectNewBatter: ({
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
  }) => void;
}) {
  const [strikerId, setStrikerId] = useState(0);
  return (
    <>
      <div className="flex flex-col gap-4 p-4 border">
        <h1 className="font-bold text-center">New Batsman: </h1>
        <Select
          onValueChange={(value) => {
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
      </div>
      <Button
        className="w-full"
        disabled={!strikerId}
        onClick={() =>
          strikerId &&
          onSelectNewBatter({
            matchId,
            inningsId,
            ballNumber,
            nonStrikerId,
            isExtra,
            bowlerId,
            strikerId,
          })
        }
      >
        Start
      </Button>
    </>
  );
}
