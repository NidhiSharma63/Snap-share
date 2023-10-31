import { passwordRegex } from "@/lib/constant/regex";
import * as z from "zod";

export const signUpFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be 2 character long" })
    .max(10, { message: "Name should not be 10 character long" }),
  username: z
    .string()
    .min(2, { message: "Username must be 2 character long" })
    .max(20, { message: "Username should not be 20 character long" }),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be 8 character long" })
    .regex(passwordRegex, "Pasword much contains special characters"),
});

export const signInFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: "Password require" }),
});

export const postFormSchema = z.object({
  caption: z.string().min(5, { message: "Caption is too short" }).max(2200, { message: "Caption is too long" }),
  tags: z.string().min(1, { message: "Password require" }),
  file: z.custom<File[]>(),
  location: z.string().min(2).max(100),
});
