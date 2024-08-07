import express from "express"
import { editProfile, profileDetail } from "../controllers/profile.controller"
import { authenticateToken } from "../middleware/authenticateToken"

const router = express.Router()

router.get('/',authenticateToken, profileDetail)
router.patch('/', authenticateToken, editProfile)

export default router;