import { createAuthClient } from "better-auth/react";
import { emailOTPClient, passkeyClient } from "better-auth/client/plugins";

export const { signIn, signUp, signOut, useSession, emailOtp, passkey } =
  createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    plugins: [emailOTPClient(), passkeyClient()],
  });
