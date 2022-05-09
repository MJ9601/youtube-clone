import { TypeOf, object, string } from "zod";

export const registerUserSchema = {
  body: object({
    username: string({
      required_error: "username is requird!",
    }) /*    the object is zod is required by defualt for unrequired field use .optainal()  */,

    email: string({
      required_error: "email is requird!",
    }),

    password: string({
      required_error: "password is requird!",
    })
      .min(6, "password should be atleast 7 letter!")
      .max(
        32,
        "max number of letter for password is 32"
      ) /*    the object is zod is required by defualt for unrequired field use .optainal()  */,

    confirmPassword: string({
      required_error: "comfirmedPass is requird!",
    }) /*    the object is zod is required by defualt for unrequired field use .optainal()  */,
  }).refine((data) => data.password == data.confirmPassword, {
    message: "Password should be match with comfirmedPass!",
    path: ["comfirmedPassword"],
  }),
};

export type RegisterUserBody = TypeOf<typeof registerUserSchema.body>;
