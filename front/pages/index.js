import NavBar from "@/components/NavBar"
import PostCard from "@/components/PostCard"
import { makeClient } from "@/services/api"
import { useEffect, useState } from "react"

const HomePage = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    makeClient()
      .get("/posts")
      .then((res) => {
        const { data } = res
        setPosts(data)
      })
  }, [])

  return (
    <div>
      <nav>
        <NavBar />
      </nav>
      {Object.entries(posts).map(([itemId, post]) => (
        <PostCard key={itemId} post={post} />
      ))}
    </div>
  )
}

export default HomePage
