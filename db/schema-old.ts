import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import {
  sqliteTable,
  uniqueIndex,
  index,
  integer,
  text,
} from "drizzle-orm/sqlite-core";

export const balls = sqliteTable(
  "balls",
  {
    id: integer("id").primaryKey().notNull(),
    matchId: integer("match_id")
      .notNull()
      .references(() => matches.id, { onDelete: "cascade" }),
    scorecardId: integer("scorecard_id")
      .notNull()
      .references(() => scoreCard.id, { onDelete: "cascade" }),
    battingTeamId: integer("batting_team_id")
      .notNull()
      .references(() => teams.id, { onDelete: "cascade" }),
    bowlingTeamId: integer("bowling_team_id")
      .notNull()
      .references(() => teams.id, { onDelete: "cascade" }),
    strikerId: integer("striker_id")
      .notNull()
      .references(() => players.id, { onDelete: "cascade" }),
    nonStrikerId: integer("non_striker_id")
      .notNull()
      .references(() => players.id, { onDelete: "cascade" }),
    bowlerId: integer("bowler_id")
      .notNull()
      .references(() => players.id, { onDelete: "cascade" }),
    ballNumber: integer("ball_number").notNull(),
    runsScored: integer("runs_scored").default(0).notNull(),
    wicket: integer("wicket", { mode: "boolean" }).default(false).notNull(),
    wicketType: text("wicket_type"),
    batterDismissed: integer("batter_dismissed").references(() => players.id, {
      onDelete: "cascade",
    }),
    dismissedBy: integer("dismissed_by").references(() => players.id, {
      onDelete: "cascade",
    }),
    isExtra: integer("is_extra", { mode: "boolean" }).default(false).notNull(),
    extraType: text("extra_type"),
  },
  (table) => {
    return {
      overIdx: index("over_idx").on(table.matchId, table.bowlerId),
      matchIdx: index("match_idx").on(table.matchId, table.battingTeamId),
      matchTeamBallNumberIdx: index("match_team_ball_number_idx").on(
        table.matchId,
        table.battingTeamId,
        table.bowlingTeamId,
        table.ballNumber
      ),
    };
  }
);

export const playerPerformance = sqliteTable(
  "player_performance",
  {
    id: integer("id").primaryKey().notNull(),
    playerId: integer("player_id")
      .notNull()
      .references(() => players.id, { onDelete: "cascade" }),
    scoreCardId: integer("score_card_id")
      .notNull()
      .references(() => scoreCard.id, { onDelete: "cascade" }),
    battingPosition: integer("batting_position").default(1).notNull(),
    didBat: integer("did_bat", { mode: "boolean" }).default(false).notNull(),
    runsScored: integer("runs_scored").default(0).notNull(),
    ballsFaced: integer("balls_faced").default(0).notNull(),
    isDismissed: integer("is_dismissed", { mode: "boolean" })
      .default(false)
      .notNull(),
    dismissalType: text("dismissal_type"),
    dismissedBy: integer("dismissed_by").references(() => players.id, {
      onDelete: "cascade",
    }),
    dismissalSupportedBy: integer("dismissal_supported_by").references(
      () => players.id,
      { onDelete: "cascade" }
    ),
    didBowl: integer("did_bowl", { mode: "boolean" }).default(false).notNull(),
    bowlingPosition: integer("bowling_position").default(1).notNull(),
    ballsBowled: integer("balls_bowled").default(0).notNull(),
    runsConceded: integer("runs_conceded").default(0).notNull(),
    wicketsTaken: integer("wickets_taken").default(0).notNull(),
    maidens: integer("maidens").default(0).notNull(),
  },
  (table) => {
    return {
      playerIdScoreCardIdUnique: uniqueIndex(
        "player_performance_player_id_score_card_id_unique"
      ).on(table.playerId, table.scoreCardId),
      playerIdx: index("player_idx").on(table.playerId),
      playerScoreIdx: uniqueIndex("player_score_idx").on(
        table.playerId,
        table.scoreCardId
      ),
    };
  }
);

