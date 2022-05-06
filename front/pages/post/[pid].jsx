import AddComment from "@/components/AddComment"
import { AppContext } from "@/components/AppContext"
import CommentCard from "@/components/CommentCard"
import PostCard from "@/components/PostCard"
import { makeClient } from "@/services/api"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"

const PostPage = () => {
  const router = useRouter()
  const { jwt } = useContext(AppContext)

  const { pid } = router.query
  const [post, setPost] = useState(null)

  useEffect(() => {
    if (!router.isReady) {
      return
    }

    makeClient()
      .get("/posts/" + pid)
      .then((res) => {
        const { data } = res
        setPost(data)
      })
  }, [pid, router])

  if (!post) {
    return <div>Not found !</div>
  }

  return (
    <>
      <PostCard post={post} />
      <AddComment userId={jwt.payload.user.id} postId={post.id} />
      {post.comments.map((comment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </>
  )
}

export default PostPage
