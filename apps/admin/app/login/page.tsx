import { signIn } from "next-auth/react"

const handleLogin = async () => {
  const res = await signIn("credentials", {
    email,
    password,
    redirect: false,
  })
  if (res?.ok) {
    router.push("/dashboard")
  }
}
