import { redirect } from "next/navigation";
import Refresh from "@/app/play/matches/[matchId]/_components/refresh";
import ScoreABall from "@/components/score-a-ball";
import { Button } from "@/components/ui/button";
import { getBallById, getBallsOfSameOver } from "@/data/balls";
import { getMatchById } from "@/data/matches";
import { getScorecardById } from "@/data/scorecard";
import { revalidateGivenPath, saveBallData } from "@/actions/match-actions";

export const dynamic = "force-dynamic";
export default async function MatchPage({
  params: { matchId, scorecard: scorecardId, ball: ballId },
}: {
  params: { matchId: string; scorecard: string; ball: string };
}) {
  const match = await getMatchById(+matchId);
  if (!match) return <div>Match not found</div>;

  let scorecard = await getScorecardById(+scorecardId);
  if (!scorecard) {
    redirect(`/play/matches/${matchId}/start-match`);
  }

  let ball = await getBallById(+ballId);
  if (!ball) {
    redirect(`/play/matches/${matchId}/start-match`);
  }
  let otherBalls = await getBallsOfSameOver(
    +matchId,
    ball!.ballNumber,
    ball!.battingTeamId,
    ball!.bowlingTeamId
  );
  console.log(
    "otherBalls",
    otherBalls.map((b) => `${b.ballNumber}- ${b.runsScored}`)
  );

  return (
    match &&
    scorecard && (
      <main className="flex flex-col size-full gap-3 p-4">
        <div className="flex flex-col items-center gap-2 justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold">
              {match.team_battingFirstTeamId.name}
            </span>{" "}
            <span className="text-xs text-muted-foreground">vs</span>{" "}
            <span className="text-sm font-bold">
              {match.team_battingSecondTeamId.name}
            </span>
          </div>
        </div>
        <div className="flex-center justify-between gap-3">
          <div className="flex items-baseline gap-x-2">
            <h1 className="text-sm font-bold text-center ">
              {match.team_battingFirstTeamId.shortName}:
            </h1>
            <p className="flex items-center gap-1 text-xl">
              <span className="font-bold">{scorecard.totalScore}</span>
              <span> / </span>
              <span className="text-red-500 font-bold">
                {scorecard.wickets}
              </span>
            </p>
            <p className="flex items-baseline gap-1">
              <span className="text-muted-foreground">in</span>
              <span className="font-bold">
                {Math.floor(scorecard.balls / 6)}.{scorecard.balls % 6}
              </span>
              <span className="text-muted-foreground"> overs</span>
            </p>
          </div>
          <div className="flex-center">
            <Button size={"sm"} variant={"outline"}>
              scorecard
            </Button>
            <Refresh onRefresh={revalidateGivenPath} />
          </div>
        </div>
        {ball && (
          <ScoreABall
            ball={ball}
            otherBalls={otherBalls}
            scorecard={scorecard}
            bowlingTeamId={match.team_battingSecondTeamId.id}
            onSaveBallData={saveBallData}
          ></ScoreABall>
        )}
      </main>
    )
  );
}
