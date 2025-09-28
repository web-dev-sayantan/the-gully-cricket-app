import { db } from "@/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { emailOTP } from "better-auth/plugins";
import { passkey } from "better-auth/plugins/passkey";
import { sendEmailOtp } from "./email-service";

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "sqlite" }),
  advanced: { database: { generateId: false } },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: "user",
        input: false,
      },
    },
  },
  plugins: [
    passkey(),
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        switch (type) {
          case "email-verification":
            await sendEmailOtp({
              email,
              otp,
              subject: "is your code to verify your Email",
            });
            break;
          case "sign-in":
            await sendEmailOtp({ email, otp });
            break;
          case "forget-password":
            await sendEmailOtp({
              email,
              otp,
              subject: "is your verification code to reset your password",
            });
            break;
          default:
            throw new Error("Invalid type");
        }
      },
      sendVerificationOnSignUp: true,
    }),
  ],
});
