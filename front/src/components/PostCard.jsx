import Link from "next/link"

const PostCard = (props) => {
  const {
    post: { id, title, author, date, content },
  } = props

  return (
    <div className="container w-full md:max-w-3xl mx-auto pt-20">
      <div className="w-full px-4 md:px-6 text-xl text-gray-800 leading-normal">
        <div className="font-sans">
          <h1 className="font-bold font-sans break-normal text-gray-900 pt-6 pb-2 text-3xl md:text-4xl">
            <Link href={"/post/" + id}>
              <a> {title} </a>
            </Link>
          </h1>
          <p className="text-sm md:text-base font-normal text-gray-600">
            {author.email} - Published {date}
          </p>
        </div>

        <p className="py-6">{content}</p>
      </div>
    </div>
  )
}
export default PostCard
