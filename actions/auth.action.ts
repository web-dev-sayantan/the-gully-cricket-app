"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function onSignOutAction(path = "/") {
  revalidatePath(path);
  redirect(path);
}
