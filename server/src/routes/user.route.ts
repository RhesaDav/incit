import express from "express"
import { getUsers } from "../controllers/user.controller"
import { authenticateToken } from "../middleware/authenticateToken";

const router = express.Router()

router.get('/', authenticateToken, getUsers)

export default router;