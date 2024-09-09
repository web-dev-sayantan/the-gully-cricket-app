import { onSelectNewBowler } from "@/actions/match-actions";
import NewBowler from "@/components/new-bowler";
import { getBallById } from "@/data/balls";
import { getMatchById } from "@/data/matches";
import { redirect } from "next/navigation";
export default async function NewBowlerPage({
  params: { matchId, innings: inningsId, ball: ballId },
}: {
  params: { matchId: string; innings: string; ball: string };
}) {
  const match = await getMatchById(+matchId);
  if (!match) return <div>Match not found</div>;

  const ball = await getBallById(+ballId);

  if (!ball) {
    redirect(`/play/matches/start-match/${matchId}`);
  }
  const bowlingTeamPlayers = match.team2.teamPlayers.filter(
    (player) => !!(player && player.playerId !== ball.bowlerId)
  );

  return (
    <div className="w-full flex flex-col gap-4 p-4 justify-center">
      {ball && (
        <NewBowler
          bowlingTeam={bowlingTeamPlayers}
          matchId={+matchId}
          ballNumber={ball.ballNumber}
          runScored={ball.runsScored}
          previousBowlerId={ball.bowlerId}
          inningsId={ball.inningsId}
          strikerId={ball.strikerId}
          nonStrikerId={ball.nonStrikerId}
          onSelectNewBowler={onSelectNewBowler}
        />
      )}
    </div>
  );
}
