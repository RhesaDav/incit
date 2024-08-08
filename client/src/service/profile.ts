import httpCommon from "../api/httpCommon"

export const getProfile = async () => {
     return await httpCommon.get("/profile")
}

export const updateProfile = async (username: string) => {
     return await httpCommon.patch("/profile", {username})
}