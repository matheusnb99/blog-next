import express from "express"
import { users_delete, users_get_description, users_get_list, users_update } from "../controllers/userController.js"
import auth from "../middlewares/auth.js"

const router = express.Router()

router.get("/", users_get_list)
router.get("/:userId", auth, users_get_description)
router.put("/:userId", users_update)
router.delete("/:userId", users_delete)

export { router as usersRoute }
