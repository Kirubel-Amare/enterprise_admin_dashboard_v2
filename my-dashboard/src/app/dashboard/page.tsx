import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import DashboardClient from "./DashboardClient"

async function getDashboardData() {
  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL ?? ''
    const res = await fetch(`${base}/api/dashboard`, { cache: "no-store" })
    if (!res.ok) throw new Error(`Failed to fetch dashboard data: ${res.status}`)
    const data = await res.json()
    return data
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error)
    return {
      stats: [
        { title: "Total Revenue", value: "$32,450", description: "+20% from last month" },
        { title: "Subscriptions", value: "+2350", description: "+180% from last month" },
        { title: "Sales", value: "+12,234", description: "+19% from last month" },
        { title: "Active Users", value: "+573", description: "+201 since last hour" },
      ],
      chartData: [
        { name: "Jan", revenue: 4000, users: 2400, profit: 1200 },
        { name: "Feb", revenue: 3000, users: 1398, profit: 900 },
        { name: "Mar", revenue: 2000, users: 9800, profit: 600 },
        { name: "Apr", revenue: 2780, users: 3908, profit: 834 },
        { name: "May", revenue: 1890, users: 4800, profit: 567 },
        { name: "Jun", revenue: 2390, users: 3800, profit: 717 },
      ],
      recentActivity: [
        { id: 1, time: "2 min ago", action: "New user registered" },
        { id: 2, time: "5 min ago", action: "Order #1234 completed" },
        { id: 3, time: "1 hour ago", action: "Payment received" },
      ],
    }
  }
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/auth/signin")

  const data = await getDashboardData()

  return (
    <DashboardClient session={session} data={data} />
  )
}
