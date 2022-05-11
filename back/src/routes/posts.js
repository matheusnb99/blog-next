import express from "express"
import { posts_delete, posts_get_description, posts_get_list, posts_post } from "../controllers/postController.js"

const router = express.Router()

router.post("/", posts_post)
router.get("/", posts_get_list)
router.get("/:postId", posts_get_description)
router.delete("/:postId", posts_delete)

export { router as postsRoute }
