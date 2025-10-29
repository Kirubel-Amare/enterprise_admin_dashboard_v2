import { NextResponse } from 'next/server'

// Mock data - in real app, this would come from a database
const dashboardData = {
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
  recentActivity: [
    { id: 1, time: "2 min ago", action: "New user registered" },
    { id: 2, time: "1 hour ago", action: "Order #1234 completed" },
    { id: 3, time: "2 hours ago", action: "Payment received" },
    { id: 4, time: "3 hours ago", action: "New subscription started" }
  ]
}

export async function GET() {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    return NextResponse.json(dashboardData)
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
