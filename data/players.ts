import "server-only";
import { db } from "@/db";
import { players } from "@/db/schema";
import { Player } from "@/db/types";

export const getAllPlayers: () => Promise<Player[]> = async () => {
  return await db.select().from(players);
};
