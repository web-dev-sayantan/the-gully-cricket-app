import { ScoreText } from "@/components/score-text";
import {
  getInningsByMatchId,
  getInningsByMatchIdAndTeamId,
} from "@/data/innings";

export default async function ScorecardPage({
  params,
}: {
  params: { matchId: string; innings: string };
}) {
  const { matchId, innings } = await params;

  const matchInnings = await getInningsByMatchId(+matchId);
  console.log("innings", matchInnings);

  return (
    <div className="w-full flex flex-col gap-y-4 p-4">
      {matchInnings.map((innings) => (
        <div key={innings.id} className="flex flex-col gap-y-2">
          <h2 className="text-xl font-bold flex gap-2">
            {innings.battingTeam.name} :
            <ScoreText
              runs={innings.totalScore}
              wickets={innings.wickets}
              balls={innings.ballsBowled}
            />{" "}
            <span className="font-normal text-muted-foreground">vs</span>{" "}
            {innings.bowlingTeam.name}
          </h2>
          {/* Add scorecard content here */}
        </div>
      ))}
    </div>
  );
}
