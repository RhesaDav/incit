import httpCommon from "../api/httpCommon";
import { Login, Register, ResetPassword } from "../types";

export const login = async (data: Login) => {
    return await httpCommon.post('/auth/login', data)
}

export const register = async (data: Register) => {
    return await httpCommon.post('/auth/register', data)
}

export const forgotPassword = async (email: string) => {
    return await httpCommon.post("/auth/forgot-password", {email})
}

export const resetPassword = async (data: ResetPassword) => {
    return await httpCommon.post("/auth/reset-password",data)
}

export const verifyEmail = async (token: string) => {
    return await httpCommon.get(`/auth/verify-email?token=${token}`)
}