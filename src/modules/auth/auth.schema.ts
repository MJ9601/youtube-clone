import { object, TypeOf, string } from "zod";

export const loginUserSchema = {
  body: object({
    email: string({
      required_error: "email is required!",
    }).email("type must be email"),

    password: string({
      required_error: "password is required",
    })
      .min(6, "password should be atleast 7 charectors")
      .max(32, "max length of password is 32"),
  }),
};

export type LoginUserBody = TypeOf<typeof loginUserSchema.body>;
