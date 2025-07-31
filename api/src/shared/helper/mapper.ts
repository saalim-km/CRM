import { IUser } from "../types/user.types";

function UserMapper(user : IUser) {
    return {
        id: user._id,
        name: user.name,
        email: user.email,
    };
}