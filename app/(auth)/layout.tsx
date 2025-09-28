export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="bg-background flex h-full min-h-screen w-full flex-col items-center justify-center">
      <div className="flex w-full items-center justify-center py-24">
        {children}
      </div>
    </main>
  );
}
