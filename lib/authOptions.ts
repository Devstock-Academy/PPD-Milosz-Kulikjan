import type { AuthOptions } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from './prismadb'
import bcrypt from 'bcrypt'

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
    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) {
        throw new Error('EMAIL_AND_PASSWORD_REQUIRED')
      }

      const user = await prisma.user.findUnique({
        where: {
          email: credentials.email,
        },
      })

      if (!user || !user.password) {
        throw new Error('USER_NOT_FOUND')
      }

      const isPasswordValid = await bcrypt.compare(
        credentials.password,
        user.password
      )

      if (!isPasswordValid) {
        throw new Error('INVALID_PASSWORD')
      }

      return {
        id: user.id,
        email: user.email,
        name: user.name || `${user.imie || ''} ${user.nazwisko || ''}`.trim(),
        image: user.image,
      }
    },
  }),
]

export const authOptions: AuthOptions = {
  providers,
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    },
  },
  debug: true,
}
