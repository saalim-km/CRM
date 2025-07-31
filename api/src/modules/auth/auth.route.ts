import express from "express";
import { asyncHandler } from "../../shared/helper/asyncHandler";
import { AuthController } from "./auth.controller";
import { decodeToken } from "../../middlewares/auth.middleware";


const AuthRoute = express.Router();

AuthRoute.post('/signup' ,asyncHandler(AuthController.signUp));
AuthRoute.post('/login', asyncHandler(AuthController.login));
AuthRoute.post('/refresh-token',decodeToken, asyncHandler(AuthController.refreshToken));
AuthRoute.post('/logout',decodeToken, asyncHandler(AuthController.logout));

export default AuthRoute;