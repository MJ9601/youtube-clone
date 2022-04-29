import { UserModel } from "./user.model";

export const createUser = async(user) => UserModel.create(user)