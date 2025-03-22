import Link from "next/link"
import { Button } from "../components/ui/button"
import { UserButton } from "@clerk/nextjs"
import { useUser } from "@clerk/nextjs"
export default function Navbar() {
    const user=useUser();
  return (
    <nav className="border-b border-white/20 bg-white/10 dark:bg-black/10 backdrop-blur-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="font-bold text-xl flex items-center text-white">
            <span className="text-black mr-2">Notes</span>
            <span>AI</span>
          </Link>
        </div>

        <div className="flex items-center space-x-2">
            {user && <UserButton/>}
          {!user.user && <div><Button variant="ghost" size="sm" className="text-white cursor-pointer hover:bg-white/20">
          <Link href={'/sign-in'}>
            Login
          </Link>
          </Button>
          <Button size="sm" className="bg-white text-purple-700 cursor-pointer hover:bg-black hover:text-white">
            <Link href={'/sign-up'}>
            Sign Up
            </Link>
          </Button>
          </div>
          }
        </div>
      </div>
    </nav>
  )
}

