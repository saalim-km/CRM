import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import logger from "./shared/utils/logger";
import { connectDB } from "./config/mongodb/mongodb.config";
import router from "./route/routes";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ALLOWED_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware to parse cookies
app.use(cookieParser());

// Middleware for parsing json data and req data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to log requests
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

app.use("/api/v_1", router);

connectDB();
app.listen(process.env.PORT || 3004, () => {
  logger.info(`Server running on port ${process.env.PORT}`);
});
