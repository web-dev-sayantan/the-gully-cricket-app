// import { relations } from "drizzle-orm/relations";
// import {
//   players,
//   balls,
//   teams,
//   matches,
//   playerPerformance,
//   scoreCard,
// } from "./schema";

// export const ballsRelations = relations(balls, ({ one }) => ({
//   player_dismissedBy: one(players, {
//     fields: [balls.dismissedBy],
//     references: [players.id],
//     relationName: "balls_stumpedBy_players_id",
//   }),
//   player_bowlerId: one(players, {
//     fields: [balls.bowlerId],
//     references: [players.id],
//     relationName: "balls_bowlerId_players_id",
//   }),
//   player_nonStrikerId: one(players, {
//     fields: [balls.nonStrikerId],
//     references: [players.id],
//     relationName: "balls_nonStrikerId_players_id",
//   }),
//   player_strikerId: one(players, {
//     fields: [balls.strikerId],
//     references: [players.id],
//     relationName: "balls_strikerId_players_id",
//   }),
//   team_bowlingTeamId: one(teams, {
//     fields: [balls.bowlingTeamId],
//     references: [teams.id],
//     relationName: "balls_bowlingTeamId_teams_id",
//   }),
//   team_battingTeamId: one(teams, {
//     fields: [balls.battingTeamId],
//     references: [teams.id],
//     relationName: "balls_battingTeamId_teams_id",
//   }),
//   match: one(matches, {
//     fields: [balls.matchId],
//     references: [matches.id],
//   }),
// }));

// export const playersRelations = relations(players, ({ many }) => ({
//   balls_stumpedBy: many(balls, {
//     relationName: "balls_stumpedBy_players_id",
//   }),
//   balls_runOutBy: many(balls, {
//     relationName: "balls_runOutBy_players_id",
//   }),
//   balls_caughtBy: many(balls, {
//     relationName: "balls_caughtBy_players_id",
//   }),
//   balls_bowlerId: many(balls, {
//     relationName: "balls_bowlerId_players_id",
//   }),
//   balls_nonStrikerId: many(balls, {
//     relationName: "balls_nonStrikerId_players_id",
//   }),
//   balls_strikerId: many(balls, {
//     relationName: "balls_strikerId_players_id",
//   }),
//   playerPerformances_dismissalSupportedBy: many(playerPerformance, {
//     relationName: "playerPerformance_dismissalSupportedBy_players_id",
//   }),
//   playerPerformances_dismissedBy: many(playerPerformance, {
//     relationName: "playerPerformance_dismissedBy_players_id",
//   }),
//   playerPerformances_playerId: many(playerPerformance, {
//     relationName: "playerPerformance_playerId_players_id",
//   }),
//   teams_player11: many(teams, {
//     relationName: "teams_player11_players_id",
//   }),
//   teams_player10: many(teams, {
//     relationName: "teams_player10_players_id",
//   }),
//   teams_player9: many(teams, {
//     relationName: "teams_player9_players_id",
//   }),
//   teams_player8: many(teams, {
//     relationName: "teams_player8_players_id",
//   }),
//   teams_player7: many(teams, {
//     relationName: "teams_player7_players_id",
//   }),
//   teams_player6: many(teams, {
//     relationName: "teams_player6_players_id",
//   }),
//   teams_player5: many(teams, {
//     relationName: "teams_player5_players_id",
//   }),
//   teams_player4: many(teams, {
//     relationName: "teams_player4_players_id",
//   }),
//   teams_player3: many(teams, {
//     relationName: "teams_player3_players_id",
//   }),
//   teams_player2: many(teams, {
//     relationName: "teams_player2_players_id",
//   }),
//   teams_player1: many(teams, {
//     relationName: "teams_player1_players_id",
//   }),
//   teams_captain: many(teams, {
//     relationName: "teams_captain_players_id",
//   }),
// }));

