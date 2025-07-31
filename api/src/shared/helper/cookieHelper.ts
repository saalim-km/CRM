import { Response } from "express";
import dotenv from "dotenv";
dotenv.config();


export const setAuthCookies = (res : Response , accessToken : string , refreshToken : string )=> {

    res.cookie('user_AT' , accessToken , {
        httpOnly : true,
        secure : process.env.NODE_ENV === "production",
        sameSite : "strict"
    });

    res.cookie('user_RT', refreshToken , {
        httpOnly : true,
        secure : process.env.NODE_ENV === "production",
        sameSite : "strict"
    });    
}




export const updateCookieWithAccessToken = (
    res: Response,
    accessToken: string,
  ) => {
    const isProduction = process.env.NODE_ENV === "production";
  
    res.cookie('user_RT', accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });
};
  

export const clearAuthCookies = (
    res: Response,
  ) => {
    res.clearCookie('user_AT');
    res.clearCookie('user_RT');
};
  