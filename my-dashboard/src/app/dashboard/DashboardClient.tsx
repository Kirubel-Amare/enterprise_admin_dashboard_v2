'use client'

import React from "react"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell
} from "recharts"

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D']

export default function DashboardClient({ session, data }: any) {
  const trafficData = [
    { name: 'Direct', value: 400 },
    { name: 'Social', value: 300 },
    { name: 'Referral', value: 300 },
    { name: 'Organic', value: 200 },
  ]

  return (
    <div>
      {/* Header */}
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

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {data.stats.map((stat: any, i: number) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
            <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
            <p className="text-2xl font-bold mt-2 text-gray-900">{stat.value}</p>
            <p className="text-sm text-green-600 mt-1">{stat.description}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Revenue Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 font-medium text-gray-500">Revenue Overview</h2>
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

        {/* User Growth */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 font-medium text-gray-500">User Growth</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke="#82ca9d" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Traffic Sources */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4 font-medium text-gray-500">Traffic Sources</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={trafficData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {trafficData.map((entry, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* ✅ Recent Activity Section */}
      {data.recentActivity && data.recentActivity.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 font-medium text-gray-500">Recent Activity</h2>
          <div className="space-y-3">
            {data.recentActivity.map((activity: any) => (
              <div
                key={activity.id}
                className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
