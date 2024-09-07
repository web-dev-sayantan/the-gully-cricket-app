import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getAllMatches } from "@/data/matches";
import Link from "next/link";

export default async function MatchesPage() {
  const matches = await getAllMatches();
  return (
    <div className="w-full flex flex-col gap-y-4 p-4">
      <h1 className="text-2xl text-center">Matches</h1>
      <Separator />
      {matches.map((match) => (
        <div
          className="w-full flex flex-col gap-4 items-center justify-center p-2 rounded-md border "
          key={match.id}
        >
          <h1 className="text-xl font-bold">Match {match.id} :</h1>
          <div className="flex-center flex-wrap gap-2">
            <p className="font-bold">{match.team_battingFirstTeamId.name}</p>
            <p className="text-muted-foreground">vs</p>
            <p className="font-bold">{match.team_battingSecondTeamId.name}</p>
          </div>
          <Link
            href={`/play/matches/${match.id}/start-match`}
            className="w-full"
          >
            <Button className="w-full" size={"sm"}>
              Start Match
            </Button>
          </Link>
        </div>
      ))}
    </div>
  );
}
