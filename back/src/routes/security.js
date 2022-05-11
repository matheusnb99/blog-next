import express from "express"
import { security_signin, security_signup } from "../controllers/securityController.js"

const router = express.Router()

router.post("/sign-in", security_signin)
router.post("/sign-up", security_signup)

export { router as securityRoute }
