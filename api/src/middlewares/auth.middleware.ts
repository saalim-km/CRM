import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { ERROR_MESSAGES, HTTP_STATUS } from "../shared/utils/constants";
import { jwtService } from "../shared/utils/jwtService";
import logger from "../shared/utils/logger";

export interface CustomJwtPayload extends JwtPayload {
  id: string;
  email: string;
  access_token: string;
  refresh_token: string;
}

export interface CustomRequest extends Request {
  user: CustomJwtPayload;
}

const extractToken = (
  req: Request
): { access_token: string; refresh_token: string } | null => {
  const pathSegments = req.path.split("/");
  const privateRouteIndex = pathSegments.indexOf("");

  if (privateRouteIndex !== -1 && pathSegments[privateRouteIndex + 1]) {
    return {
      access_token: req.cookies[`user_AT`] || null,
      refresh_token: req.cookies[`user_RT`] || null,
    };
  }

  return null;
};

export const verifyAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = extractToken(req);
    if (!token) {
      res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ message: ERROR_MESSAGES.UNAUTHORIZED_ACCESS });
      return;
    }

    const user = jwtService.verifyAccessToken(
      token.access_token
    ) as CustomJwtPayload;

    if (!user || !user._id) {
      res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ message: ERROR_MESSAGES.UNAUTHORIZED_ACCESS });
      return;
    }

    (req as CustomRequest).user = {
      ...user,
      access_token: token.access_token,
      refresh_token: token.refresh_token,
    };

    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ message: ERROR_MESSAGES.TOKEN_EXPIRED });
      return;
    }

    res
      .status(HTTP_STATUS.UNAUTHORIZED)
      .json({ message: ERROR_MESSAGES.INVALID_TOKEN });
    return;
  }
};

export const decodeToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    logger.info("access token expire triggered");
    const token = extractToken(req);
    console.log("extracted token for decoding : ", token);

    if (!token) {
      res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ message: ERROR_MESSAGES.UNAUTHORIZED_ACCESS });
      return;
    }

    try {
      // verify refresh token to create new access with it
      const user = jwtService.verifyRefreshToken(token?.refresh_token);
      console.log("user from access token decode : ", user);

      if (!user) {
        res
          .status(HTTP_STATUS.UNAUTHORIZED)
          .json({ message: ERROR_MESSAGES.UNAUTHORIZED_ACCESS });
        return;
      }

      (req as CustomRequest).user = {
        id: user?.id,
        email: user?.email,
        access_token: token.access_token,
        refresh_token: token.refresh_token,
      };
      next();
    } catch (tokenError) {
      // Access token is expired/invalid, try to refresh
      console.log("Access token invalid, attempting refresh...", tokenError);
      res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ message: ERROR_MESSAGES.TOKEN_EXPIRED });
      return;
    }
  } catch (error) {
    console.error("Token decode error:", error);
    res
      .status(HTTP_STATUS.UNAUTHORIZED)
      .json({ message: ERROR_MESSAGES.UNAUTHORIZED_ACCESS });
  }
};
