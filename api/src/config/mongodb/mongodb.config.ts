import mongoose from "mongoose";
import logger from "../../shared/utils/logger";
import dotenv from "dotenv";
dotenv.config();

const MONGOURI = process.env.MONGODB_URI;

if (!MONGOURI) {
  throw new Error("Mongodb string is missing");
}

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGOURI);
    logger.info("Database connect aayitta");

    mongoose.connection.on("error", (error) => {
      console.error("MongoDB connection error:", error);
    });

    mongoose.connection.on("connected", () => {
      logger.info("✅ MongoDB connected");
    });

    mongoose.connection.on("reconnected", () => {
      logger.info("♻️ MongoDB reconnected");
    });

    mongoose.connection.on("disconnected", () => {
      logger.warn("⚠️ MongoDB disconnected");
    });

    mongoose.connection.on("error", (error) => {
      logger.error("🔥 MongoDB error", error);
    });
  } catch (error) {
    logger.error("Error connecting database");
    console.log(error);
  }
};
