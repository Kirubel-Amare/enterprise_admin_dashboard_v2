import { Card } from '@/components/ui/Card'
import { Users, UserPlus, UserCheck, UserX } from 'lucide-react'
import prisma from '@/lib/prismaClient'

// Direct database access
async function getUsersData() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    const totalUsers = users.length
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    // Without a dedicated lastLogin field in the model, fallback to createdAt for recent activity/new users.
    const newUsers = users.filter(u => u.createdAt > thirtyDaysAgo).length
    const activeUsers = newUsers // fallback: consider recently created users as active when lastLogin isn't available
    const inactiveUsers = totalUsers - activeUsers

    // Add a computed 'status' for each user; lastLogin is not available so show 'Never'
    const usersWithStatus = users.map(user => ({
      ...user,
      status: new Date(user.createdAt) > thirtyDaysAgo ? 'Active' : 'Inactive',
      lastLogin: 'Never'
    }))

    return {
      stats: [
        { title: "Total Users", value: totalUsers.toString(), description: "All registered users" },
        { title: "New Users", value: newUsers.toString(), description: "Last 30 days" },
        { title: "Active Users", value: activeUsers.toString(), description: "Currently active" },
        { title: "Inactive Users", value: inactiveUsers.toString(), description: "Not active" }
      ],
      users: usersWithStatus
    }
  } catch (error) {
    console.error('Failed to fetch users data:', error)
    return {
      stats: [
        { title: "Total Users", value: "0", description: "Error loading data" },
        { title: "New Users", value: "0", description: "Error loading data" },
        { title: "Active Users", value: "0", description: "Error loading data" },
        { title: "Inactive Users", value: "0", description: "Error loading data" }
      ],
      users: []
    }
  }
}

const iconMap = {
  "Total Users": <Users className="h-6 w-6" />,
  "New Users": <UserPlus className="h-6 w-6" />,
  "Active Users": <UserCheck className="h-6 w-6" />,
  "Inactive Users": <UserX className="h-6 w-6" />
}

export default async function UsersPage() {
  const data = await getUsersData()

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Users</h1>
      <p className="text-gray-600 mb-6">Manage your users and permissions</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {data.stats.map((stat: any, index: number) => (
          <Card 
            key={index}
            title={stat.title} 
            value={stat.value} 
            description={stat.description}
            icon={iconMap[stat.title as keyof typeof iconMap]}
          />
        ))}
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">User List</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.users.length > 0 ? (
                data.users.map((user: any) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium">
                            {user.name?.split(' ').map((n: string) => n[0]).join('').toUpperCase() || 'U'}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name || 'Unknown'}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{user.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.lastLogin}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                      <button className="text-red-600 hover:text-red-900">Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
