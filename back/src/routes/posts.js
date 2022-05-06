import { posts_delete, posts_get_description, posts_get_list, posts_post } from "../controllers/PostController.js";

const postsRoute = ({ app }) => {
  app.post("/posts", posts_post);

  app.get("/posts", posts_get_list);

  app.get("/posts/:postId", posts_get_description);

  app.delete("/posts/:postId", posts_delete);
};
export default postsRoute;
