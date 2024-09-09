import { z } from "zod";

export const MatchFormSchema = z.object({
  matchDate: z.date().optional(),
  tossWinnerId: z.coerce.number(),
  tossDecision: z.string().default("bat"),
  team1Id: z.coerce.number(),
  team2Id: z.coerce.number(),
  oversPerSide: z.coerce
    .number()
    .min(1, { message: "Overs per side is required" }),
  maxOverPerBowler: z.coerce.number().min(1, {
    message: "Max over per bowler is required",
  }),
  winnerId: z.coerce.number().optional(),
  result: z.string().optional(),
});
