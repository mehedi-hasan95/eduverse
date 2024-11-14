/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { singInSchema } from "@/schemas/auth.schema";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LoadingButton } from "@/components/common/loading-button";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { GoogleAuthButton } from "./google-oauth-button";

export const SignInForm = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof singInSchema>>({
    resolver: zodResolver(singInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof singInSchema>) {
    if (!isLoaded) {
      return toast("Error", { description: "Opps! Something went wrong😢😢" });
    }
    try {
      setLoading(true);
      const signInAttempt = await signIn.create({
        identifier: values.email,
        password: values.password,
      });
      if (signInAttempt.status === "complete") {
        form.reset();
        await setActive({ session: signInAttempt.createdSessionId });
        toast("Success", { description: "Welcome back!❤️❤️" });
        setLoading(false);
        router.push("/callback/sign-in");
      }
    } catch (error: any) {
      if (error.errors[0].code === "form_identifier_not_found")
        toast("Error", {
          description: "email/password is incorrect try again 😣😣",
        });
    } finally {
      setLoading(false);
    }
  }
  return (
    <Card className="max-w-2xl mx-auto dark:bg-themeBlack">
      <CardHeader className="text-center">
        <CardTitle className="text-gradient text-2xl font-bold">
          Welcome Back!! Please Login
        </CardTitle>
        <CardDescription className="text-xl pt-1 text-gradient">
          You can create a strong and memorable first impression for your LMS by
          inviting users to explore and learn.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col space-y-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="email@email.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="***" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {loading ? (
              <LoadingButton />
            ) : (
              <Button variant={"outline"} type="submit">
                Submit
              </Button>
            )}
          </form>
        </Form>
      </CardContent>
      <div className="my-5 w-full relative">
        <div className="bg-black p-3 absolute text-themeTextGray text-xs top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          OR CONTINUE WITH
        </div>
        <Separator orientation="horizontal" className="bg-themeGray" />
      </div>
      <GoogleAuthButton method="signin" />
      <CardContent>
        <div className="text-center pt-8">
          Don&apos;t have an account?{" "}
          <Link className="text-blue-400 underline" href={"/sign-up"}>
            Sign Up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
