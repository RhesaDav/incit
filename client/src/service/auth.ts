import httpCommon from "../api/httpCommon";
import { Login, Register } from "../types";

export const login = async (data: Login) => {
    return await httpCommon.post('/auth/login', data)
}

export const register = async (data: Register) => {
    return await httpCommon.post('/auth/register', data)
}