import { User, UserModel } from "./user.model";

export const createUser = async (user: Omit<User, "comparingPassword">) =>
  UserModel.create(user);

export const findUser = async (email: User["email"]) =>
  UserModel.findOne({ email: email });
