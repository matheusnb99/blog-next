import Link from "next/link"

const NavBar = () => {
  return (
    <div className="flex justify-between p-2 bg-blue-500 text-white">
      <h1 className="text-xs bg-indigo-500">Hello User</h1>
      <div className="flex gap-3">
        <Link href="/sign-in">
          <a>sign in</a>
        </Link>
        <Link href="/sign-up">
          <a>sign up</a>
        </Link>
    </div>
    </div>
  )
}
export default NavBar
