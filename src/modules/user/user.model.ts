import { getModelForClass, prop, pre } from "@typegoose/typegoose";
import argon2 from "argon2";

@pre<User>("save", async function (next) {
  if (this.isModified("password") || this.password) {
    const hash = await argon2.hash(this.password);
    this.password = hash;
    return next();
  }
})
export class User {
  @prop({ required: true, unique: true })
  public username: string;

  @prop({ required: true, unique: true })
  public email: string;

  @prop({ required: true, unique: false })
  public password: string;

  public comparingPassword = async (password: string): Promise<boolean> =>
    await argon2.verify(password, this.password);
}

export const UserModel = getModelForClass(User, {
  schemaOptions: {
    timestamps: true,
  },
});
