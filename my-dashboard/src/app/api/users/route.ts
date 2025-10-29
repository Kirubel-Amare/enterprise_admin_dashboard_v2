import { NextResponse } from 'next/server'

const usersData = {
  stats: [
    { title: "Total Users", value: "2,548", description: "+12% from last month" },
    { title: "New Users", value: "184", description: "+8% from last month" },
    { title: "Active Users", value: "1,927", description: "+15% from last month" },
    { title: "Inactive Users", value: "89", description: "-2% from last month" }
  ],
  users: [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active', role: 'Admin', lastLogin: '2 hours ago' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Active', role: 'User', lastLogin: '1 day ago' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'Inactive', role: 'User', lastLogin: '1 week ago' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', status: 'Active', role: 'Moderator', lastLogin: '3 hours ago' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', status: 'Active', role: 'User', lastLogin: '5 hours ago' },
    { id: 6, name: 'Diana Lee', email: 'diana@example.com', status: 'Active', role: 'User', lastLogin: '2 days ago' }
  ]
}

export async function GET() {
  try {
    await new Promise(resolve => setTimeout(resolve, 600))
    
    return NextResponse.json(usersData)
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
