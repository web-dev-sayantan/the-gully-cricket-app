import {
  integer,
  sqliteTable,
  text,
  real,
  index,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

export const players = sqliteTable("players", {
  id: integer("id").primaryKey().notNull(),
  name: text("name").notNull(),
  age: integer("age").notNull(),
  battingStance: text("batting_stance").default("Right handed").notNull(),
  bowlingStance: text("bowling_stance"),
  isWicketKeeper: integer("is_wicket_keeper", { mode: "boolean" })
    .default(false)
    .notNull(),
});

export const teams = sqliteTable("teams", {
  id: integer("id").primaryKey().notNull(),
  name: text("name").notNull(),
  shortName: text("short_name").notNull(),
});

export const teamPlayers = sqliteTable(
  "team_players",
  {
    id: integer("id").primaryKey().notNull(),
    teamId: integer("team_id")
      .notNull()
      .references(() => teams.id),
    playerId: integer("player_id")
      .notNull()
      .references(() => players.id),
    isCaptain: integer("is_captain", { mode: "boolean" })
      .default(false)
      .notNull(),
  },
  (t) => ({
    unique_team_player: uniqueIndex("unique_team_player").on(
      t.teamId,
      t.playerId
    ),
  })
);

export const tournaments = sqliteTable("tournaments", {
  id: integer("id").primaryKey().notNull(),
  name: text("name").notNull(),
  startDate: integer("start_date", { mode: "timestamp" }).notNull(),
  endDate: integer("end_date", { mode: "timestamp" }).notNull(),
  format: text("format").notNull(), // "T5", "T6", "T7", "T8", "T10", "T12", "T20", "ODI"
});

export const tournamentTeams = sqliteTable("tournamentTeams", {
  id: integer("id").primaryKey(),
  tournamentId: integer("tournamentId")
    .notNull()
    .references(() => tournaments.id),
  teamId: integer("teamId")
    .notNull()
    .references(() => teams.id),
  points: integer("points").default(0),
  matchesPlayed: integer("matchesPlayed").default(0),
  matchesWon: integer("matchesWon").default(0),
  matchesLost: integer("matchesLost").default(0),
  matchesTied: integer("matchesTied").default(0),
  matchesDrawn: integer("matchesDrawn").default(0),
});

export const matches = sqliteTable(
  "matches",
  {
    id: integer("id").primaryKey().notNull(),
    tournamentId: integer("tournament_id").references(() => tournaments.id),
    matchDate: integer("match_date", { mode: "timestamp" }).notNull(),
    tossWinnerId: integer("toss_winner_id")
      .notNull()
      .references(() => teams.id),
    tossDecision: text("toss_decision").notNull(), // "bat" or "bowl"
    team1Id: integer("team1_id")
      .notNull()
      .references(() => teams.id),
    team2Id: integer("team2_id")
      .notNull()
      .references(() => teams.id),
    oversPerSide: integer("overs_per_side").notNull().default(20),
    maxOverPerBowler: integer("max_over_per_bowler").notNull().default(4),
    result: text("result"),
    winnerId: integer("winner_id").references(() => teams.id),
    ranked: integer("ranked", { mode: "boolean" }).default(false),
  },
  (t) => ({
    rank_idx: index("rank_idx").on(t.winnerId),
  })
);

export const innings = sqliteTable(
  "innings",
  {
    id: integer("id").primaryKey().notNull(),
    matchId: integer("match_id")
      .notNull()
      .references(() => matches.id),
    battingTeamId: integer("batting_team_id")
      .notNull()
      .references(() => teams.id),
    totalScore: integer("total_runs").notNull().default(0),
    wickets: integer("wickets").notNull().default(0),
    balls: integer("overs").notNull().default(0),
    extras: integer("extras").notNull().default(0),
  },
  (t) => ({
    match_idx: index("match_idx").on(t.matchId),
  })
);

export const balls = sqliteTable(
  "balls",
  {
    id: integer("id").primaryKey().notNull(),
    inningsId: integer("innings_id")
      .notNull()
      .references(() => innings.id),
    ballNumber: integer("ball_number").notNull(),
    strikerId: integer("striker_id")
      .notNull()
      .references(() => players.id),
    nonStrikerId: integer("non_striker_id")
      .notNull()
      .references(() => players.id),
    bowlerId: integer("bowler_id")
      .notNull()
      .references(() => players.id),
    runsScored: integer("runs_scored").notNull().default(0),
    isWicket: integer("is_wicket", { mode: "boolean" })
      .notNull()
      .default(false),
    wicketType: text("wicket_type"),
    dismissedPlayerId: integer("dismissed_player_id").references(
      () => players.id
    ),
    assistPlayerId: integer("assist_player_id").references(() => players.id),
    isWide: integer("is_wide", { mode: "boolean" }).notNull().default(false),
    isNoBall: integer("is_no_ball", { mode: "boolean" })
      .notNull()
      .default(false),
    isBye: integer("is_bye", { mode: "boolean" }).notNull().default(false),
    isLegBye: integer("is_leg_bye", { mode: "boolean" })
      .notNull()
      .default(false),
  },
  (t) => ({
    over_idx: index("over_idx").on(t.inningsId, t.bowlerId),
    innings_idx: index("innings_idx").on(t.inningsId),
  })
);

export const playerMatchPerformance = sqliteTable(
  "player_match_performance",
  {
    id: integer("id").primaryKey().notNull(),
    matchId: integer("match_id")
      .notNull()
      .references(() => matches.id),
    playerId: integer("player_id")
      .notNull()
      .references(() => players.id),
    teamId: integer("team_id")
      .notNull()
      .references(() => teams.id),
    runsScored: integer("runs_scored").notNull().default(0),
    ballsFaced: integer("balls_faced").notNull().default(0),
    fours: integer("fours").notNull().default(0),
    sixes: integer("sixes").notNull().default(0),
    isDismissed: integer("is_dismissed", { mode: "boolean" })
      .notNull()
      .default(false),
    dismissalType: text("dismissal_type"),
    dismissedBy: integer("dismissed_by").references(() => players.id),
    ballsBowled: integer("balls_bowled").notNull().default(0),
    runsConceded: integer("runs_conceded").notNull().default(0),
    wicketsTaken: integer("wickets_taken").notNull().default(0),
    dotBalls: integer("dot_balls").notNull().default(0),
    catches: integer("catches").notNull().default(0),
    runOuts: integer("run_outs").notNull().default(0),
    stumpings: integer("stumpings").notNull().default(0),
  },
  (t) => ({
    player_idx: index("player_idx").on(t.playerId),
    player_match_performance_idx: uniqueIndex(
      "player_match_performance_idx"
    ).on(t.playerId, t.matchId),
  })
);

export const playerTournamentStats = sqliteTable("player_tournament_stats", {
  id: integer("id").primaryKey().notNull(),
  playerId: integer("player_id")
    .notNull()
    .references(() => players.id),
  tournamentId: integer("tournament_id")
    .notNull()
    .references(() => tournaments.id),
  teamId: integer("team_id")
    .notNull()
    .references(() => teams.id),
  matchesPlayed: integer("matches_played").notNull().default(0),
  runsScored: integer("runs_scored").notNull().default(0),
  ballsFaced: integer("balls_faced").notNull().default(0),
  fours: integer("fours").notNull().default(0),
  sixes: integer("sixes").notNull().default(0),
  avgStrikeRate: real("avg_strike_rate").notNull().default(0),
  highestScore: integer("highest_score").notNull().default(0),
  fifties: integer("fifties").notNull().default(0),
  hundreds: integer("hundreds").notNull().default(0),
  ballsBowled: integer("balls_bowled").notNull().default(0),
  runsConceded: integer("runs_conceded").notNull().default(0),
  wicketsTaken: integer("wickets_taken").notNull().default(0),
  avgEconomy: real("avg_economy").notNull().default(0),
  bestBowling: text("best_bowling"),
  fifers: integer("fifers").notNull().default(0),
  catches: integer("catches").notNull().default(0),
  runOuts: integer("run_outs").notNull().default(0),
  stumpings: integer("stumpings").notNull().default(0),
});

export const playerCareerStats = sqliteTable("player_career_stats", {
  id: integer("id").primaryKey().notNull(),
  playerId: integer("player_id")
    .notNull()
    .references(() => players.id),
  format: text("format").notNull(), // "T5", "T6", "T7", "T8", "T10", "T12", "T20", "ODI"
  matchesPlayed: integer("matches_played").notNull().default(0),
  runsScored: integer("runs_scored").notNull().default(0),
  ballsFaced: integer("balls_faced").notNull().default(0),
  fours: integer("fours").notNull().default(0),
  sixes: integer("sixes").notNull().default(0),
  avgStrikeRate: real("avg_strike_rate").notNull().default(0),
  highestScore: integer("highest_score").notNull().default(0),
  fifties: integer("fifties").notNull().default(0),
  hundreds: integer("hundreds").notNull().default(0),
  ballsBowled: integer("balls_bowled").notNull().default(0),
  runsConceded: integer("runs_conceded").notNull().default(0),
  wicketsTaken: integer("wickets_taken").notNull().default(0),
  avgEconomy: real("avg_economy").notNull().default(0),
  bestBowling: text("best_bowling"),
  fifers: integer("fifers").notNull().default(0),
  catches: integer("catches").notNull().default(0),
  runOuts: integer("run_outs").notNull().default(0),
  stumpings: integer("stumpings").notNull().default(0),
});
