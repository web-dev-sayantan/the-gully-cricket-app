import "server-only";
import { db } from "@/db";
import { teams } from "@/db/schema";

export const getAllTeams = () => {
  return db.select().from(teams);
};
