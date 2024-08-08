import httpCommon from "../api/httpCommon"

export const getUsers = async () => {
    return await httpCommon.get("/user")
}