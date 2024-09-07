"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Player } from "@/db/schema";
import { useState } from "react";

export default function PlayerSelector({
  battingTeam,
  bowlingTeam,
  matchId,
  bowlingTeamId,
  ballNumber,
  onSelectCurrentBattersAndBowler,
}: {
  battingTeam: Player[];
  bowlingTeam: Player[];
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
  const [striker, setStriker] = useState<Player>();
  const [nonStriker, setNonStriker] = useState<Player>();
  const [bowler, setBowler] = useState<Player>();
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-col gap-4 p-4 border">
        <h1 className="font-bold text-center">Striker: </h1>
        <Select
          onValueChange={(value) => {
            setStriker(battingTeam.find((player) => player.id === +value));
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Striker" />
          </SelectTrigger>
          <SelectContent>
            {battingTeam.map((player) => (
              <SelectItem key={player.id} value={`${player.id}`}>
                {player.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <h1 className="font-bold text-center">Non Striker: </h1>
        <Select
          onValueChange={(value) => {
            setNonStriker(battingTeam.find((player) => player.id === +value));
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Non Striker" />
          </SelectTrigger>
          <SelectContent>
            {battingTeam.map((player) => (
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
            setBowler(bowlingTeam.find((player) => player.id === +value));
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Bowler" />
          </SelectTrigger>
          <SelectContent>
            {bowlingTeam.map((player) => (
              <SelectItem key={player.id} value={`${player.id}`}>
                {player.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button
        className="w-full"
        disabled={!striker || !nonStriker || !bowler}
        onClick={() =>
          striker &&
          nonStriker &&
          bowler &&
          onSelectCurrentBattersAndBowler({
            matchId,
            bowlingTeamId,
            ballNumber,
            strikerId: striker.id,
            nonStrikerId: nonStriker.id,
            bowlerId: bowler.id,
          })
        }
      >
        Start
      </Button>
    </div>
  );
}
