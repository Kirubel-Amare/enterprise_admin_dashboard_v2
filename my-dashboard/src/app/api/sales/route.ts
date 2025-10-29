import { NextResponse } from 'next/server'

const salesData = {
  stats: [
    { title: "Total Revenue", value: "$32,450", description: "+20% from last month" },
    { title: "Total Orders", value: "1,247", description: "+12% from last month" },
    { title: "Conversion Rate", value: "3.2%", description: "+0.5% from last month" },
    { title: "Avg. Order Value", value: "$124.50", description: "+$8.20 from last month" }
  ],
  salesData: [
    { month: 'Jan', revenue: 4000, orders: 240 },
    { month: 'Feb', revenue: 3000, orders: 139 },
    { month: 'Mar', revenue: 2000, orders: 98 },
    { month: 'Apr', revenue: 2780, orders: 200 },
    { month: 'May', revenue: 1890, orders: 150 },
    { month: 'Jun', revenue: 2390, orders: 180 },
  ],
  recentOrders: [
    { id: '#ORD-001', customer: 'John Doe', amount: '$299.99', status: 'Completed', date: '2024-01-15' },
    { id: '#ORD-002', customer: 'Jane Smith', amount: '$149.99', status: 'Processing', date: '2024-01-15' },
    { id: '#ORD-003', customer: 'Bob Johnson', amount: '$89.99', status: 'Completed', date: '2024-01-14' },
    { id: '#ORD-004', customer: 'Alice Brown', amount: '$199.99', status: 'Shipped', date: '2024-01-14' },
    { id: '#ORD-005', customer: 'Charlie Wilson', amount: '$399.99', status: 'Completed', date: '2024-01-13' }
  ]
}

export async function GET() {
  try {
    await new Promise(resolve => setTimeout(resolve, 550))
    
    return NextResponse.json(salesData)
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
