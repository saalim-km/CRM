import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import ms from "ms";
import dotenv from 'dotenv'

dotenv.config();

export type TJwtPayload = {
  id: string;
  email: string;
  iat?: number; // issued at
  exp?: number; // expiration time
};

// Destructure secrets and expirations once
const accessSecret: Secret = process.env.ACCESS_SECRET_KEY || "defaultAccessSecret";
const accessExpireIn: string = process.env.ACCESS_EXPIRES_IN || "15m";
const refreshSecret: Secret = process.env.REFRESH_SECRET_KEY || "defaultRefreshSecret";
const refreshExpireIn: string = process.env.REFRESH_EXPIRES_IN || "60m";

export const jwtService = {
  /**
   * Generate an access token
   */
  generateAccessToken(data: TJwtPayload): string {
    return jwt.sign(data, accessSecret, {
      expiresIn: accessExpireIn as ms.StringValue,
    });
  },

  /**
   * Generate a refresh token
   */
  generateRefreshToken(data: TJwtPayload): string {
    return jwt.sign(data, refreshSecret, {
      expiresIn: refreshExpireIn as ms.StringValue,
    });
  },

  /**
   * Verify access token
   */
  verifyAccessToken(token: string): TJwtPayload | null {
    try {
      return jwt.verify(token, accessSecret) as TJwtPayload;
    } catch (error) {
      console.error("Access token verification failed:", error);
      return null;
    }
  },

  /**
   * Verify refresh token
   */
  verifyRefreshToken(token: string): TJwtPayload | null {
    try {
      return jwt.verify(token, refreshSecret) as TJwtPayload;
    } catch (error) {
      console.error("Refresh token verification failed:", error);
      return null;
    }
  },

  /**
   * Decode a token without verifying
   */
  decodeRefreshToken(token: string): JwtPayload | null {
    try {
      return jwt.decode(token) as JwtPayload;
    } catch (error) {
      console.error("Token decode failed:", error);
      return null;
    }
  },
};
