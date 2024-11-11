import { UserType } from "@prisma/client";
import { z } from "zod";
export const singUpSchema = z
  .object({
    firstname: z
      .string()
      .min(2, { message: "Fist name must be over 2 character" })
      .max(50, { message: "First Name must be less than 50 characters." }),
    lastname: z
      .string()
      .min(2, { message: "Last name must be over 2 character" })
      .max(50, { message: "Last name must be less than 50 characters." }),
    email: z.string({ message: "Email must not be empty" }),
    userType: z.enum([UserType.STUDENT, UserType.TEACHER]).optional(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Password must contain at least one special character",
      }),
    confirmPassword: z.string(),
  })
  .refine((schema) => schema.password === schema.confirmPassword, {
    message: "password do not match",
    path: ["confirmPassword"],
  });

export const singInSchema = z.object({
  email: z.string().min(1, { message: "Email is empty" }),
  password: z.string().min(1, { message: "Password is empty" }),
});
