import CommentsModel from "../db/models/CommentsModel.js"

export const comments_post = async (req, res) => {
  const {
    body: { content, postId, userId },
  } = req

  try {
    const comment = await CommentsModel.query().insertAndFetch({
      content,
      userId,
      post_id: postId,
    })
    res.send(comment)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err)
    res.status(500).send({ error: "oops." })
  }
}

export const comments_get = async (req, res) => {
  const {
    params: { commentId },
  } = req

  if (!commentId) {
    res.send({ status: 404, message: "not found" })

    return
  }

  const comment = CommentsModel.query().withGraphFetched("[user, posts]")

  comment.findById(commentId)

  if (!comment) {
    res.send({ status: 404, message: "not found" })

    return
  }

  res.send(await comment)
}

export const comments_delete = async (req, res) => {
  const {
    params: { commentId },
  } = req

  const comment = await CommentsModel.query().findById(commentId)

  if (!comment) {
    res.status(404).send({ error: "not found" })

    return
  }

  comment.$query().where({ id: commentId }).update({
    deleted_at: new Date(),
  })
  res.send({ status: 200, message: "Comment deleted" })
}

export const comments_delete_from_database = async (req, res) => {
  const {
    params: { commentId },
  } = req

  const comment = await CommentsModel.query().findById(commentId)

  if (!comment) {
    res.status(404).send({ error: "not found" })

    return
  }

  CommentsModel.query().where({ commentId }).delete()
  res.send({ status: 200, message: "Comment deleted" })
}

export const comments_update = async (req, res) => {
  const {
    params: { id },
    body: { content },
  } = req

  const comment = CommentsModel.query().findById(id)

  if (!comment) {
    res.status(404).send({ error: "not found" })

    return
  }

  await CommentsModel.query()
    .update({
      content: content,
    })
    .where({ id })
  res.send({ status: 200, message: "OK" })
}
