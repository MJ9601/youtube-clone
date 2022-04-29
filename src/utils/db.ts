import mongoose from "mongoose";
import logger from "./logger";

const DB_CONNECTION_STRING =
  process.env.DB_CONNECTION_STRING || "mongodb://localhost/youTubeClone";

export const connectToDb = async () => {
  try {
    await mongoose.connect(DB_CONNECTION_STRING);
    logger.info("connected ..");
  } catch (err) {
    logger.info({ err, message: "Some thing went wrong!" });
    process.exit(1);
  }
};

export const disconnectionFromDb = async () => {
  await mongoose.connection.close();
  logger.info("Disconnected ..");

  return;
};
