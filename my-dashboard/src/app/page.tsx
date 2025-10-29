"use client"; 

import { Card } from '@/components/ui/Card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 2000 },
  { name: 'Apr', revenue: 2780 },
  { name: 'May', revenue: 1890 },
]

export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card title="Total Revenue" value="$32,450" description="+20% from last month" />
        <Card title="Subscriptions" value="+2350" description="+180% from last month" />
        <Card title="Sales" value="+12,234" description="+19% from last month" />
        <Card title="Active Now" value="+573" description="+201 since last hour" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Revenue Chart</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <ActivityItem time="2 min ago" action="New user registered" />
            <ActivityItem time="1 hour ago" action="Order #1234 completed" />
            <ActivityItem time="2 hours ago" action="Payment received" />
          </div>
        </div>
      </div>
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