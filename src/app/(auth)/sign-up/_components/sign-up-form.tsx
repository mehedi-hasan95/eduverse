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
import { singUpSchema } from "@/schemas/auth.schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserType } from "@prisma/client";
import { useSignUp } from "@clerk/nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { onSignUpUser } from "@/action/auth";
import OTPInput from "./otp-input";
import { LoadingButton } from "@/components/common/loading-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export const SignUpForm = () => {
  const { setActive, isLoaded, signUp } = useSignUp();
  const [creating, setCreating] = useState<boolean>(false);
  const [verifying, setVerifying] = useState<boolean>(false);
  const [code, setCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof singUpSchema>>({
    mode: "onChange",
    resolver: zodResolver(singUpSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
      userType: undefined,
    },
  });

  // 2. Define a submit handler.

  const onGenerateCode = async (email: string, password: string) => {
    if (!isLoaded)
      return toast("Error", {
        description: "Oops! something went wrong",
      });
    try {
      setLoading(true);
      if (email && password) {
        await signUp.create({
          emailAddress: email,
          password: password,
        });

        await signUp.prepareEmailAddressVerification({
          strategy: "email_code",
        });
        setLoading(true);
        setVerifying(true);
      } else {
        setLoading(false);
        return toast("Error", {
          description: "Fill the required fields",
        });
      }
    } catch (error: any) {
      // console.error(JSON.stringify(error, null, 2));
      if (error.status === 422) {
        setLoading(false);
        return toast("Error", { description: error.errors[0].message });
      }
    }
  };
  async function onSubmit(values: z.infer<typeof singUpSchema>) {
    if (!isLoaded)
      return toast("Error", {
        description: "Oops! something went wrong",
      });
    try {
      setCreating(true);
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (signUpAttempt.status !== "complete") {
        return toast("Error", {
          description: "Oops! something went wrong, status in complete",
        });
      }
      if (signUpAttempt.status === "complete") {
        if (!signUp.createdUserId) return;
        const user = await onSignUpUser({
          firstname: values.firstname,
          lastname: values.lastname,
          image: "",
          clerkId: signUp.createdUserId,
          userType: values.userType as any,
        });

        form.reset();
        if (user.status === 200) {
          toast("Success", {
            description: user.message,
          });
          await setActive({ session: signUpAttempt.createdSessionId });
          router.push(`/group/create`);
        }
        if (user.status !== 200) {
          toast("Error", {
            description: user.message + "action failed",
          });
          router.refresh();
        }
        setCreating(false);
        setVerifying(false);
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
        return;
      }
    } catch (error: any) {
      setCreating(false);
      return toast("Error", { description: error.errors[0].longMessage });
    }
  }
  return (
    <Card className="max-w-3xl mx-auto dark:bg-themeBlack">
      <CardHeader className="text-center">
        <CardTitle className="text-gradient text-2xl font-bold">
          Sign up Form
        </CardTitle>
        <CardDescription className="text-xl pt-1 text-gradient">
          Sign up and ensure a smooth and secure onboarding process for new
          users, setting the stage for a positive learning experience
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col space-y-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {verifying ? (
              <div className="flex mb-5 flex-col items-center">
                <h2 className="dark:text-gradient text-2xl font-bold pb-3">
                  Add your Verification Code:
                </h2>
                <OTPInput otp={code} setOtp={setCode} />
              </div>
            ) : (
              <>
                <FormField
                  control={form.control}
                  name="firstname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="dark:text-white">
                        First Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="dark:text-white"
                          placeholder="Mehedi"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="dark:text-white">
                        Last Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="dark:text-white"
                          placeholder="Hasan"
                          {...field}
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
                      <FormLabel className="dark:text-white">Email</FormLabel>
                      <FormControl>
                        <Input
                          className="dark:text-white"
                          type="email"
                          placeholder="me@me.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="userType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="dark:text-white">
                        User Role
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="dark:text-white">
                              <SelectValue placeholder="Select your role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value={UserType.STUDENT}>
                              Student
                            </SelectItem>
                            <SelectItem value={UserType.TEACHER}>
                              Teacher
                            </SelectItem>
                          </SelectContent>
                        </Select>
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
                      <FormLabel className="dark:text-white">
                        Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="dark:text-white"
                          type="password"
                          placeholder="***"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="dark:text-white">
                        Confirm Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="dark:text-white"
                          type="password"
                          placeholder="***"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            {verifying ? (
              <>
                {creating ? (
                  <LoadingButton />
                ) : (
                  <Button
                    disabled={creating}
                    type="submit"
                    className="rounded-2xl"
                    variant={"outline"}
                  >
                    Sign Up with Email
                  </Button>
                )}
              </>
            ) : (
              <>
                {loading ? (
                  <LoadingButton />
                ) : (
                  <Button
                    type="button"
                    className="rounded-2xl"
                    variant={"outline"}
                    onClick={() =>
                      onGenerateCode(
                        form.getValues("email"),
                        form.getValues("password")
                      )
                    }
                  >
                    Sign Up with Email
                  </Button>
                )}
              </>
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

      <CardContent>
        <div className="text-center dark:text-white">
          Already have an account?{" "}
          <Link className="text-blue-400 underline" href={"/sign-in"}>
            Sign In
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