// export const teamsRelations = relations(teams, ({ one, many }) => ({
//   balls_bowlingTeamId: many(balls, {
//     relationName: "balls_bowlingTeamId_teams_id",
//   }),
//   balls_battingTeamId: many(balls, {
//     relationName: "balls_battingTeamId_teams_id",
//   }),
//   player_player11: one(players, {
//     fields: [teams.player11],
//     references: [players.id],
//     relationName: "teams_player11_players_id",
//   }),
//   player_player10: one(players, {
//     fields: [teams.player10],
//     references: [players.id],
//     relationName: "teams_player10_players_id",
//   }),
//   player_player9: one(players, {
//     fields: [teams.player9],
//     references: [players.id],
//     relationName: "teams_player9_players_id",
//   }),
//   player_player8: one(players, {
//     fields: [teams.player8],
//     references: [players.id],
//     relationName: "teams_player8_players_id",
//   }),
//   player_player7: one(players, {
//     fields: [teams.player7],
//     references: [players.id],
//     relationName: "teams_player7_players_id",
//   }),
//   player_player6: one(players, {
//     fields: [teams.player6],
//     references: [players.id],
//     relationName: "teams_player6_players_id",
//   }),
//   player_player5: one(players, {
//     fields: [teams.player5],
//     references: [players.id],
//     relationName: "teams_player5_players_id",
//   }),
//   player_player4: one(players, {
//     fields: [teams.player4],
//     references: [players.id],
//     relationName: "teams_player4_players_id",
//   }),
//   player_player3: one(players, {
//     fields: [teams.player3],
//     references: [players.id],
//     relationName: "teams_player3_players_id",
//   }),
//   player_player2: one(players, {
//     fields: [teams.player2],
//     references: [players.id],
//     relationName: "teams_player2_players_id",
//   }),
//   player_player1: one(players, {
//     fields: [teams.player1],
//     references: [players.id],
//     relationName: "teams_player1_players_id",
//   }),
//   player_captain: one(players, {
//     fields: [teams.captain],
//     references: [players.id],
//     relationName: "teams_captain_players_id",
//   }),
//   matches_loser: many(matches, {
//     relationName: "matches_loser_teams_id",
//   }),
//   matches_winner: many(matches, {
//     relationName: "matches_winner_teams_id",
//   }),
//   matches_battingSecondTeamId: many(matches, {
//     relationName: "matches_battingSecondTeamId_teams_id",
//   }),
//   matches_battingFirstTeamId: many(matches, {
//     relationName: "matches_battingFirstTeamId_teams_id",
//   }),
//   matches_tossWinnerId: many(matches, {
//     relationName: "matches_tossWinnerId_teams_id",
//   }),
//   scoreCards: many(scoreCard),
// }));

// export const matchesRelations = relations(matches, ({ one, many }) => ({
//   balls: many(balls),
//   team_loser: one(teams, {
//     fields: [matches.loser],
//     references: [teams.id],
//     relationName: "matches_loser_teams_id",
//   }),
//   team_winner: one(teams, {
//     fields: [matches.winner],
//     references: [teams.id],
//     relationName: "matches_winner_teams_id",
//   }),
//   team_battingSecondTeamId: one(teams, {
//     fields: [matches.battingSecondTeamId],
//     references: [teams.id],
//     relationName: "matches_battingSecondTeamId_teams_id",
//   }),
//   team_battingFirstTeamId: one(teams, {
//     fields: [matches.battingFirstTeamId],
//     references: [teams.id],
//     relationName: "matches_battingFirstTeamId_teams_id",
//   }),
//   team_tossWinnerId: one(teams, {
//     fields: [matches.tossWinnerId],
//     references: [teams.id],
//     relationName: "matches_tossWinnerId_teams_id",
//   }),
//   scoreCards: many(scoreCard),
// }));

// export const playerPerformanceRelations = relations(
//   playerPerformance,
//   ({ one }) => ({
//     player_dismissalSupportedBy: one(players, {
//       fields: [playerPerformance.dismissalSupportedBy],
//       references: [players.id],
//       relationName: "playerPerformance_dismissalSupportedBy_players_id",
//     }),
//     player_dismissedBy: one(players, {
//       fields: [playerPerformance.dismissedBy],
//       references: [players.id],
//       relationName: "playerPerformance_dismissedBy_players_id",
//     }),
//     scoreCard: one(scoreCard, {
//       fields: [playerPerformance.scoreCardId],
//       references: [scoreCard.id],
//     }),
//     player_playerId: one(players, {
//       fields: [playerPerformance.playerId],
//       references: [players.id],
//       relationName: "playerPerformance_playerId_players_id",
//     }),
//   })
// );

// export const scoreCardRelations = relations(scoreCard, ({ one, many }) => ({
//   playerPerformances: many(playerPerformance),
//   team: one(teams, {
//     fields: [scoreCard.teamId],
//     references: [teams.id],
//   }),
//   match: one(matches, {
//     fields: [scoreCard.matchId],
//     references: [matches.id],
//   }),
// }));
