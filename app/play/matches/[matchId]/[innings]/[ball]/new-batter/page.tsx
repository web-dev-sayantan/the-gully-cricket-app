import { onSelectNewBatter } from "@/actions/match-actions";
import NewBatter from "@/components/new-batter";
import { getBallById } from "@/data/balls";
import { getMatchById } from "@/data/matches";
import { redirect } from "next/navigation";

export const runtime = "edge";
export default async function NewBatterPage({
  params: { matchId, innings: inningsId, ball: ballId },
}: {
  params: { matchId: string; innings: string; ball: string };
}) {
  const match = await getMatchById(+matchId);
  if (!match) return <div>Match not found</div>;

  const battingTeamPlayers = match.team1.teamPlayers.filter(
    (player) => !!player
  );

  const ball = await getBallById(+ballId);

  if (!ball) {
    redirect(`/play/matches/${matchId}/start-match`);
  }

  return (
    <div className="w-full flex flex-col gap-4 p-4 justify-center">
      {ball && (
        <NewBatter
          battingTeam={battingTeamPlayers}
          matchId={+matchId}
          teamId={match.team1Id}
          inningsId={+inningsId}
          ballNumber={ball.ballNumber}
          isExtra={ball.isWide || ball.isNoBall}
          bowlerId={ball.bowlerId}
          nonStrikerId={ball.nonStrikerId}
          onSelectNewBatter={onSelectNewBatter}
        />
      )}
    </div>
  );
}
