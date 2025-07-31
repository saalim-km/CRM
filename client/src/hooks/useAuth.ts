import { authService } from "@/services/authService"
import { useMutation } from "@tanstack/react-query"

export const useSignup = ()=> {
    return useMutation({
        mutationFn : authService.signUp
    })
}

export const useLogin = ()=> {
    return useMutation({
        mutationFn : authService.login
    })
}