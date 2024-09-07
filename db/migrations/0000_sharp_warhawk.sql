CREATE TABLE `balls` (
	`id` integer PRIMARY KEY NOT NULL,
	`match_id` integer NOT NULL,
	`scorecard_id` integer NOT NULL,
	`batting_team_id` integer NOT NULL,
	`bowling_team_id` integer NOT NULL,
	`striker_id` integer NOT NULL,
	`non_striker_id` integer NOT NULL,
	`bowler_id` integer NOT NULL,
	`ball_number` integer NOT NULL,
	`runs_scored` integer DEFAULT 0 NOT NULL,
	`wicket` integer DEFAULT false NOT NULL,
	`wicket_type` text,
	`caught_by` integer,
	`run_out_by` integer,
	`stumped_by` integer,
	`is_extra` integer DEFAULT false NOT NULL,
	`extra_type` text,
	FOREIGN KEY (`match_id`) REFERENCES `matches`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`scorecard_id`) REFERENCES `score_card`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`batting_team_id`) REFERENCES `teams`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`bowling_team_id`) REFERENCES `teams`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`striker_id`) REFERENCES `players`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`non_striker_id`) REFERENCES `players`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`bowler_id`) REFERENCES `players`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`caught_by`) REFERENCES `players`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`run_out_by`) REFERENCES `players`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`stumped_by`) REFERENCES `players`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `matches` (
	`id` integer PRIMARY KEY NOT NULL,
	`match_date` integer NOT NULL,
	`toss_winner_id` integer NOT NULL,
	`batting_first_team_id` integer NOT NULL,
	`batting_second_team_id` integer NOT NULL,
	`overs_per_side` integer DEFAULT 20 NOT NULL,
	`max_over_per_bowler` integer DEFAULT 4 NOT NULL,
	`result` text,
	`winner` integer,
	`loser` integer,
	FOREIGN KEY (`toss_winner_id`) REFERENCES `teams`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`batting_first_team_id`) REFERENCES `teams`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`batting_second_team_id`) REFERENCES `teams`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`winner`) REFERENCES `teams`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`loser`) REFERENCES `teams`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `player_performance` (
	`id` integer PRIMARY KEY NOT NULL,
	`player_id` integer NOT NULL,
	`score_card_id` integer NOT NULL,
	`batting_position` integer DEFAULT 1 NOT NULL,
	`did_bat` integer DEFAULT false NOT NULL,
	`runs_scored` integer DEFAULT 0 NOT NULL,
	`balls_faced` integer DEFAULT 0 NOT NULL,
	`is_dismissed` integer DEFAULT false NOT NULL,
	`dismissal_type` text,
	`dismissed_by` integer,
	`dismissal_supported_by` integer,
	`did_bowl` integer DEFAULT false NOT NULL,
	`bowling_position` integer DEFAULT 1 NOT NULL,
	`balls_bowled` integer DEFAULT 0 NOT NULL,
	`runs_conceded` integer DEFAULT 0 NOT NULL,
	`wickets_taken` integer DEFAULT 0 NOT NULL,
	`maidens` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`score_card_id`) REFERENCES `score_card`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`dismissed_by`) REFERENCES `players`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`dismissal_supported_by`) REFERENCES `players`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `players` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`age` integer NOT NULL,
	`batting_stance` text DEFAULT 'Right handed' NOT NULL,
	`bowling_stance` text,
	`is_wicket_keeper` integer DEFAULT false NOT NULL,
	`matches_played` integer DEFAULT 0 NOT NULL,
	`runs_scored` integer DEFAULT 0 NOT NULL,
	`balls_faced` integer DEFAULT 0 NOT NULL,
	`times_dismissed` integer DEFAULT 0 NOT NULL,
	`fifties` integer DEFAULT 0 NOT NULL,
	`hundreds` integer DEFAULT 0 NOT NULL,
	`wickets_taken` integer DEFAULT 0 NOT NULL,
	`balls_bowled` integer DEFAULT 0 NOT NULL,
	`fifers` integer DEFAULT 0 NOT NULL,
	`catches_taken` integer DEFAULT 0 NOT NULL,
	`run_outs` integer DEFAULT 0 NOT NULL,
	`stumpings` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `score_card` (
	`id` integer PRIMARY KEY NOT NULL,
	`match_id` integer NOT NULL,
	`team_id` integer NOT NULL,
	`total_score` integer DEFAULT 0 NOT NULL,
	`wickets` integer DEFAULT 0 NOT NULL,
	`balls` integer DEFAULT 0 NOT NULL,
	`target` integer DEFAULT 0 NOT NULL,
	`extras` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`match_id`) REFERENCES `matches`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`team_id`) REFERENCES `teams`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `teams` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`short_name` text NOT NULL,
	`captain` integer NOT NULL,
	`player_1` integer NOT NULL,
	`player_2` integer NOT NULL,
	`player_3` integer NOT NULL,
	`player_4` integer NOT NULL,
	`player_5` integer NOT NULL,
	`player_6` integer,
	`player_7` integer,
	`player_8` integer,
	`player_9` integer,
	`player_10` integer,
	`player_11` integer,
	FOREIGN KEY (`captain`) REFERENCES `players`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`player_1`) REFERENCES `players`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`player_2`) REFERENCES `players`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`player_3`) REFERENCES `players`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`player_4`) REFERENCES `players`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`player_5`) REFERENCES `players`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`player_6`) REFERENCES `players`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`player_7`) REFERENCES `players`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`player_8`) REFERENCES `players`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`player_9`) REFERENCES `players`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`player_10`) REFERENCES `players`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`player_11`) REFERENCES `players`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `over_idx` ON `balls` (`match_id`,`bowler_id`);--> statement-breakpoint
CREATE INDEX `match_idx` ON `balls` (`match_id`,`batting_team_id`);--> statement-breakpoint
CREATE INDEX `match_team_ball_number_idx` ON `balls` (`match_id`,`batting_team_id`,`bowling_team_id`,`ball_number`);--> statement-breakpoint
CREATE UNIQUE INDEX `player_performance_player_id_score_card_id_unique` ON `player_performance` (`player_id`,`score_card_id`);--> statement-breakpoint
CREATE INDEX `player_idx` ON `player_performance` (`player_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `player_score_idx` ON `player_performance` (`player_id`,`score_card_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `score_card_match_id_team_id_unique` ON `score_card` (`match_id`,`team_id`);