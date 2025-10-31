import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: {
          select: { name: true, email: true }
        },
        product: {
          select: { name: true, price: true }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 10
    })

    const totalRevenue = await prisma.order.aggregate({
      _sum: { total: true },
      where: { status: 'COMPLETED' }
    })

    const totalOrders = await prisma.order.count()
    const pendingOrders = await prisma.order.count({
      where: { status: 'PENDING' }
    })

    const salesData = {
      stats: [
        { title: "Total Revenue", value: `$${totalRevenue._sum.total?.toFixed(2) || '0'}`, description: "+20% from last month" },
        { title: "Total Orders", value: totalOrders.toString(), description: "+12% from last month" },
        { title: "Pending Orders", value: pendingOrders.toString(), description: "+5% from last month" },
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
      recentOrders: orders.map((order: any) => ({
        id: `#ORD-${order.id.slice(-6).toUpperCase()}`,
        customer: order.user.name,
        amount: `$${order.total.toFixed(2)}`,
        status: order.status,
        date: order.createdAt.toISOString().split('T')[0]
      }))
    }

    return NextResponse.json(salesData)
  } catch (error) {
    console.error('Sales API error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}