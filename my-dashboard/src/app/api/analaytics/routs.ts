import { NextResponse } from 'next/server'

const analyticsData = {
  stats: [
    { title: "Total Visits", value: "45.2K", description: "+20.1% from last month" },
    { title: "Page Views", value: "78.3K", description: "+12.4% from last month" },
    { title: "Bounce Rate", value: "42.5%", description: "-2.3% from last month" },
    { title: "Avg. Session", value: "4m 32s", description: "+30s from last month" }
  ],
  lineData: [
    { name: 'Jan', visits: 4000, pageViews: 2400, bounce: 2400 },
    { name: 'Feb', visits: 3000, pageViews: 1398, bounce: 2210 },
    { name: 'Mar', visits: 2000, pageViews: 9800, bounce: 2290 },
    { name: 'Apr', visits: 2780, pageViews: 3908, bounce: 2000 },
    { name: 'May', visits: 1890, pageViews: 4800, bounce: 2181 },
    { name: 'Jun', visits: 2390, pageViews: 3800, bounce: 2500 },
  ],
  pieData: [
    { name: 'Direct', value: 400 },
    { name: 'Social', value: 300 },
    { name: 'Referral', value: 300 },
    { name: 'Organic', value: 200 },
  ]
}

export async function GET() {
  try {
    await new Promise(resolve => setTimeout(resolve, 700))
    
    return NextResponse.json(analyticsData)
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
