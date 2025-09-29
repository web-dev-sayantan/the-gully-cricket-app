"use client";

import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Github } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import GoogleButton from "@/components/google-button";
import { emailOtp, signIn } from "@/lib/auth-client";
import { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { redirect } from "next/navigation";
import FacebookButton from "@/components/facebook-button";

const signinSchema = z.object({
  email: z.email(),
  otp: z.string().length(6, { message: "OTP must be 6 digits" }).optional(),
});
export default function SignIn() {
  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      otp: "",
    },
    mode: "onChange",
  });
  const [otpSent, setOtpSent] = useState(0);
  const [signinError, setSigninError] = useState("");

  async function signInWithSocial(provider: "facebook" | "google") {
    const { data, error } = await signIn.social({ provider });
    if (data && data.redirect) {
      redirect("/play/matches");
    } else {
      setSigninError("Login Failed. Try Again");
    }
  }

  async function sendOTP(email: string) {
    if (!email) return;
    const { data, error } = await emailOtp.sendVerificationOtp({
      email,
      type: "sign-in",
    });
    if (data && data.success) {
      setOtpSent(otpSent + 1);
    }
  }

  async function verifyOTP(formValues: z.infer<typeof signinSchema>) {
    const { data, error } = await signIn.emailOtp({
      email: formValues.email,
      otp: formValues.otp!,
    });
    if (data && data.user) {
      redirect("/dashboard");
    } else {
      setSigninError("Invalid Code");
    }
  }
  return (
    <div>
      <Card className="min-w-[400px]">
        <CardHeader className="flex flex-col items-center justify-center">
          <Image
            src="/logo-dark.svg"
            alt="logo"
            width={80}
            height={80}
            className="rounded-full"
          />
          <h1 className="text-center text-xl font-bold pt-2">Gully Cricket</h1>
          <CardDescription className="text-center">
            {otpSent
              ? "Check your email for the verification code"
              : "Sign in to your account with"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!otpSent && (
            <>
              <div className="flex w-full items-center gap-4 pb-4">
                <FacebookButton
                  className="w-full flex-1"
                  onClick={() => signInWithSocial("facebook")}
                />
                <GoogleButton
                  className="w-full flex-1"
                  onClick={() => signInWithSocial("google")}
                />
              </div>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
            </>
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(verifyOTP)}>
              {!otpSent ? (
                <FormField
                  key="email"
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor={field.name} className="font-semibold">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="Enter your email"
                        />
                      </FormControl>
                      <div className="h-6">
                        <FormMessage className="text-xs" />
                      </div>
                    </FormItem>
                  )}
                />
              ) : (
                <FormField
                  key="otp"
                  control={form.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-center justify-center gap-1">
                      <FormLabel htmlFor={field.name} className="font-semibold">
                        Verification Code
                      </FormLabel>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <div className="flex flex-col items-center justify-center gap-1">
                {otpSent ? (
                  <>
                    <Button
                      type="submit"
                      className="w-full font-bold"
                      disabled={
                        form.formState.isSubmitting ||
                        (!!form.getValues("otp") && !form.formState.isValid)
                      }
                    >
                      Verify
                    </Button>
                    <div className="flex items-center justify-center">
                      <Button
                        className="ml-2"
                        variant={"link"}
                        onClick={() => sendOTP(form.getValues().email)}
                      >
                        Resend Code
                      </Button>
                      <Button
                        className="ml-2"
                        variant={"link"}
                        onClick={() => setOtpSent(0)}
                      >
                        Change Email
                      </Button>
                    </div>
                  </>
                ) : (
                  <Button
                    type="button"
                    className="w-full font-bold"
                    disabled={form.getFieldState("email").invalid}
                    onClick={() => sendOTP(form.getValues().email)}
                  >
                    Send Code
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex items-center justify-center">
          <p className="text-sm text-muted-foreground">
            Do not have an account yet?{" "}
            <Link
              href="/sign-up"
              className="text-primary/80 underline-offset-2 hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
