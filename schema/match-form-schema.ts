import { z } from "zod";

const stringBool = z
  .union([
    z.enum(["false", "0"]).transform(() => false),
    z.boolean(),
    z.string(),
    z.number(),
  ])
  .pipe(z.coerce.boolean())
  .default(false)
  .optional();

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
  hasLBW: stringBool,
  hasBye: stringBool,
  hasLegBye: stringBool,
  hasBoundaryOut: stringBool,
});
