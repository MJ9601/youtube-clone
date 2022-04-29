import express from "express";
import logger from "./utils/logger";

const PORT = process.env.PORT || 4000;

const app = express();

const server = app.listen(PORT, () => {
  logger.info(`Server is listening at http: //localhost: ${PORT}`);
});

const singals = ["SIGTERM", "SIGINT"];

const graceFullShutDown = (signal: string) =>
  process.on(signal, async () => {
    server.close();

    //  disconnnecting from db

    logger.info("server has been shut down", signal);
    process.exit(0);
  });

singals.forEach((signal) => graceFullShutDown(signal));
