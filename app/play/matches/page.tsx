import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getAllMatches } from "@/data/matches";
import { SwordsIcon } from "lucide-react";
import Link from "next/link";

export default async function MatchesPage() {
  const matches = await getAllMatches();
  return (
    <div className="w-full flex flex-col gap-y-4 p-4">
      <h1 className="text-2xl text-center">Matches</h1>
      <Separator />
      {matches.map((match) => (
        <div
          className="w-full flex flex-col gap-4 items-center justify-center p-4 rounded-md border "
          key={match.id}
        >
          {/* <h1 className="text-xl font-bold">Match {match.id} :</h1> */}
          <div className="flex-center flex-col gap-2">
            <p className="font-bold">{match.team1.name}</p>
            <p className="text-muted-foreground">
              <SwordsIcon />
            </p>
            <p className="font-bold">{match.team2.name}</p>
          </div>
          <Link
            href={`/play/matches/start-match/${match.id}`}
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
