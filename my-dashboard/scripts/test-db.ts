// scripts/test-railway.ts
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function testRailwayConnection() {
  try {
    console.log('Testing Railway database connection...')
    
    // Test connection
    await prisma.$connect()
    console.log('✅ Successfully connected to Railway PostgreSQL')
    
    // Test query
    const result = await prisma.$queryRaw`SELECT version()`
    console.log('✅ Database version:', result)
    
    // Test if tables exist
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `
    console.log('✅ Available tables:', tables)
    
    await prisma.$disconnect()
    console.log('✅ All tests passed!')
    
  } catch (error) {
    console.error('❌ Connection failed:', error)
    process.exit(1)
  }
}

testRailwayConnection()