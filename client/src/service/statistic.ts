import httpCommon from "../api/httpCommon"

export const getStatistic = async() => {
     return await httpCommon.get("/statistic")
}