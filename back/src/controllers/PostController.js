import PostModel from "../db/models/PostModel.js";

export const posts_get_list = async (req, res) => {
  res.send(await PostModel.query().withGraphFetched("[author, comments]"));
};

export const posts_post = async (req, res) => {
  const {
    body: { title, content, userId },
  } = req;
  const category_id = "1";
  try {
    const post = await PostModel.query().insertAndFetch({
      title,
      content,
      userId,
      category_id,
    });
    res.send(post);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "oops." });
  }
};

export const posts_get_description = async (req, res) => {
  const {
    params: { postId },
  } = req;
  const id = Number(postId);

  const query = PostModel.query().withGraphFetched("[author, comments.user]");
  if (id) {
    query.findById(id);
  }
  res.send(await query);
};

export const posts_delete = async (req, res) => {
  const {
    params: { postId },
  } = req;

  const post = await PostModel.query().findById(postId);
  if (!post) {
    res.status(404).send({ error: "not found" });
  }
  await post.$query().delete();
  res.send(post);
};
