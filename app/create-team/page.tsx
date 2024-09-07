import { getAllPlayers } from "@/data/players";
import TeamForm from "./_components/team-form";
import { teamFormSchema } from "@/schema/team-schema";
import { createTeamAction } from "@/actions/create-team-action";

export default async function CreateTeamPage() {
  const players = await getAllPlayers();

  async function onFormAction(
    prevState: {
      message: string;
      error?: string[];
    },
    formdata: FormData
  ): Promise<{
    message: string;
    error?: string[];
  }> {
    "use server";
    const data: any = Object.fromEntries(formdata);
    console.log(data);
    const parsed = teamFormSchema.safeParse(data);
    if (!parsed.success) {
      return {
        message: "Invalid Team Data",
        error: parsed.error.issues.map((issue) => issue.message),
      };
    }
    try {
      const result = await createTeamAction(parsed.data);
      if (result) {
        return {
          message: "Team created successfully",
        };
      }
    } catch (error) {
      console.log(error);
      return {
        message: "Failed to create team",
        error: ["Failed to create team"],
      };
    }
    return {
      message: "Something went wrong",
    };
  }
  return (
    <section className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl text-center">Create Team</h1>
      <TeamForm players={players} onFormAction={onFormAction} />
    </section>
  );
}
