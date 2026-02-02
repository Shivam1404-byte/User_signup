import Router from "express"
import { register,login } from "../controllers/authController.js"
import { LoginRateLimiter } from "../middleware/rateLimiter.js"
export const router = new Router()

router.post('/register',register)
router.post('/login',LoginRateLimiter,login)

