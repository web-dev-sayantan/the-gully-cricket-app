CREATE TABLE `balls` (
	`id` integer PRIMARY KEY NOT NULL,
	`innings_id` integer NOT NULL,
	`ball_number` integer NOT NULL,
	`striker_id` integer NOT NULL,
	`non_striker_id` integer NOT NULL,
	`bowler_id` integer NOT NULL,
	`runs_scored` integer DEFAULT 0 NOT NULL,
	`is_wicket` integer DEFAULT false NOT NULL,
	`wicket_type` text,
	`dismissed_player_id` integer,
	`assist_player_id` integer,
	`is_wide` integer DEFAULT false NOT NULL,
	`is_no_ball` integer DEFAULT false NOT NULL,
	`is_bye` integer DEFAULT false NOT NULL,
	`is_leg_bye` integer DEFAULT false NOT NULL,
	FOREIGN KEY (`innings_id`) REFERENCES `innings`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`striker_id`) REFERENCES `players`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`non_striker_id`) REFERENCES `players`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`bowler_id`) REFERENCES `players`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`dismissed_player_id`) REFERENCES `players`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`assist_player_id`) REFERENCES `players`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `innings` (
	`id` integer PRIMARY KEY NOT NULL,
	`match_id` integer NOT NULL,
	`batting_team_id` integer NOT NULL,
	`total_runs` integer DEFAULT 0 NOT NULL,
	`wickets` integer DEFAULT 0 NOT NULL,
	`overs` integer DEFAULT 0 NOT NULL,
	`extras` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`match_id`) REFERENCES `matches`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`batting_team_id`) REFERENCES `teams`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `matches` (
	`id` integer PRIMARY KEY NOT NULL,
	`tournament_id` integer,
	`match_date` integer NOT NULL,
	`toss_winner_id` integer NOT NULL,
	`toss_decision` text NOT NULL,
	`team1_id` integer NOT NULL,
	`team2_id` integer NOT NULL,
	`overs_per_side` integer DEFAULT 20 NOT NULL,
	`max_over_per_bowler` integer DEFAULT 4 NOT NULL,
	`result` text,
	`winner_id` integer,
	`ranked` integer DEFAULT false,
	FOREIGN KEY (`tournament_id`) REFERENCES `tournaments`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`toss_winner_id`) REFERENCES `teams`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`team1_id`) REFERENCES `teams`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`team2_id`) REFERENCES `teams`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`winner_id`) REFERENCES `teams`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `player_career_stats` (
	`id` integer PRIMARY KEY NOT NULL,
	`player_id` integer NOT NULL,
	`format` text NOT NULL,
	`matches_played` integer DEFAULT 0 NOT NULL,
	`runs_scored` integer DEFAULT 0 NOT NULL,
	`balls_faced` integer DEFAULT 0 NOT NULL,
	`fours` integer DEFAULT 0 NOT NULL,
	`sixes` integer DEFAULT 0 NOT NULL,
	`avg_strike_rate` real DEFAULT 0 NOT NULL,
	`highest_score` integer DEFAULT 0 NOT NULL,
	`fifties` integer DEFAULT 0 NOT NULL,
	`hundreds` integer DEFAULT 0 NOT NULL,
	`balls_bowled` integer DEFAULT 0 NOT NULL,
	`runs_conceded` integer DEFAULT 0 NOT NULL,
	`wickets_taken` integer DEFAULT 0 NOT NULL,
	`avg_economy` real DEFAULT 0 NOT NULL,
	`best_bowling` text,
	`fifers` integer DEFAULT 0 NOT NULL,
	`catches` integer DEFAULT 0 NOT NULL,
	`run_outs` integer DEFAULT 0 NOT NULL,
	`stumpings` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `player_match_performance` (
	`id` integer PRIMARY KEY NOT NULL,
	`match_id` integer NOT NULL,
	`player_id` integer NOT NULL,
	`team_id` integer NOT NULL,
	`runs_scored` integer DEFAULT 0 NOT NULL,
	`balls_faced` integer DEFAULT 0 NOT NULL,
	`fours` integer DEFAULT 0 NOT NULL,
	`sixes` integer DEFAULT 0 NOT NULL,
	`is_dismissed` integer DEFAULT false NOT NULL,
	`dismissal_type` text,
	`dismissed_by` integer,
	`balls_bowled` integer DEFAULT 0 NOT NULL,
	`runs_conceded` integer DEFAULT 0 NOT NULL,
	`wickets_taken` integer DEFAULT 0 NOT NULL,
	`dot_balls` integer DEFAULT 0 NOT NULL,
	`catches` integer DEFAULT 0 NOT NULL,
	`run_outs` integer DEFAULT 0 NOT NULL,
	`stumpings` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`match_id`) REFERENCES `matches`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`team_id`) REFERENCES `teams`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`dismissed_by`) REFERENCES `players`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `player_tournament_stats` (
	`id` integer PRIMARY KEY NOT NULL,
	`player_id` integer NOT NULL,
	`tournament_id` integer NOT NULL,
	`team_id` integer NOT NULL,
	`matches_played` integer DEFAULT 0 NOT NULL,
	`runs_scored` integer DEFAULT 0 NOT NULL,
	`balls_faced` integer DEFAULT 0 NOT NULL,
	`fours` integer DEFAULT 0 NOT NULL,
	`sixes` integer DEFAULT 0 NOT NULL,
	`avg_strike_rate` real DEFAULT 0 NOT NULL,
	`highest_score` integer DEFAULT 0 NOT NULL,
	`fifties` integer DEFAULT 0 NOT NULL,
	`hundreds` integer DEFAULT 0 NOT NULL,
	`balls_bowled` integer DEFAULT 0 NOT NULL,
	`runs_conceded` integer DEFAULT 0 NOT NULL,
	`wickets_taken` integer DEFAULT 0 NOT NULL,
	`avg_economy` real DEFAULT 0 NOT NULL,
	`best_bowling` text,
	`fifers` integer DEFAULT 0 NOT NULL,
	`catches` integer DEFAULT 0 NOT NULL,
	`run_outs` integer DEFAULT 0 NOT NULL,
	`stumpings` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`tournament_id`) REFERENCES `tournaments`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`team_id`) REFERENCES `teams`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `players` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`age` integer NOT NULL,
	`batting_stance` text DEFAULT 'Right handed' NOT NULL,
	`bowling_stance` text,
	`is_wicket_keeper` integer DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE `team_players` (
	`id` integer PRIMARY KEY NOT NULL,
	`team_id` integer NOT NULL,
	`player_id` integer NOT NULL,
	`is_captain` integer DEFAULT false NOT NULL,
	FOREIGN KEY (`team_id`) REFERENCES `teams`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `teams` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`short_name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `tournamentTeams` (
	`id` integer PRIMARY KEY NOT NULL,
	`tournamentId` integer NOT NULL,
	`teamId` integer NOT NULL,
	`points` integer DEFAULT 0,
	`matchesPlayed` integer DEFAULT 0,
	`matchesWon` integer DEFAULT 0,
	`matchesLost` integer DEFAULT 0,
	`matchesTied` integer DEFAULT 0,
	`matchesDrawn` integer DEFAULT 0,
	FOREIGN KEY (`tournamentId`) REFERENCES `tournaments`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`teamId`) REFERENCES `teams`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `tournaments` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`start_date` integer NOT NULL,
	`end_date` integer NOT NULL,
	`format` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `over_idx` ON `balls` (`innings_id`,`bowler_id`);--> statement-breakpoint
CREATE INDEX `innings_idx` ON `balls` (`innings_id`);--> statement-breakpoint
CREATE INDEX `match_idx` ON `innings` (`match_id`);--> statement-breakpoint
CREATE INDEX `rank_idx` ON `matches` (`winner_id`);--> statement-breakpoint
CREATE INDEX `player_idx` ON `player_match_performance` (`player_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `player_match_performance_idx` ON `player_match_performance` (`player_id`,`match_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `unique_team_player` ON `team_players` (`team_id`,`player_id`);