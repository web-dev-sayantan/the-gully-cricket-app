import { onSelectCurrentBattersAndBowler } from "@/actions/match-actions";
import PlayerSelector from "@/components/players-selector";
import { getMatchById } from "@/data/matches";
import { Separator } from "@radix-ui/react-separator";

export const runtime = "edge";
export default async function StartMatchPage({
  params: { matchId },
}: {
  params: { matchId: string };
}) {
  const match = await getMatchById(+matchId);
  if (!match) return <div>Match not found</div>;

  const battingTeamPlayers = match.team1.teamPlayers;

  const bowlingTeamPlayers = match.team2.teamPlayers;

  return (
    <div className="w-full flex flex-col gap-y-4 p-4">
      <h1 className="text-2xl text-center">Match {match.id}</h1>
      <p className="text-center">
        {match.team1.name} vs {match.team2.name}
      </p>
      <Separator />
      <PlayerSelector
        battingTeam={battingTeamPlayers}
        bowlingTeam={bowlingTeamPlayers}
        matchId={+matchId}
        bowlingTeamId={match.team2.id}
        ballNumber={1}
        onSelectCurrentBattersAndBowler={onSelectCurrentBattersAndBowler}
      />
    </div>
  );
}
