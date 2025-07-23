/** @type {import('next').NextConfig} */
const nextConfig = {
  cookies: {
    sessionToken: {
      name: "__Secure-next-auth.session-token",
      options: {
        domain: ".vercel.app", // <-- share session across subdomains
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "lax",
      },
    },
  },
};

export default nextConfig;
