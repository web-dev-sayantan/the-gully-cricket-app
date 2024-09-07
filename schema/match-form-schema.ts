import { z } from "zod";

export const MatchFormSchema = z.object({
  matchDate: z.date().optional(),
  tossWinner: z.coerce.number(),
  battingFirstTeam: z.coerce.number(),
  battingSecondTeam: z.coerce.number(),
  oversPerSide: z.coerce
    .number()
    .min(1, { message: "Overs per side is required" }),
  maxOverPerBowler: z.coerce.number().min(1, {
    message: "Max over per bowler is required",
  }),
  winner: z.coerce.number().optional(),
  loser: z.coerce.number().optional(),
  result: z.string().optional(),
});
