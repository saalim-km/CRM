import { Request, Response } from "express";
import { loginSchema, signupSchema } from "../../shared/utils/zod.validation";
import { AuthService } from "./auth.service";
import { ResponseHandler } from "../../shared/helper/responseHandler";
import {
  ERROR_MESSAGES,
  HTTP_STATUS,
  SUCCESS_MESSAGES,
} from "../../shared/utils/constants";
import {
  clearAuthCookies,
  setAuthCookies,
  updateCookieWithAccessToken,
} from "../../shared/helper/cookieHelper";
import { CustomRequest } from "../../middlewares/auth.middleware";
import { jwtService } from "../../shared/utils/jwtService";

async function signUp(req: Request, res: Response) {
  const parsed = signupSchema.parse(req.body);
  await AuthService.signup(parsed);
  ResponseHandler.success(res, SUCCESS_MESSAGES.ACCOUNT_CREATED);
}

async function login(req: Request, res: Response) {
  const parsed = loginSchema.parse(req.body);

  const user = await AuthService.login(parsed);

  const tokens = AuthService.generateTokens({
    _id: user._id,
    email: user.email,
  });

  setAuthCookies(res, tokens.accessToken, tokens.refreshToken);

  ResponseHandler.success(res, SUCCESS_MESSAGES.LOGIN_SUCCESS, user);
}

async function refreshToken(req: Request, res: Response) {
  const user = (req as CustomRequest).user;

  const accessToken = await AuthService.refreshToken(user);
  if (user.role && user.role !== undefined) {
    updateCookieWithAccessToken(res, accessToken);
    ResponseHandler.success(res, SUCCESS_MESSAGES.REFRESH_TOKEN_SUCCESS);
    return;
  }

  ResponseHandler.error(
    res,
    ERROR_MESSAGES.UNAUTHORIZED_ACCESS,
    {},
    HTTP_STATUS.UNAUTHORIZED
  );
}

async function logout(req: Request, res: Response) {
  const user = (req as CustomRequest).user;

  if (!user || !user._id) {
    return ResponseHandler.error(
      res,
      ERROR_MESSAGES.UNAUTHORIZED_ACCESS,
      {},
      HTTP_STATUS.UNAUTHORIZED
    );
  }

  clearAuthCookies(res);

  ResponseHandler.success(res, SUCCESS_MESSAGES.LOGOUT_SUCCESS);
}

export const AuthController = {
  signUp,
  login,
  refreshToken,
  logout,
};
