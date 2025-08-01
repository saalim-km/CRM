import { AxiosInstance } from "@/api/axiosInstance";
import type { AxiosResponse, LoginResponse, signupInput } from "@/types/auth.types";

export const authService = {
    async signUp(userData : signupInput) : Promise<AxiosResponse > {
        const response = await AxiosInstance.post('/auth/signup', userData);
        return response.data;
    },

    async login(userData: { email: string; password: string }) : Promise<LoginResponse> {
        const response = await AxiosInstance.post('/auth/login', userData);
        return response.data;
    },

    async logout() : Promise<AxiosResponse> {
        const response = await AxiosInstance.post('/auth/logout');
        return response.data;
    }
}