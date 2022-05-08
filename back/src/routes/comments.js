import {
  comments_delete,
  comments_get,
  comments_post,
  comments_update,
} from "../controllers/CommentController.js"

const commentsRoute = ({ app }) => {
  app.post("/comments", comments_post)

  app.get("/comments/:commentId", comments_get)

  app.delete("/comments/:commentId", comments_delete)

  app.put("/comments/:id", comments_update)
}
export default commentsRoute
