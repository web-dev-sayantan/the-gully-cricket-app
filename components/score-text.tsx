"use client";

export const ScoreText = ({
  runs,
  wickets,
  balls,
}: {
  runs: number;
  wickets: number;
  balls: number;
}) => {
  return (
    <div className="flex items-center gap-2">
      <p className="flex items-center gap-1 text-xl">
        <span className="font-bold">{runs}</span>
        <span> / </span>
        <span className="text-red-500 font-bold">{wickets}</span>
      </p>
      <p className="flex items-baseline gap-1">
        <span className="text-muted-foreground font-normal">in</span>
        <span className="font-bold">
          {Math.floor(balls / 6)}.{balls % 6}
        </span>
        <span className="text-muted-foreground font-normal"> overs</span>
      </p>
    </div>
  );
};
