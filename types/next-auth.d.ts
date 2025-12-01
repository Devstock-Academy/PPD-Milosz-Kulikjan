import 'next-auth'
import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  type Session = {
    user: {
      id: string
    } & DefaultSession['user']
  }

  type User = {
    id: string
  }
}

declare module 'next-auth/jwt' {
  type JWT = {
    id: string
  }
}
