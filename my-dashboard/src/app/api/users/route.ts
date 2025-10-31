import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'


export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    const totalUsers = await prisma.user.count()
    const newUsers = await prisma.user.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Last 30 days
        }
      }
    })

    const usersData = {
      stats: [
        { title: "Total Users", value: totalUsers.toString(), description: "+12% from last month" },
        { title: "New Users", value: `+${newUsers}`, description: "+8% from last month" },
        { title: "Active Users", value: totalUsers.toString(), description: "+15% from last month" },
        { title: "Inactive Users", value: "0", description: "-2% from last month" }
      ],
      users: users.map((user: any) => ({
        ...user,
        lastLogin: formatLastLogin(user.createdAt),
        status: 'Active'
      }))
    }

    return NextResponse.json(usersData)
  } catch (error) {
    console.error('Users API error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

function formatLastLogin(date: Date): string {
  const now = new Date()
  const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)
  
  if (diffInHours < 1) return 'Just now'
  if (diffInHours < 24) return `${Math.floor(diffInHours)} hours ago`
  return `${Math.floor(diffInHours / 24)} days ago`
}