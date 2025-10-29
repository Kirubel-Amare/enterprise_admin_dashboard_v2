'use client'

import { Card } from '@/components/ui/Card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { api } from '@/lib/api'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

async function getDashboardData() {
  try {
    const data = await api.dashboard.getData()
    return data
  } catch (error) {
    console.error('Failed to fetch dashboard data:', error)
    // Return fallback data
    return {
      stats: [
        { title: "Total Revenue", value: "$32,450", description: "+20% from last month" },
        { title: "Subscriptions", value: "+2350", description: "+180% from last month" },
        { title: "Sales", value: "+12,234", description: "+19% from last month" },
        { title: "Active Users", value: "+573", description: "+201 since last hour" }
      ],
      chartData: [
        { name: 'Jan', revenue: 4000, users: 2400 },
        { name: 'Feb', revenue: 3000, users: 1398 },
        { name: 'Mar', revenue: 2000, users: 9800 },
        { name: 'Apr', revenue: 2780, users: 3908 },
        { name: 'May', revenue: 1890, users: 4800 },
        { name: 'Jun', revenue: 2390, users: 3800 },
      ],
      recentActivity: []
    }
  }
}

export default async function Dashboard() {
  const session = await getServerSession()
  
  if (!session) {
    redirect('/auth/signin')
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {data.stats.map((stat: any, index: number) => (
          <Card 
            key={index}
            title={stat.title} 
            value={stat.value} 
            description={stat.description} 
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Revenue Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">User Growth</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="users" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {data.recentActivity && data.recentActivity.length > 0 && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {data.recentActivity.map((activity: any) => (
              <ActivityItem 
                key={activity.id}
                time={activity.time} 
                action={activity.action} 
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function ActivityItem({ time, action }: { time: string; action: string }) {
  return (
    <div className="flex items-center space-x-3">
      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
      <div>
        <p className="font-medium">{action}</p>
        <p className="text-sm text-gray-500">{time}</p>
      </div>
    </div>
  )
}