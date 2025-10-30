import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
async function getDashboardData() {
  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL ?? ''
    const res = await fetch(`${base}/api/dashboard`, { cache: "no-store" })
    if (!res.ok) throw new Error(`Failed to fetch dashboard data: ${res.status}`)
    const data = await res.json()
    return data
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error)
    return {
      stats: [
        { title: "Total Revenue", value: "$32,450", description: "+20% from last month" },
        { title: "Subscriptions", value: "+2350", description: "+180% from last month" },
        { title: "Sales", value: "+12,234", description: "+19% from last month" },
        { title: "Active Users", value: "+573", description: "+201 since last hour" },
      ],
      chartData: [
        { name: "Jan", revenue: 4000, users: 2400 },
        { name: "Feb", revenue: 3000, users: 1398 },
        { name: "Mar", revenue: 2000, users: 9800 },
        { name: "Apr", revenue: 2780, users: 3908 },
        { name: "May", revenue: 1890, users: 4800 },
        { name: "Jun", revenue: 2390, users: 3800 },
      ],
      recentActivity: [],
    }
  }
}

export default async function DashboardPage() {
  let session
  try {
    session = await getServerSession(authOptions)
  } catch (error) {
    console.error("Session error:", error)
    redirect("/auth/signin?error=session_error")
  }

  if (!session) {
    redirect("/auth/signin")
  }

  const data = await getDashboardData()

  return (
    <div>
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">
            Welcome back, {session.user?.name}! 👋
          </p>
        </div>
        <div className="text-sm text-gray-500">
          Role: <span className="font-medium text-blue-600">{session.user?.role}</span>
        </div>
      </div>
      
      {/* Quick Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {data.stats.map((stat: { title: string; value: string; description: string }, index: number) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
            <p className="text-2xl font-bold mt-2">{stat.value}</p>
            <p className="text-sm text-green-600 mt-1">{stat.description}</p>
          </div>
        ))}
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <a href="/dashboard/products" className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200 hover:border-blue-300">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Products</h3>
              <p className="text-gray-600">Manage your inventory</p>
            </div>
          </div>
        </a>

        <a href="/dashboard/users" className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200 hover:border-green-300">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Users</h3>
              <p className="text-gray-600">Manage users & permissions</p>
            </div>
          </div>
        </a>

        <a href="/dashboard/analytics" className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200 hover:border-purple-300">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Analytics</h3>
              <p className="text-gray-600">View detailed insights</p>
            </div>
          </div>
        </a>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Revenue Overview</h2>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Revenue chart would appear here</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">User Growth</h2>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">User growth chart would appear here</p>
          </div>
        </div>
      </div>
    </div>
  )
}