import type { Metadata } from "next"
import LoginPageClient from "./ClientPage"

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
}

const LoginPage = () => {
  return <LoginPageClient />
}

export default LoginPage
