import type { AuthOptions, Session } from 'next-auth'
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
        name:
          user.pseudonim ||
          `${user.imie || ''} ${user.nazwisko || ''}`.trim() ||
          user.email,
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
      type SessionUserWithId = NonNullable<Session['user']> & { id: string }
      if (session.user) {
        ;(session.user as SessionUserWithId).id = token.id as string
      }
      return session
    },
    async signIn({ user, account, profile }) {
      if (account?.provider === 'github' && user?.id && profile) {
        try {
          const existing = await prisma.user.findUnique({
            where: { id: user.id },
            select: { name: true, image: true, emailVerified: true },
          })
          const nextName = profile.name || user.email
          const nextImage = ((profile as any).avatar_url as string) || undefined
          const needsUpdate =
            existing?.name !== nextName ||
            existing?.image !== nextImage ||
            !existing?.emailVerified
          if (needsUpdate) {
            await prisma.user.update({
              where: { id: user.id },
              data: {
                name: nextName,
                image: nextImage,
                emailVerified: existing?.emailVerified ? undefined : new Date(),
              },
            })
          }
        } catch {}
      }
      return true
    },
  },
  debug: true,
}
