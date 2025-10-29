import NextAuth from 'next-auth'
import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'

// Mock user database - in Step 5 we'll replace this with real database
const users = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    password: '$2b$12$MX8T5mw0ZCpRWwXjbZwjqudJBKRfjeSGz0zj.Mr01RIOMXL6ymThu', // password: password123
    role: 'admin',
  },
  {
    id: '2', 
    name: 'John Doe',
    email: 'john@example.com',
    password: '$2b$12$MX8T5mw0ZCpRWwXjbZwjqudJBKRfjeSGz0zj.Mr01RIOMXL6ymThu', // password: password123
    role: 'user',
  },
]
const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Find user in mock database
        const user = users.find(user => user.email === credentials.email)
        
        if (!user) {
          return null
        }

        // Check password - in real app, use proper password hashing
        const isPasswordValid = await bcrypt.compare(credentials.password, user.password)

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!
        session.user.role = token.role as string
      }
      return session
    }
  },
  pages: {
    signIn: '/auth/signin',
    newUser: '/auth/signup'
  },
  session: {
    strategy: 'jwt' as const,
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
