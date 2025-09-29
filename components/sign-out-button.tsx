"use client";

import onSignOutAction from "@/actions/auth.action";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth-client";

export default function SignOutButton() {
  function handleSignOut() {
    signOut({
      fetchOptions: {
        onSuccess: () => {
          onSignOutAction();
        },
      },
    });
  }
  return (
    <Button
      variant="ghost"
      size="sm"
      className="font-semibold"
      onClick={handleSignOut}
    >
      Logout
    </Button>
  );
}
