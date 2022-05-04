import express from "express";
import { processRequestBody } from "zod-express-middleware";
import requiringUser from "../../middleware/requiringUser";
import { registerUserHandler } from "./user.controller";
import { registerUserSchema } from "./user.schema";

const router = express.Router();

router.get("/", requiringUser, (req, res) => res.send(res.locals.user));
router.post(
  "/",
  processRequestBody(registerUserSchema.body), // if an unknown field does pass down to post request this func prevent it from reaching to controller and database //
  registerUserHandler
);

export default router;
