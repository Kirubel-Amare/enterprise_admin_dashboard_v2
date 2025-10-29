import bcrypt from 'bcryptjs'

// Utility to generate hashed passwords for the mock users
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 12)
}

// Generate hashed passwords for the demo users
// Run this once and update the mock users in the auth route
export async function generateDemoPasswords() {
  const password = 'password123'
  const hashedPassword = await hashPassword(password)
  console.log('Hashed password for demo users:', hashedPassword)
}

// Uncomment the line below and run once to generate the hash
// generateDemoPasswords()