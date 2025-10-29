import bcrypt from 'bcryptjs'

async function generatePassword() {
  const password = 'password123'
  const hashedPassword = await bcrypt.hash(password, 12)
  console.log('Hashed password:', hashedPassword)
}

generatePassword()