import type { AuthOptions } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from './prismadb'

const providers = [
  GitHubProvider({
    clientId: process.env.GITHUB_ID ?? '',
    clientSecret: process.env.GITHUB_SECRET ?? '',
  }),
  CredentialsProvider({
    name: 'credentials',
    credentials: {
      email: { label: 'Email', type: 'text' },
      password: { label: 'Password', type: 'password' },
    },
    async authorize(_credentials) {
      return null
    },
  }),
]

export const authOptions: AuthOptions = {
  providers,
  ...(process.env.DATABASE_URL ? { adapter: PrismaAdapter(prisma) } : {}),
}
