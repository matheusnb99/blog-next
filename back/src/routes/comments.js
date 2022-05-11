import express from "express"
import { comments_delete, comments_get, comments_post, comments_update } from "../controllers/commentController.js"

const router = express.Router()

router.post("/", comments_post)
router.get("/:commentId", comments_get)
router.delete("/:commentId", comments_delete)
router.put("/:id", comments_update)

export { router as commentsRoute }
