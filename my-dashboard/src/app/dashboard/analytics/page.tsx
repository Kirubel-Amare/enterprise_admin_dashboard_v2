'use client'

import { Card } from '@/components/ui/Card'
import { use } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const lineData = [
  { name: 'Jan', visits: 4000, pageViews: 2400, bounce: 2400 },
  { name: 'Feb', visits: 3000, pageViews: 1398, bounce: 2210 },
  { name: 'Mar', visits: 2000, pageViews: 9800, bounce: 2290 },
  { name: 'Apr', visits: 2780, pageViews: 3908, bounce: 2000 },
  { name: 'May', visits: 1890, pageViews: 4800, bounce: 2181 },
  { name: 'Jun', visits: 2390, pageViews: 3800, bounce: 2500 },
]

const pieData = [
  { name: 'Direct', value: 400 },
  { name: 'Social', value: 300 },
  { name: 'Referral', value: 300 },
  { name: 'Organic', value: 200 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export default function Analytics() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics</h1>
      <p className="text-gray-600 mb-6">Detailed analytics and insights</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 text-gray-400">
        <Card title="Total Visits" value="45.2K" description="+20.1% from last month" />
        <Card title="Page Views" value="78.3K" description="+12.4% from last month" />
        <Card title="Bounce Rate" value="42.5%" description="-2.3% from last month" />
        <Card title="Avg. Session" value="4m 32s" description="+30s from last month" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 font-medium text-gray-500">Traffic Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="visits" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="pageViews" stroke="#82ca9d" />
              <Line type="monotone" dataKey="bounce" stroke="#ffc658" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 font-medium text-gray-500">Traffic Sources</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }: { name?: string; percent?: number }) => `${name ?? ''} ${((percent ?? 0) * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
