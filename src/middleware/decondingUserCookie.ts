import { Request, Response, NextFunction } from "express";
import { vrifyJwtToken } from "../modules/auth/auth.utils";

const decondingUserCookie = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = (
    req.cookies.accessToken ||
    req.headers.authorization ||
    ""
  ).replace(/^Bearer\s/, "");

  if (!accessToken) return next();

  const decodedToken = vrifyJwtToken(accessToken);
  if (decodedToken) res.locals.user = decodedToken;

  return next();
};

export default decondingUserCookie;
