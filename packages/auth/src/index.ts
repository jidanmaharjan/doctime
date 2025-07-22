import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import type { AuthOptions, SessionStrategy } from "next-auth"
import { connectDB } from "@repo/db/connect"
import { User } from "@repo/db/models/User"

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB()

        const user = await User.findOne({ email: credentials?.email }).lean()
        if (!user || user.password !== credentials?.password) return null

        return { id: user._id.toString(), email: user.email, role: user.role }
      },
    }),
  ],
  session: {
    strategy: "jwt" as SessionStrategy,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = (user as any).role
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
  },
}

export const handler = NextAuth(authOptions)
