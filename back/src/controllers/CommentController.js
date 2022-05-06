import CommentsModel from "../db/models/CommentsModel.js";

export const comments_post = async (req, res) => {
  const {
    body: { content, commentId, userId },
  } = req;
  try {
    const comment = await CommentsModel.query().insertAndFetch({
      content,
      userId,
      commentId,
    });
    res.send(comment);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "oops." });
  }
};

export const comments_get = async (req, res) => {
  const {
    params: { commentId },
  } = req;

  if (!commentId) {
    res.send({ status: 404, message: "not found" });
    return;
  }
  const comment = CommentsModel.query().findById(commentId);
  if (!comment) {
    res.send({ status: 404, message: "not found" });

    return;
  }

  res.send(comment);
};

export const comments_delete = async (req, res) => {
  const {
    params: { commentId },
  } = req;

  const comment = await CommentsModel.query().findById(commentId);
  if (!comment) {
    res.status(404).send({ error: "not found" });
    return;
  }
  CommentsModel.query().where({ id }).delete();
  res.send("comment deleted");
};

export const comments_update = async (req, res) => {
  const {
    params: { id },
    body: { content },
  } = req;

  const comment = PostModel.query().findById(id);

  if (!comment) {
    res.status(404).send({ error: "not found" });

    return;
  }

  await CommentModel.query()
    .update({
      content: content,
    })
    .where({ id });
  res.send({ status: 200, message: "OK" });
};
