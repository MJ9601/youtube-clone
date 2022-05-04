import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

const requiringUser = (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;

  if (!user) return res.sendStatus(StatusCodes.UNAUTHORIZED);

  return next();
};

export default requiringUser;
