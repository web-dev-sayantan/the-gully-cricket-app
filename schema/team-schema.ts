import { z } from "zod";

export const teamFormSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  shortName: z.string().min(2, { message: "Short Name is required" }),
  captain: z.coerce.number(),
});
