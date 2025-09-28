import { relations } from "drizzle-orm/relations";
import { players, balls, innings, teams, matches, tournaments, playerCareerStats, playerTournamentStats, teamPlayers, tournamentTeams, playerMatchPerformance } from "./schema";

export const ballsRelations = relations(balls, ({one}) => ({
	player_assistPlayerId: one(players, {
		fields: [balls.assistPlayerId],
		references: [players.id],
		relationName: "balls_assistPlayerId_players_id"
	}),
	player_dismissedPlayerId: one(players, {
		fields: [balls.dismissedPlayerId],
		references: [players.id],
		relationName: "balls_dismissedPlayerId_players_id"
	}),
	player_bowlerId: one(players, {
		fields: [balls.bowlerId],
		references: [players.id],
		relationName: "balls_bowlerId_players_id"
	}),
	player_nonStrikerId: one(players, {
		fields: [balls.nonStrikerId],
		references: [players.id],
		relationName: "balls_nonStrikerId_players_id"
	}),
	player_strikerId: one(players, {
		fields: [balls.strikerId],
		references: [players.id],
		relationName: "balls_strikerId_players_id"
	}),
	inning: one(innings, {
		fields: [balls.inningsId],
		references: [innings.id]
	}),
}));

export const playersRelations = relations(players, ({many}) => ({
	balls_assistPlayerId: many(balls, {
		relationName: "balls_assistPlayerId_players_id"
	}),
	balls_dismissedPlayerId: many(balls, {
		relationName: "balls_dismissedPlayerId_players_id"
	}),
	balls_bowlerId: many(balls, {
		relationName: "balls_bowlerId_players_id"
	}),
	balls_nonStrikerId: many(balls, {
		relationName: "balls_nonStrikerId_players_id"
	}),
	balls_strikerId: many(balls, {
		relationName: "balls_strikerId_players_id"
	}),
	playerCareerStats: many(playerCareerStats),
	playerTournamentStats: many(playerTournamentStats),
	teamPlayers: many(teamPlayers),
	playerMatchPerformances_dismissedBy: many(playerMatchPerformance, {
		relationName: "playerMatchPerformance_dismissedBy_players_id"
	}),
	playerMatchPerformances_playerId: many(playerMatchPerformance, {
		relationName: "playerMatchPerformance_playerId_players_id"
	}),
}));

export const inningsRelations = relations(innings, ({one, many}) => ({
	balls: many(balls),
	team: one(teams, {
		fields: [innings.battingTeamId],
		references: [teams.id]
	}),
	match: one(matches, {
		fields: [innings.matchId],
		references: [matches.id]
	}),
}));

export const teamsRelations = relations(teams, ({many}) => ({
	innings: many(innings),
	matches_winnerId: many(matches, {
		relationName: "matches_winnerId_teams_id"
	}),
	matches_team2Id: many(matches, {
		relationName: "matches_team2Id_teams_id"
	}),
	matches_team1Id: many(matches, {
		relationName: "matches_team1Id_teams_id"
	}),
	matches_tossWinnerId: many(matches, {
		relationName: "matches_tossWinnerId_teams_id"
	}),
	playerTournamentStats: many(playerTournamentStats),
	teamPlayers: many(teamPlayers),
	tournamentTeams: many(tournamentTeams),
	playerMatchPerformances: many(playerMatchPerformance),
}));

export const matchesRelations = relations(matches, ({one, many}) => ({
	innings: many(innings),
	team_winnerId: one(teams, {
		fields: [matches.winnerId],
		references: [teams.id],
		relationName: "matches_winnerId_teams_id"
	}),
	team_team2Id: one(teams, {
		fields: [matches.team2Id],
		references: [teams.id],
		relationName: "matches_team2Id_teams_id"
	}),
	team_team1Id: one(teams, {
		fields: [matches.team1Id],
		references: [teams.id],
		relationName: "matches_team1Id_teams_id"
	}),
	team_tossWinnerId: one(teams, {
		fields: [matches.tossWinnerId],
		references: [teams.id],
		relationName: "matches_tossWinnerId_teams_id"
	}),
	tournament: one(tournaments, {
		fields: [matches.tournamentId],
		references: [tournaments.id]
	}),
	playerMatchPerformances: many(playerMatchPerformance),
}));

export const tournamentsRelations = relations(tournaments, ({many}) => ({
	matches: many(matches),
	playerTournamentStats: many(playerTournamentStats),
	tournamentTeams: many(tournamentTeams),
}));

export const playerCareerStatsRelations = relations(playerCareerStats, ({one}) => ({
	player: one(players, {
		fields: [playerCareerStats.playerId],
		references: [players.id]
	}),
}));

export const playerTournamentStatsRelations = relations(playerTournamentStats, ({one}) => ({
	team: one(teams, {
		fields: [playerTournamentStats.teamId],
		references: [teams.id]
	}),
	tournament: one(tournaments, {
		fields: [playerTournamentStats.tournamentId],
		references: [tournaments.id]
	}),
	player: one(players, {
		fields: [playerTournamentStats.playerId],
		references: [players.id]
	}),
}));

export const teamPlayersRelations = relations(teamPlayers, ({one}) => ({
	player: one(players, {
		fields: [teamPlayers.playerId],
		references: [players.id]
	}),
	team: one(teams, {
		fields: [teamPlayers.teamId],
		references: [teams.id]
	}),
}));

export const tournamentTeamsRelations = relations(tournamentTeams, ({one}) => ({
	team: one(teams, {
		fields: [tournamentTeams.teamId],
		references: [teams.id]
	}),
	tournament: one(tournaments, {
		fields: [tournamentTeams.tournamentId],
		references: [tournaments.id]
	}),
}));

export const playerMatchPerformanceRelations = relations(playerMatchPerformance, ({one}) => ({
	player_dismissedBy: one(players, {
		fields: [playerMatchPerformance.dismissedBy],
		references: [players.id],
		relationName: "playerMatchPerformance_dismissedBy_players_id"
	}),
	team: one(teams, {
		fields: [playerMatchPerformance.teamId],
		references: [teams.id]
	}),
	player_playerId: one(players, {
		fields: [playerMatchPerformance.playerId],
		references: [players.id],
		relationName: "playerMatchPerformance_playerId_players_id"
	}),
	match: one(matches, {
		fields: [playerMatchPerformance.matchId],
		references: [matches.id]
	}),
}));