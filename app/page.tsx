import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col size-full gap-3 p-4">
      <div className="flex flex-col gap-4 p-4 border rounded-lg">
        <Link href="/play/quick-match" className="w-full">
          Quick Match
        </Link>
        <Link href="/play/matches" className="w-full">
          Matches
        </Link>
        <Link href="/create-team" className="w-full">
          Create Team
        </Link>
        <Link href="/create-player" className="w-full">
          Create Player
        </Link>
      </div>
    </main>
  );
}
