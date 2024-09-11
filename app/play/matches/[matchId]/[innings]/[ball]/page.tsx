import { redirect } from "next/navigation";
import Refresh from "@/app/play/matches/[matchId]/_components/refresh";
import ScoreABall from "@/components/score-a-ball";
import { Button } from "@/components/ui/button";
import { getBallById, getBallsOfSameOver } from "@/data/balls";
import { getMatchById } from "@/data/matches";
import { revalidateGivenPath, saveBallData } from "@/actions/match-actions";
import { SwordsIcon } from "lucide-react";
import { getInningsById } from "@/data/innings";

export const runtime = "edge";
export default async function BallPage({
  params: { matchId, innings: inningsId, ball: ballId },
}: {
  params: { matchId: string; innings: string; ball: string };
}) {
  const match = await getMatchById(+matchId);
  if (!match) return <div>Match not found</div>;

  let innings = await getInningsById(+inningsId);
  if (!innings) {
    redirect(`/play/matches/start-match/${matchId}`);
  }

  let ball = await getBallById(+ballId);
  if (!ball) {
    redirect(`/play/matches/${matchId}/start-match`);
  }
  let otherBalls = await getBallsOfSameOver(+inningsId, ball!.ballNumber);
  console.log(
    "otherBalls",
    otherBalls.map((b) => `${b.ballNumber}- ${b.runsScored}`)
  );

  const bowlingTeamPlayers = match.team2.teamPlayers;

  return (
    match &&
    innings && (
      <main className="flex flex-col size-full gap-3 p-4">
        <div className="flex flex-col items-center gap-2 justify-between mb-4">
          <div className="flex-center p-3 border rounded-lg w-full gap-2 bg-gradient !bg-cover">
            <h1 className="font-bold text-sm">{match.team1.name}</h1>{" "}
            <SwordsIcon />
            <h1 className=" font-bold text-sm">{match.team2.name}</h1>
          </div>
        </div>
        <div className="flex-center justify-between gap-3">
          <div className="flex items-baseline gap-x-2">
            <h1 className="text-sm font-bold text-center ">
              {match.team1.shortName}:
            </h1>
            <p className="flex items-center gap-1 text-xl">
              <span className="font-bold">{innings.totalScore}</span>
              <span> / </span>
              <span className="text-red-500 font-bold">{innings.wickets}</span>
            </p>
            <p className="flex items-baseline gap-1">
              <span className="text-muted-foreground">in</span>
              <span className="font-bold">
                {Math.floor(innings.balls / 6)}.{innings.balls % 6}
              </span>
              <span className="text-muted-foreground"> overs</span>
            </p>
          </div>
          <div className="flex-center">
            <Button size={"sm"} variant={"outline"}>
              innings
            </Button>
            <Refresh onRefresh={revalidateGivenPath} />
          </div>
        </div>
        {ball && (
          <ScoreABall
            ball={ball}
            otherBalls={otherBalls}
            innings={innings}
            bowlingTeamId={match.team2Id}
            bowlingTeamPlayers={bowlingTeamPlayers}
            onSaveBallData={saveBallData}
          ></ScoreABall>
        )}
      </main>
    )
  );
}
