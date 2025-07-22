// packages/auth/index.ts

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        await connectDB()
        const user = await User.findOne({ email: credentials?.email })
        if (!user || user.password !== credentials?.password) return null

        return { id: user._id, email: user.email, role: user.role }
      },
    }),
  ],
  session: {
    strategy: "jwt" as SessionStrategy,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role
      return token
    },
    async session({ session, token }) {
      session.user.role = token.role
      return session
    },
  },
}

export const handler = NextAuth(authOptions)