export const players = sqliteTable("players", {
  id: integer("id").primaryKey().notNull(),
  name: text("name").notNull(),
  age: integer("age").notNull(),
  battingStance: text("batting_stance").default("Right handed").notNull(),
  bowlingStance: text("bowling_stance"),
  isWicketKeeper: integer("is_wicket_keeper", { mode: "boolean" })
    .default(false)
    .notNull(),
  matchesPlayed: integer("matches_played").default(0).notNull(),
  runsScored: integer("runs_scored").default(0).notNull(),
  ballsFaced: integer("balls_faced").default(0).notNull(),
  timesDismissed: integer("times_dismissed").default(0).notNull(),
  fifties: integer("fifties").default(0).notNull(),
  hundreds: integer("hundreds").default(0).notNull(),
  wicketsTaken: integer("wickets_taken").default(0).notNull(),
  ballsBowled: integer("balls_bowled").default(0).notNull(),
  fifers: integer("fifers").default(0).notNull(),
  catchesTaken: integer("catches_taken").default(0).notNull(),
  runOuts: integer("run_outs").default(0).notNull(),
  stumpings: integer("stumpings").default(0).notNull(),
});

export const teams = sqliteTable("teams", {
  id: integer("id").primaryKey().notNull(),
  name: text("name").notNull(),
  shortName: text("short_name").notNull(),
  captain: integer("captain")
    .notNull()
    .references(() => players.id, { onDelete: "cascade" }),
  player1: integer("player_1")
    .notNull()
    .references(() => players.id, { onDelete: "cascade" }),
  player2: integer("player_2")
    .notNull()
    .references(() => players.id, { onDelete: "cascade" }),
  player3: integer("player_3")
    .notNull()
    .references(() => players.id, { onDelete: "cascade" }),
  player4: integer("player_4")
    .notNull()
    .references(() => players.id, { onDelete: "cascade" }),
  player5: integer("player_5")
    .notNull()
    .references(() => players.id, { onDelete: "cascade" }),
  player6: integer("player_6").references(() => players.id, {
    onDelete: "cascade",
  }),
  player7: integer("player_7").references(() => players.id, {
    onDelete: "cascade",
  }),
  player8: integer("player_8").references(() => players.id, {
    onDelete: "cascade",
  }),
  player9: integer("player_9").references(() => players.id, {
    onDelete: "cascade",
  }),
  player10: integer("player_10").references(() => players.id, {
    onDelete: "cascade",
  }),
  player11: integer("player_11").references(() => players.id, {
    onDelete: "cascade",
  }),
});

export const matches = sqliteTable("matches", {
  id: integer("id").primaryKey().notNull(),
  matchDate: integer("match_date", { mode: "timestamp" }).notNull(),
  tossWinnerId: integer("toss_winner_id")
    .notNull()
    .references(() => teams.id, { onDelete: "cascade" }),
  battingFirstTeamId: integer("batting_first_team_id")
    .notNull()
    .references(() => teams.id, { onDelete: "cascade" }),
  battingSecondTeamId: integer("batting_second_team_id")
    .notNull()
    .references(() => teams.id, { onDelete: "cascade" }),
  oversPerSide: integer("overs_per_side").default(20).notNull(),
  maxOverPerBowler: integer("max_over_per_bowler").default(4).notNull(),
  result: text("result"),
  winner: integer("winner").references(() => teams.id, { onDelete: "cascade" }),
  loser: integer("loser").references(() => teams.id, { onDelete: "cascade" }),
});

export const scoreCard = sqliteTable(
  "score_card",
  {
    id: integer("id").primaryKey().notNull(),
    matchId: integer("match_id")
      .notNull()
      .references(() => matches.id, { onDelete: "cascade" }),
    teamId: integer("team_id")
      .notNull()
      .references(() => teams.id, { onDelete: "cascade" }),
    totalScore: integer("total_score").default(0).notNull(),
    wickets: integer("wickets").default(0).notNull(),
    balls: integer("balls").default(0).notNull(),
    target: integer("target").default(0).notNull(),
    extras: integer("extras").default(0).notNull(),
  },
  (table) => {
    return {
      matchIdTeamIdUnique: uniqueIndex("score_card_match_id_team_id_unique").on(
        table.matchId,
        table.teamId
      ),
    };
  }
);

export type Match = InferSelectModel<typeof matches>;
export type Team = InferSelectModel<typeof teams>;
export type Player = InferSelectModel<typeof players>;
export type ScoreCard = InferSelectModel<typeof scoreCard>;
export type Ball = InferSelectModel<typeof balls>;
export type InsertBall = InferInsertModel<typeof balls>;
