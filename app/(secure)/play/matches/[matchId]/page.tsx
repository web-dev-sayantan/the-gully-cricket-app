export const runtime = "edge";
export default async function MatchPage(
  props: {
    params: Promise<{ matchId: string; scorecard: string; ball: string }>;
  }
) {
  const params = await props.params;

  const {
    matchId
  } = params;

  return <main className="flex flex-col size-full gap-3 p-4"></main>;
}
