export interface SignupInput {
    email: string;
    password: string;
    name?: string;
    confirmPassword?: string;
}

export interface LoginInput {
    email: string;
    password: string;
}