// app/api/products/route.ts
import { NextResponse } from 'next/server'
import prisma from '@/lib/prismaClient'

export async function GET() {
  try {
    // Test connection first
    await prisma.$connect()
    
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    })
    
    return NextResponse.json(products)
    
  } catch (error: any) {
    console.error('Database error in products API:', error)
    
    // Specific error handling
    if (error.code === 'P1001') {
      return NextResponse.json(
        { error: 'Cannot reach database server' },
        { status: 503 }
      )
    }
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch products',
        // Only show details in development
        ...(process.env.NODE_ENV === 'development' && { 
          details: error.message,
          code: error.code 
        })
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}