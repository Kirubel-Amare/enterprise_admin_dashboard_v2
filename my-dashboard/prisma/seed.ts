import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')

  // Create users
  const hashedPassword = await bcrypt.hash('password123', 12)

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })

  const regularUser = await prisma.user.upsert({
    where: { email: 'john@example.com' },
    update: {},
    create: {
      email: 'john@example.com',
      name: 'John Doe',
      password: hashedPassword,
      role: 'USER',
    },
  })

  const moderatorUser = await prisma.user.upsert({
    where: { email: 'alice@example.com' },
    update: {},
    create: {
      email: 'alice@example.com',
      name: 'Alice Brown',
      password: hashedPassword,
      role: 'MODERATOR',
    },
  })

  // Create products
  const products = await Promise.all([
    prisma.product.upsert({
      where: { name: 'Premium Widget' },
      update: {},
      create: {
        name: 'Premium Widget',
        description: 'High-quality widget for professional use',
        price: 99.99,
        category: 'Widgets',
        stock: 50,
      },
    }),
    prisma.product.upsert({
      where: { name: 'Basic Widget' },
      update: {},
      create: {
        name: 'Basic Widget',
        description: 'Standard widget for everyday use',
        price: 29.99,
        category: 'Widgets',
        stock: 100,
      },
    }),
    prisma.product.upsert({
      where: { name: 'Enterprise Solution' },
      update: {},
      create: {
        name: 'Enterprise Solution',
        description: 'Complete solution for large organizations',
        price: 499.99,
        category: 'Solutions',
        stock: 10,
      },
    }),
  ])

  // Create orders
  const orders = await Promise.all([
    prisma.order.create({
      data: {
        userId: regularUser.id,
        productId: products[0].id,
        quantity: 2,
        total: products[0].price * 2,
        status: 'COMPLETED',
      },
    }),
    prisma.order.create({
      data: {
        userId: regularUser.id,
        productId: products[1].id,
        quantity: 1,
        total: products[1].price,
        status: 'PROCESSING',
      },
    }),
    prisma.order.create({
      data: {
        userId: moderatorUser.id,
        productId: products[2].id,
        quantity: 1,
        total: products[2].price,
        status: 'PENDING',
      },
    }),
  ])

  // Create analytics data
  const analyticsData = [
    { metric: 'revenue', value: 4000, date: new Date('2024-01-01') },
    { metric: 'revenue', value: 3000, date: new Date('2024-02-01') },
    { metric: 'revenue', value: 2000, date: new Date('2024-03-01') },
    { metric: 'revenue', value: 2780, date: new Date('2024-04-01') },
    { metric: 'revenue', value: 1890, date: new Date('2024-05-01') },
    { metric: 'revenue', value: 2390, date: new Date('2024-06-01') },
    { metric: 'users', value: 2400, date: new Date('2024-01-01') },
    { metric: 'users', value: 1398, date: new Date('2024-02-01') },
    { metric: 'users', value: 9800, date: new Date('2024-03-01') },
    { metric: 'users', value: 3908, date: new Date('2024-04-01') },
    { metric: 'users', value: 4800, date: new Date('2024-05-01') },
    { metric: 'users', value: 3800, date: new Date('2024-06-01') },
  ]

  for (const data of analyticsData) {
    await prisma.analytics.create({
      data,
    })
  }

  console.log('Seeding finished!')
  console.log(`Created:
    - 3 users
    - ${products.length} products
    - ${orders.length} orders
    - ${analyticsData.length} analytics records`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })