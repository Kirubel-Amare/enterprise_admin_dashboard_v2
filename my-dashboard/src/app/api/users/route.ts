import { NextResponse } from 'next/server';
import prisma from '@/lib/prismaClient';

export async function GET() {
  try {
    // 1. Fetch users
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // 2. Stats
    const totalUsers = await prisma.user.count();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const newUsers = await prisma.user.count({
      where: {
        createdAt: {
          gte: thirtyDaysAgo,
        },
      },
    });

    // 3. Prepare response
    const usersData = {
      stats: [
        { title: 'Total Users', value: totalUsers.toString(), description: '+12% from last month' },
        { title: 'New Users', value: `+${newUsers}`, description: '+8% from last month' },
        { title: 'Active Users', value: totalUsers.toString(), description: '+15% from last month' },
        { title: 'Inactive Users', value: '0', description: '-2% from last month' },
      ],
      users: users.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt.toISOString(),
        lastLogin: formatLastLogin(user.createdAt),
        status: 'Active',
      })),
    };

    return NextResponse.json(usersData);
  } catch (error) {
    console.error('Users API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// 4. Format last login
function formatLastLogin(date: Date): string {
  const now = new Date();
  const diffInHours = (now.getTime() - new Date(date).getTime()) / (1000 * 60 * 60);

  if (diffInHours < 1) return 'Just now';
  if (diffInHours < 24) return `${Math.floor(diffInHours)} hours ago`;
  return `${Math.floor(diffInHours / 24)} days ago`;
}
