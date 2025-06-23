import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
}

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      <div className="relative w-full max-w-md p-6 space-y-8 overflow-hidden rounded-xl shadow-2xl bg-slate-900/80 backdrop-blur-xl border border-slate-700/50">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 -translate-x-1/2 -translate-y-1/4 blur-2xl opacity-25 animate-pulse-slow">
          <div className="aspect-[4/1] w-[400px] bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        <div className="absolute inset-0 -translate-x-1/4 -translate-y-1/2 blur-3xl opacity-25 animate-pulse-normal">
          <div className="aspect-square w-[240px] bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        <div className="absolute inset-0 translate-x-1/4 translate-y-1/2 blur-3xl opacity-25 animate-pulse-fast">
          <div className="aspect-square w-[320px] bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-white">Welcome back!</h2>
          <p className="mt-2 text-slate-300">Login to access your account.</p>
        </div>
        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="block w-full p-3 text-white border border-slate-600 rounded-md shadow-sm bg-slate-800/50 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
              placeholder="name@example.com"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">
              Your password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="block w-full p-3 text-white border border-slate-600 rounded-md shadow-sm bg-slate-800/50 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
              required
            />
          </div>
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="remember"
                aria-describedby="remember"
                type="checkbox"
                className="w-4 h-4 border border-slate-600 rounded bg-slate-800/50 focus:ring-3 focus:ring-cyan-500"
                required
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="remember" className="text-slate-300">
                Remember me
              </label>
            </div>
            <Link href="/auth/forgot-password" className="ml-auto text-sm text-cyan-400 hover:text-cyan-300">
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full px-5 py-3 text-base font-medium text-white rounded-md bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 hover:from-cyan-700 hover:via-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
          >
            Login to your account
          </button>
          <div className="text-sm font-medium text-slate-400">
            Not registered?{" "}
            <Link href="/auth/register" className="text-cyan-400 hover:text-cyan-300">
              Create account
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
