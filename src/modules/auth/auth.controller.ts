import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import omit from "../../middleware/omit";
import { findUser } from "../user/user.service";
import { LoginUserBody } from "./auth.schema";
import { createJwtToken } from "./auth.utils";

const DOMIN_NAME = process.env.DOMIN_NAME || "localhost";

export const loginHandler = async (
  req: Request<{}, {}, LoginUserBody>,
  res: Response
) => {
  const { email, password } = req.body;

  try {
    const user = await findUser(email);
    const verifiedPassword = await user?.comparingPassword(password);

    if (!user || !verifiedPassword)
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .send({ err: "Invalid informantion!" });

    const payload = omit(user.toJSON(), ["password", "__v"]);

    const jwtToken = createJwtToken(payload);

    res.cookie("accessToken", jwtToken, {
      maxAge: 3.154e10 /* 1 year */,
      httpOnly: true,
      domain: DOMIN_NAME,
      path: "/",
      sameSite: "strict",
      secure: false,
    });

    return res.status(StatusCodes.OK).send(jwtToken);
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
  }
};
