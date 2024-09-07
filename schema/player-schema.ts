import { z } from "zod";

export const playerFormSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  age: z.coerce.number().min(1, { message: "Age is required" }),
  battingStance: z.string(),
  bowlingStance: z.string(),
  isWicketKeeper: z.boolean().optional(),
});
