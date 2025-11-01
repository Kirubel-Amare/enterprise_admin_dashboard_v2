import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import prisma from '@/lib/prismaClient'

export async function POST(req: Request) {
  console.log('Signup API called')
  
  try {
    const body = await req.json()
    console.log('Request body:', body)

    const { name, email, password } = body

    if (!name || !email || !password) {
      console.log('Missing fields')
      return NextResponse.json({ 
        error: 'Name, email, and password are required' 
      }, { status: 400 })
    }

    // Check if user already exists
    console.log('Checking existing user:', email)
    const existingUser = await prisma.user.findUnique({ 
      where: { email } 
    })
    
    if (existingUser) {
      console.log('User already exists')
      return NextResponse.json({ 
        error: 'Email already registered' 
      }, { status: 400 })
    }

    // Hash password
    console.log('Hashing password')
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    console.log('Creating user')
    const user = await prisma.user.create({
      data: { 
        name, 
        email, 
        password: hashedPassword,
        role: 'USER' // Make sure to include the role
      }
    })

    console.log('User created successfully:', user.id)

    // Return success response
    return NextResponse.json({
      message: 'User created successfully',
      user: { 
        id: user.id, 
        name: user.name, 
        email: user.email,
        role: user.role
      }
    }, { status: 201 })

  } catch (err: any) {
    console.error('Signup API error:', err)
    
    // Return proper JSON error
    return NextResponse.json({ 
      error: 'Internal server error',
      details: err.message
    }, { status: 500 })
  }
}