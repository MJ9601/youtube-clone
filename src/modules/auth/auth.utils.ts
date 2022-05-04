import jwt from "jsonwebtoken";

const SECRECT_KEY = process.env.SECRECT_KEY || "youTubeSecrectKey";
const EXPIRED_IN = process.env.EXPIRED_IN || "10d";

export const createJwtToken = (payload: string | Buffer | object) =>
  jwt.sign(payload, SECRECT_KEY, {
    expiresIn: EXPIRED_IN,
  });

export const vrifyJwtToken = (token: string) => {
  try {
    const verifiedToken = jwt.verify(token, SECRECT_KEY);
    return verifiedToken;
  } catch (err) {
    return null;
  }
};
