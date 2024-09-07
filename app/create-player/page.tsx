import { z } from "zod";
import { createPlayerAction } from "@/actions/create-player-action";
import PlayerForm from "./_components/player-form";
import { playerFormSchema } from "@/schema/player-schema";
import { error } from "console";

export default async function CreatePlayerPage() {
  async function onFormAction(
    prevState: {
      message: string;
      error?: string[];
    },
    formData: FormData
  ): Promise<{
    message: string;
    error?: string[];
  }> {
    "use server";
    const data: any = Object.fromEntries(formData);
    console.log(data);
    if (data.isWicketKeeper === "on") {
      data.isWicketKeeper = true;
    }
    const parsed = playerFormSchema.safeParse(data);
    if (!parsed.success) {
      return {
        message: "Invalid Player Data",
        error: parsed.error.issues.map((issue) => issue.message),
      };
    }
    try {
      const result = await createPlayerAction(parsed.data);
      if (result) {
        return {
          message: "Player created successfully",
        };
      }
    } catch (error) {
      console.log(error);
      return {
        message: "Failed to create player",
        error: ["Failed to create player"],
      };
    }
    return {
      message: "Something went wrong",
    };
  }
  return (
    <div className="flex flex-col gap-2 p-4">
      <h1 className="text-2xl text-center">New Player Form</h1>
      <PlayerForm onFormAction={onFormAction} />
    </div>
  );
}
