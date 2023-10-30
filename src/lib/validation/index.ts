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
    .max(10, { message: "Username should not be 10 character long" }),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be 8 character long" })
    .regex(passwordRegex, "Pasword much contains special characters"),
});
