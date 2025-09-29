"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
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
import Link from "next/link";
import { signIn } from "@/lib/auth-client";
import GoogleButton from "@/components/google-button";
import GithubButton from "@/components/github-button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import FacebookButton from "@/components/facebook-button";

const signupSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
});

export default function SignUp() {
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  async function signUpWithSocial(provider: "facebook" | "google") {
    const { data, error } = await signIn.social({ provider });
    console.log(data);
  }
  return (
    <Card className="min-w-[400px]">
      <CardHeader className="flex flex-col items-center justify-center space-y-1">
        <Image
          src="/gully-cricket-app-logo.svg"
          alt="logo"
          height={80}
          width={120}
          className="rounded-full"
        />
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription className="text-center">
          Enter your information to get started
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <div className="flex w-full items-center gap-4 pb-4">
          <FacebookButton
            className="w-full flex-1"
            onClick={() => signUpWithSocial("facebook")}
          />
          <GoogleButton
            className="w-full flex-1"
            onClick={() => signUpWithSocial("google")}
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
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(console.log)}
            className="space-y-4 py-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={field.name}>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Enter your name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={field.name}>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Enter your email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col items-center justify-center">
              <Button type="submit" className="w-full font-bold">
                Get Started
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="text-primary/80 underline-offset-4 hover:underline"
          >
            Sign In
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
