import express from "express"
import { getStatistic } from "../controllers/statistic.controller"
import { authenticateToken } from "../middleware/authenticateToken";

const router = express.Router()

router.get('/', authenticateToken, getStatistic)

export default router;