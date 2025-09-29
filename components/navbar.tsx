import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@/lib/auth";
import ThemeToggle from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import SignOutButton from "@/components/sign-out-button";
import { ArrowRight } from "lucide-react";

export default async function Navbar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <nav className="sticky inset-x-0 top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between border-b border-border bg-brand-25 px-4 py-3 text-sm font-medium text-foreground backdrop-blur-lg transition-all">
      <MaxWidthWrapper className="flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo-dark.svg"
            alt="logo"
            width={28}
            height={28}
            className="rounded-full"
          />
          <h1 className="text-center font-heading text-xl font-bold text-brand-700">
            <span className="text-brand-800">Gully Cricket</span>
          </h1>
        </Link>
        <div className="flex h-full items-center space-x-4">
          {session?.user ? (
            <div className="flex items-center gap-2">
              <SignOutButton />
              <Link href="/dashboard">
                <Button size="sm" className="font-semibold">
                  <span>Dashboard</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          ) : (
            <Link href="/sign-in">
              <Button className="h-9 text-xs font-semibold">Sign In</Button>
            </Link>
          )}
          <ThemeToggle />
        </div>
      </MaxWidthWrapper>
    </nav>
  );
}
