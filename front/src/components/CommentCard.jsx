import { AppContext } from "@/components/AppContext"
import Link from "next/link"
import { useContext } from "react"

const CommentCard = (props) => {
  const { jwt } = useContext(AppContext)
  const {
    comment: { user, content, created_at },
  } = props

  return (
    <div className="flex flex-col w-1/2 rounded p-2">
      <Link href={"/profile/" + user.userId}>
        <a className="text-2xl text-bold hover:underline">{user.email}</a>
      </Link>
      {created_at}

      <div>{content}</div>
      <div className="flex justify-end text-gray-600 text-sm italic"></div>
    </div>
  )
}
export default CommentCard
