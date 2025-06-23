"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Sparkles, Zap, BarChart3, ArrowRight, Star } from "lucide-react"

export default function HomePage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
      if (user) {
        router.push("/dashboard")
      }
    } catch (error) {
      console.error("Auth check error:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center animate-pulse">
            <CheckCircle2 className="w-6 h-6 text-white" />
          </div>
          <div className="w-32 h-1 bg-slate-700 rounded-full overflow-hidden">
            <div className="w-full h-full bg-gradient-to-r from-purple-500 to-blue-600 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Status Bar Safe Area */}
      <div className="h-safe-top bg-transparent"></div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800">
        <div className="px-4 py-4 safe-area-inset">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  TaskFlow
                </h1>
                <p className="text-xs text-slate-400 -mt-1">Smart Task Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Link href="/auth/login">
                <Button variant="ghost" size="sm" className="text-slate-300 font-medium hover:text-white">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 pt-8 pb-12 safe-area-inset">
        <div className="text-center space-y-6">
          {/* Hero Badge */}
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-900/50 to-blue-900/50 px-4 py-2 rounded-full border border-purple-800/50">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-slate-300">New: AI-Powered Task Insights</span>
          </div>

          {/* Main Headline */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-white">
              Your Tasks,
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Beautifully Organized
              </span>
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed max-w-sm mx-auto">
              The most intuitive task manager designed for how you actually work. Simple, powerful, and delightfully
              smooth.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3 pt-4">
            <Link href="/auth/signup" className="block">
              <Button
                size="lg"
                className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg shadow-purple-500/25 rounded-2xl"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/auth/login" className="block">
              <Button
                variant="outline"
                size="lg"
                className="w-full h-12 text-base font-medium border-2 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white rounded-2xl"
              >
                I Already Have an Account
              </Button>
            </Link>
          </div>

          {/* Social Proof */}
          <div className="pt-8 space-y-3">
            <div className="flex items-center justify-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-sm text-slate-400">
              Loved by <span className="font-semibold text-slate-200">10,000+</span> productive people
            </p>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="px-4 pb-12 safe-area-inset">
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Everything You Need</h2>
            <p className="text-slate-300">Powerful features that feel effortless</p>
          </div>

          <div className="grid gap-4">
            {/* Feature Cards */}
            <Card className="bg-gradient-to-br from-slate-800/50 to-blue-900/30 border-slate-700/50 shadow-sm backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-1">Smart Organization</h3>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      Automatically organize tasks by project, priority, and due date. Your workflow, simplified.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 border-slate-700/50 shadow-sm backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-1">Daily Insights</h3>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      Track your productivity with beautiful charts and personalized insights that motivate you.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-slate-800/50 to-green-900/30 border-slate-700/50 shadow-sm backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-1">Lightning Fast</h3>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      Built for speed. Every interaction is instant, every animation is smooth.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-4 pb-8 safe-area-inset">
        <Card className="bg-gradient-to-r from-purple-600 to-blue-600 border-0 shadow-xl">
          <CardContent className="p-8 text-center text-white">
            <h3 className="text-xl font-bold mb-2">Ready to Get Organized?</h3>
            <p className="text-purple-100 mb-6 leading-relaxed">
              Join thousands who've transformed their productivity with TaskFlow
            </p>
            <Link href="/auth/signup">
              <Button
                size="lg"
                className="w-full h-12 bg-white text-purple-600 hover:bg-gray-50 font-semibold rounded-2xl"
              >
                Start Your Free Trial
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Bottom Safe Area */}
      <div className="h-safe-bottom bg-transparent"></div>
    </div>
  )
}
