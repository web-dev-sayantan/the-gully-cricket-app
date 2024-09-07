import { onSelectCurrentBattersAndBowler } from "@/actions/match-actions";
import PlayerSelector from "./_components/PlayerSelector";
import { getMatchById } from "@/data/matches";
import { Separator } from "@radix-ui/react-separator";

export default async function StartMatchPage({
  params: { matchId },
}: {
  params: { matchId: string };
}) {
  const match = await getMatchById(+matchId);
  if (!match) return <div>Match not found</div>;

  const battingTeamPlayers = [
    match.team_battingFirstTeamId.player_player1,
    match.team_battingFirstTeamId.player_player2,
    match.team_battingFirstTeamId.player_player3,
    match.team_battingFirstTeamId.player_player4,
    match.team_battingFirstTeamId.player_player5,
    match.team_battingFirstTeamId.player_player6,
    match.team_battingFirstTeamId.player_player7,
    match.team_battingFirstTeamId.player_player8,
    match.team_battingFirstTeamId.player_player9,
    match.team_battingFirstTeamId.player_player10,
    match.team_battingFirstTeamId.player_player11,
  ].filter((player) => !!player);

  const bowlingTeamPlayers = [
    match.team_battingSecondTeamId.player_player1,
    match.team_battingSecondTeamId.player_player2,
    match.team_battingSecondTeamId.player_player3,
    match.team_battingSecondTeamId.player_player4,
    match.team_battingSecondTeamId.player_player5,
    match.team_battingSecondTeamId.player_player6,
    match.team_battingSecondTeamId.player_player7,
    match.team_battingSecondTeamId.player_player8,
    match.team_battingSecondTeamId.player_player9,
    match.team_battingSecondTeamId.player_player10,
    match.team_battingSecondTeamId.player_player11,
  ].filter((player) => !!player);

  return (
    <div className="w-full flex flex-col gap-y-4 p-4">
      <h1 className="text-2xl text-center">Match {match.id}</h1>
      <p className="text-center">
        {match.team_battingFirstTeamId.name} vs{" "}
        {match.team_battingSecondTeamId.name}
      </p>
      <Separator />
      <PlayerSelector
        battingTeam={battingTeamPlayers}
        bowlingTeam={bowlingTeamPlayers}
        matchId={+matchId}
        bowlingTeamId={match.team_battingSecondTeamId.id}
        ballNumber={1}
        onSelectCurrentBattersAndBowler={onSelectCurrentBattersAndBowler}
      />
    </div>
  );
}
