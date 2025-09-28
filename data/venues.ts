import "server-only";

import { db } from "@/db";
import { venues } from "@/db/schema";

export const getAllVenues = () => {
  return db.select().from(venues);
};