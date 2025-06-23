"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"

const LoginPageClient = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // First try to sign in
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) {
        // If it's the demo user and login failed, try to create the account
        if (email === "demo@taskflow.dev" && password === "demo123456") {
          const { error: signUpError } = await supabase.auth.signUp({
            email,
            password,
            options: {
              emailRedirectTo: undefined, // Skip email confirmation for demo
            },
          })

          if (signUpError) {
            setError("Failed to create demo account: " + signUpError.message)
            return
          }

          // Try to sign in again after creating the account
          const { error: secondSignInError } = await supabase.auth.signInWithPassword({
            email,
            password,
          })

          if (secondSignInError) {
            setError("Demo account created but login failed: " + secondSignInError.message)
            return
          }

          // Create demo data for the new user
          await createDemoData()
        } else {
          setError(signInError.message)
          return
        }
      }

      router.push("/dashboard")
    } catch (err) {
      setError("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  const createDemoData = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      // Create demo projects
      const { data: projects, error: projectError } = await supabase
        .from("projects")
        .insert([
          {
            user_id: user.id,
            name: "Website Redesign",
            description: "Complete overhaul of company website",
            emoji: "🎨",
            color: "blue",
          },
          {
            user_id: user.id,
            name: "Mobile App",
            description: "Cross-platform mobile application",
            emoji: "📱",
            color: "purple",
          },
          {
            user_id: user.id,
            name: "Marketing Campaign",
            description: "Q1 product launch campaign",
            emoji: "📢",
            color: "green",
          },
        ])
        .select()

      if (projectError) {
        console.error("Error creating demo projects:", projectError)
        return
      }

      // Create demo tasks
      const { error: taskError } = await supabase.from("tasks").insert([
        {
          user_id: user.id,
          project_id: projects?.[0]?.id,
          title: "Create wireframes",
          description: "Design wireframes for main pages",
          status: "completed",
          priority: "high",
          emoji: "📐",
          is_important: true,
        },
        {
          user_id: user.id,
          project_id: projects?.[1]?.id,
          title: "Setup development environment",
          description: "Configure React Native environment",
          status: "completed",
          priority: "high",
          emoji: "⚙️",
          is_important: true,
        },
        {
          user_id: user.id,
          project_id: projects?.[0]?.id,
          title: "Design system setup",
          description: "Establish design system",
          status: "in_progress",
          priority: "high",
          emoji: "🎨",
          is_important: true,
        },
        {
          user_id: user.id,
          project_id: projects?.[1]?.id,
          title: "User authentication",
          description: "Implement login/signup",
          status: "in_progress",
          priority: "high",
          emoji: "🔐",
          is_important: true,
        },
        {
          user_id: user.id,
          project_id: projects?.[2]?.id,
          title: "Content calendar",
          description: "Plan social media content",
          status: "completed",
          priority: "medium",
          emoji: "📅",
          is_important: false,
        },
        {
          user_id: user.id,
          project_id: projects?.[0]?.id,
          title: "Homepage mockup",
          description: "Create homepage design",
          status: "todo",
          priority: "medium",
          emoji: "🏠",
          is_important: false,
        },
        {
          user_id: user.id,
          project_id: projects?.[1]?.id,
          title: "API integration",
          description: "Connect to backend APIs",
          status: "todo",
          priority: "medium",
          emoji: "🔌",
          is_important: false,
        },
        {
          user_id: user.id,
          project_id: projects?.[2]?.id,
          title: "Email campaign design",
          description: "Design email templates",
          status: "in_progress",
          priority: "medium",
          emoji: "📧",
          is_important: false,
        },
        {
          user_id: user.id,
          project_id: projects?.[2]?.id,
          title: "Influencer outreach",
          description: "Contact potential influencers",
          status: "todo",
          priority: "low",
          emoji: "🤝",
          is_important: false,
        },
      ])

      if (taskError) {
        console.error("Error creating demo tasks:", taskError)
      }
    } catch (error) {
      console.error("Error creating demo data:", error)
    }
  }

  const useDemoCredentials = () => {
    setEmail("demo@taskflow.dev")
    setPassword("demo123456")
  }

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

        <div className="text-center relative z-10">
          <h2 className="mt-6 text-3xl font-bold text-white">Welcome back!</h2>
          <p className="mt-2 text-slate-300">Login to access your account.</p>
        </div>

        {/* Demo Credentials Banner */}
        <div className="relative z-10 bg-gradient-to-r from-blue-900/50 to-purple-900/50 border border-blue-700/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-300">Demo Account</p>
              <p className="text-xs text-slate-400">demo@taskflow.dev / demo123456</p>
            </div>
            <button
              type="button"
              onClick={useDemoCredentials}
              className="px-3 py-1 text-xs font-medium text-blue-300 bg-blue-900/50 border border-blue-700/50 rounded hover:bg-blue-800/50 transition-colors"
            >
              Use Demo
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          {error && (
            <div className="p-3 text-sm text-red-300 bg-red-900/50 border border-red-700/50 rounded-md">{error}</div>
          )}

          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            disabled={loading}
            className="w-full px-5 py-3 text-base font-medium text-white rounded-md bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 hover:from-cyan-700 hover:via-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Login to your account"}
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

export default LoginPageClient
