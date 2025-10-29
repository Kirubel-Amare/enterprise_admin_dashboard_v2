'use client'

import { Card } from "@/components/ui/Card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function DashboardClient({ session, data }: any) {
  return (
    <div>
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">
            Welcome back, {session?.user?.name}! 👋
          </p>
        </div>
        <div className="text-sm text-gray-500">
          Role:{" "}
          <span className="font-medium text-blue-600">{session?.user?.role}</span>
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

      {data.recentActivity?.length > 0 && (
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
