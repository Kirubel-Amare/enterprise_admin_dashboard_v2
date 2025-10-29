import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name: string
      role: 'ADMIN' | 'USER' | 'MODERATOR'
    }
  }

  interface User {
    id: string
    email: string
    name: string
    role: 'ADMIN' | 'USER' | 'MODERATOR'
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: 'ADMIN' | 'USER' | 'MODERATOR'
  }
}