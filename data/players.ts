import "server-only";
import { db } from "@/db";
import { Player, players } from "@/db/schema";

export const getAllPlayers: () => Promise<Player[]> = async () => {
  return await db.select().from(players);
};
