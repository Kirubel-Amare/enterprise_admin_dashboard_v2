import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Get recent analytics data
    const revenueData = await prisma.analytics.findMany({
      where: { metric: 'revenue' },
      orderBy: { date: 'asc' },
      take: 6
    })

    const userData = await prisma.analytics.findMany({
      where: { metric: 'users' },
      orderBy: { date: 'asc' },
      take: 6
    })

    // Calculate stats from database
    const totalRevenue = await prisma.order.aggregate({
      _sum: { total: true },
      where: { status: 'COMPLETED' }
    })

    const totalOrders = await prisma.order.count({
      where: { status: 'COMPLETED' }
    })

    const totalUsers = await prisma.user.count()

    const recentOrders = await prisma.order.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000) // Last 24 hours
        }
      }
    })

    // Format chart data
    const chartData = revenueData.map((revenue, index) => ({
      name: new Date(revenue.date).toLocaleDateString('en-US', { month: 'short' }),
      revenue: revenue.value,
      users: userData[index]?.value || 0
    }))

    const dashboardData = {
      stats: [
        { title: "Total Revenue", value: `$${totalRevenue._sum.total?.toLocaleString() || '0'}`, description: "+20% from last month" },
        { title: "Total Orders", value: totalOrders.toString(), description: "+12% from last month" },
        { title: "Total Users", value: totalUsers.toString(), description: "+15% from last month" },
        { title: "Recent Orders", value: `+${recentOrders}`, description: "in last 24 hours" }
      ],
      chartData,
      recentActivity: [
        { id: 1, time: "2 min ago", action: "New user registered" },
        { id: 2, time: "1 hour ago", action: "Order #1234 completed" },
        { id: 3, time: "2 hours ago", action: "Payment received" },
      ]
    }

    return NextResponse.json(dashboardData)
  } catch (error) {
    console.error('Dashboard API error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}