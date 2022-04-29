import express from "express";
import { loginHandler } from "./auth.controller";

const router = express.Router();

router.post("/", loginHandler);

export default router;
