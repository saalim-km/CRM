import express from "express";
import AuthRoute from "../modules/auth/auth.route";

const router = express.Router();

// All modular routes here
// router.use("/users", userRoutes);
router.use("/auth", AuthRoute);

export default router;