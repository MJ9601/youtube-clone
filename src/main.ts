import express from "express";
import { connectToDb, disconnectionFromDb } from "./utils/db";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import logger from "./utils/logger";
import { CORS_ORIGIN } from "./constants";
import userRoute from "./modules/user/user.route";
import authRoute from "./modules/auth/auth.route";
import videoRoute from './modules/videos/video.route'
import decondingUserCookie from "./middleware/decondingUserCookie";
import dotenv from 'dotenv'

dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  })
);
app.use(helmet());
app.use(decondingUserCookie)


app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use('/api/videos', videoRoute)

const server = app.listen(PORT, async () => {
  logger.info(`Server is running on http: //localhost: ${PORT}`);
  await connectToDb();
});

const singals = ["SIGTERM", "SIGINT"];

const graceFullShutDown = (signal: string) =>
  process.on(signal, async () => {
    server.close();

    //  disconnnecting from db
    await disconnectionFromDb();

    logger.info("server has been shut down", signal);
    process.exit(0);
  });

singals.forEach((signal) => graceFullShutDown(signal));
