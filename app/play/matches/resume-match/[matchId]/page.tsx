import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getInningsByMatchId } from "@/data/innings";
import Link from "next/link";

export const runtime = "edge";
export default async function ResumeMatchPage(props: {
  params: Promise<{ matchId: string }>;
}) {
  const params = await props.params;

  const { matchId } = params;

  const inningsIds = await getInningsByMatchId(+matchId);
  console.log(inningsIds);

  return (
    <div className="w-full flex flex-col gap-y-4 p-4">
      <h1 className="text-2xl text-center">Choose Innings to Resume</h1>
      <ul className="w-full flex flex-col gap-4">
        {inningsIds.map(
          ({ id, totalScore, wickets, battingTeam, ballsBowled, balls }) => (
            <li key={id} className="w-full">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center text-xl">
                    {battingTeam.name}
                  </CardTitle>
                  <CardDescription className="text-center">
                    <p className="flex w-full items-baseline justify-center gap-1 text-xl">
                      <span className="font-bold pl-1">{totalScore}</span>
                      <span> / </span>
                      <span className="text-red-500 font-bold">{wickets}</span>
                      <span className="text-muted-foreground font-light text-lg">
                        &nbsp;in&nbsp;
                      </span>
                      <span className="font-bold">
                        {Math.floor(ballsBowled / 6)}.{ballsBowled % 6}
                      </span>
                      <span className="text-muted-foreground font-light text-lg">
                        {" "}
                        overs
                      </span>
                    </p>
                  </CardDescription>
                </CardHeader>
                <CardContent></CardContent>
                <CardFooter>
                  <Link
                    className="w-full block"
                    href={`/play/matches/${matchId}/${id}/${
                      balls.find((b) => b.ballNumber === ballsBowled + 1)?.id ||
                      1
                    }`}
                  >
                    <Button className="w-full">Resume</Button>
                  </Link>
                </CardFooter>
              </Card>
            </li>
          ),
        )}
      </ul>
    </div>
  );
}
