import { createMatchAction } from "@/actions/create-match-action";
import { getAllTeams } from "@/data/teams";
import { MatchFormSchema } from "@/schema/match-form-schema";
import QuickMatchForm from "@/app/play/_components/create-match";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default async function QuickMatchPage() {
  const teams = await getAllTeams();

  async function onFormAction(
    prevState: {
      message: string;
      error?: string[];
    },
    formdata: FormData
  ) {
    "use server";
    const data: any = Object.fromEntries(formdata);
    const parsed = MatchFormSchema.safeParse(data);
    if (!parsed.success) {
      return {
        message: "Invalid Match Data",
        error: parsed.error.issues.map(
          (issue) => `${issue.path}: ${issue.message}`
        ),
      };
    }
    let result;

    try {
      result = await createMatchAction(parsed.data);
    } catch (error) {
      console.log(error);
      return {
        message: "Failed to create match",
        error: ["Failed to create match"],
      };
    }
    if (result) {
      revalidatePath("/play/matches");
      redirect("/play/matches");
    }

    return {
      message: "Something went wrong",
    };
  }
  return (
    <section className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl text-center">Create Quick Match</h1>
      <QuickMatchForm teams={teams} onFormAction={onFormAction} />
    </section>
  );
}
