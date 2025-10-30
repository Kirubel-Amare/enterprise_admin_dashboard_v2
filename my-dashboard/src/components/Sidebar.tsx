'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { 
  Home, 
  BarChart3, 
  Settings, 
  Users, 
  DollarSign,
  Package,
  FileText,
  Shield
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home, roles: ['ADMIN', 'USER', 'MODERATOR'] },
  { name: 'Analytics', href: '/analytics', icon: BarChart3, roles: ['ADMIN', 'MODERATOR'] },
  { name: 'Users', href: '/users', icon: Users, roles: ['ADMIN'] },
  { name: 'Sales', href: '/sales', icon: DollarSign, roles: ['ADMIN', 'MODERATOR'] },
  { name: 'Products', href: '/products', icon: Package, roles: ['ADMIN', 'MODERATOR'] },
  { name: 'Reports', href: '/reports', icon: FileText, roles: ['ADMIN'] },
  { name: 'Settings', href: '/settings', icon: Settings, roles: ['ADMIN', 'USER', 'MODERATOR'] },
]

export function Sidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()

  // Filter navigation based on user role
  const filteredNavigation = navigation.filter(item => 
    session ? item.roles.includes(session.user.role) : false
  )

  if (!session) {
    return (
      <div className="flex h-full w-64 flex-col bg-gray-900">
        <div className="flex items-center justify-center h-16 shrink-0 px-4 bg-gray-800">
          <h1 className="text-xl font-bold text-white">My Dashboard</h1>
        </div>
        <div className="flex-1 flex items-center justify-center px-4">
          <p className="text-gray-400 text-center">Please sign in to access the dashboard</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full w-64 flex-col bg-gray-900">
      <div className="flex items-center justify-center h-16 shrink-0 px-4 bg-gray-800">
        <h1 className="text-xl font-bold text-white">My Dashboard</h1>
      </div>
      
      <nav className="flex-1 space-y-2 px-4 py-4">
        {filteredNavigation.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.name}
              {item.roles.includes('admin') && !item.roles.includes('user') && (
                <Shield className="ml-auto h-4 w-4 text-blue-400" />
              )}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-gray-700">
        <div className="text-xs text-gray-400">
          Logged in as <span className="text-white">{session.user.name}</span>
        </div>
        <div className="text-xs text-gray-400 mt-1">
          Role: <span className="text-blue-400">{session.user.role}</span>
        </div>
      </div>
    </div>
  )
}