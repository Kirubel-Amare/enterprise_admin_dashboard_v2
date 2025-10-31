
'use client'
import { Card } from '@/components/ui/Card'
import { TrendingUp, ShoppingCart, DollarSign, Package } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const salesData = [
  { month: 'Jan', revenue: 4000, orders: 240 },
  { month: 'Feb', revenue: 3000, orders: 139 },
  { month: 'Mar', revenue: 2000, orders: 98 },
  { month: 'Apr', revenue: 2780, orders: 200 },
  { month: 'May', revenue: 1890, orders: 150 },
  { month: 'Jun', revenue: 2390, orders: 180 },
]

const recentOrders = [
  { id: '#ORD-001', customer: 'John Doe', amount: '$299.99', status: 'Completed', date: '2024-01-15' },
  { id: '#ORD-002', customer: 'Jane Smith', amount: '$149.99', status: 'Processing', date: '2024-01-15' },
  { id: '#ORD-003', customer: 'Bob Johnson', amount: '$89.99', status: 'Completed', date: '2024-01-14' },
  { id: '#ORD-004', customer: 'Alice Brown', amount: '$199.99', status: 'Shipped', date: '2024-01-14' },
]

export default function Sales() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Sales</h1>
      <p className="text-gray-600 mb-6">Sales performance and order management</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 text-gray-400">
        <Card title="Total Revenue" value="$32,450" description="+20% from last month" icon={<DollarSign className="h-6 w-6" />} />
        <Card title="Total Orders" value="1,247" description="+12% from last month" icon={<ShoppingCart className="h-6 w-6" />} />
        <Card title="Conversion Rate" value="3.2%" description="+0.5% from last month" icon={<TrendingUp className="h-6 w-6" />} />
        <Card title="Avg. Order Value" value="$124.50" description="+$8.20 from last month" icon={<Package className="h-6 w-6" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 font-medium text-gray-500">Revenue Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="revenue" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 font-medium text-gray-500">Recent Orders</h2>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg text-gray-700">
                <div>
                  <p className="font-medium">{order.id}</p>
                  <p className="text-sm text-gray-500">{order.customer}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{order.amount}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
