export const runtime = "edge";
export default async function MatchPage({
  params: { matchId },
}: {
  params: { matchId: string; scorecard: string; ball: string };
}) {
  return <main className="flex flex-col size-full gap-3 p-4"></main>;
}
