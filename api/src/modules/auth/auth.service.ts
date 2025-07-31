import { LoginInput, SignupInput } from "../../shared/types/auth.types";
import { User } from "../../models/user.model";
import { bcryptUtils } from "../../shared/utils/bcrypt";
import { CustomError } from "../../shared/helper/customError";
import { HTTP_STATUS } from "../../shared/utils/constants";
import { IUser } from "../../shared/types/user.types";
import { jwtService } from "../../shared/utils/jwtService";
import { CustomJwtPayload } from "../../middlewares/auth.middleware";

const signup = async (input : SignupInput) => {
    const newUserData = {
        name: input.name,
        email: input.email,
        password: await bcryptUtils.hashPassword(input.password),
    }
    const newUser = User.create(newUserData);
    console.log(newUser);
    return newUser;
}

const login = async (input: LoginInput) => {
    const userExists = await User.findOne({ email: input.email });
    if (!userExists) {
        throw new CustomError("User not found",HTTP_STATUS.NOT_FOUND);
    }

    return userExists;
}

const generateTokens = (user: {_id : string , email : string}) => {
    const payload = {
        id: user._id,
        email: user.email,
    };

    const accessToken = jwtService.generateAccessToken(payload);
    const refreshToken = jwtService.generateRefreshToken(payload);

    return { accessToken, refreshToken };
}

const refreshToken = async (user: CustomJwtPayload): Promise<string> => {
    const payload = jwtService.verifyRefreshToken(user.refresh_token);

    if(!payload) {
        throw new CustomError("Invalid refresh token", HTTP_STATUS.UNAUTHORIZED);
    }

    return jwtService.generateAccessToken({
        id: payload.id,
        email: payload.email
    })
}
    // This function should generate JWT tokens for the user
export const AuthService = {
    signup,
    login,
    generateTokens,
    refreshToken
};