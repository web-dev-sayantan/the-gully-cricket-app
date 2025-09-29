import MaxWidthWrapper from "@/components/max-width-wrapper";
import Navbar from "@/components/navbar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { Suspense } from "react";

export default async function SecurePagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return (
      <p>
        You are not authorized to view this page. Please{" "}
        <Link href="/sign-in">Sign In</Link>
      </p>
    );
  }
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col bg-background text-foreground">
        <MaxWidthWrapper className="py-4">
          <Suspense fallback={<p>Loading Secure Page...</p>}>
            {children}
          </Suspense>
        </MaxWidthWrapper>
      </main>
    </>
  );
}
