'use client'

import { Bell, Search, User, LogOut } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export function Header() {
  const { data: session } = useSession()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut({ redirect: false })
    router.push('/auth/signin')
  }

  return (
    <header className="flex h-16 shrink-0 items-center gap-4 border-b bg-white px-6">
      <div className="flex flex-1 items-center gap-4">
        <form className="flex-1">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <input
              type="search"
              placeholder="Search..."
              className="w-full bg-white rounded-lg border border-gray-200 py-2 pl-8 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </form>
      </div>
      
      <nav className="flex items-center gap-4">
        <button className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
          <Bell className="h-5 w-5" />
        </button>
        
        <div className="h-8 w-px bg-gray-200"></div>
        
        {session ? (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 rounded-lg p-2 text-gray-700">
              <User className="h-5 w-5" />
              <div className="text-sm">
                <span className="font-medium">{session.user.name}</span>
                <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  {session.user.role}
                </span>
              </div>
            </div>
            <button 
              onClick={handleSignOut}
              className="flex items-center gap-1 rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-red-600 text-sm"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        ) : (
          <button 
            onClick={() => router.push('/auth/signin')}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50"
          >
            <User className="h-4 w-4" />
            Sign In
          </button>
        )}
      </nav>
    </header>
  )
}