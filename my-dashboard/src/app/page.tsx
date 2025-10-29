
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { api } from "@/lib/api"
import DashboardClient from "./dashboard/DashboardClient"

async function getDashboardData() {
  try {
    const data = await api.dashboard.getData()
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
        { name: "Jan", revenue: 4000, users: 2400 },
        { name: "Feb", revenue: 3000, users: 1398 },
        { name: "Mar", revenue: 2000, users: 9800 },
        { name: "Apr", revenue: 2780, users: 3908 },
        { name: "May", revenue: 1890, users: 4800 },
        { name: "Jun", revenue: 2390, users: 3800 },
      ],
      recentActivity: [],
    }
  }
}

export default async function DashboardPage() {
  const session = await getServerSession()

  if (!session) {
    redirect("/auth/signin")
  }

  const data = await getDashboardData()

  return <DashboardClient session={session} data={data} />
}
