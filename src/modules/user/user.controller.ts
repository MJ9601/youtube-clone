import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { RegisterUserBody } from "./user.schema";
import { createUser } from "./user.service";

export const registerUserHandler = async (
  req: Request<{}, {}, RegisterUserBody>,
  res: Response
) => {
  const { username, email, password } = req.body;

  try {
    await createUser({ username, email, password });
    console.log(req.body);
    return res.status(StatusCodes.CREATED).send("user has been created!");
  } catch (err) {
    err.code === 11000
      ? res.status(StatusCodes.CONFLICT).send("user already exists!")
      : res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
  }
};
