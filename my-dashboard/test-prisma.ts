// test-prisma.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.findMany();
  console.log('✅ Connected successfully! Found products:', products.length);
}

main()
  .catch((e) => {
    console.error('❌ Connection test failed:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
