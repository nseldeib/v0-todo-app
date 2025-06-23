"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Sparkles, Zap, BarChart3, ArrowRight, Star, Smartphone, Monitor, Globe } from "lucide-react"

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
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-600 rounded-3xl flex items-center justify-center animate-pulse">
            <CheckCircle2 className="w-8 h-8 text-white" />
          </div>
          <div className="w-48 h-2 bg-slate-700 rounded-full overflow-hidden">
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
        <div className="container mx-auto px-4 lg:px-8 py-4 safe-area-inset">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <CheckCircle2 className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  TaskFlow
                </h1>
                <p className="text-xs lg:text-sm text-slate-400 -mt-1">Smart Task Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 lg:space-x-4">
              <Link href="/auth/login">
                <Button variant="ghost" size="sm" className="text-slate-300 font-medium hover:text-white">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/signup" className="hidden lg:block">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 lg:px-8 pt-8 lg:pt-16 pb-12 lg:pb-20 safe-area-inset">
        <div className="max-w-6xl mx-auto">
          <div className="text-center lg:text-left lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center space-y-8 lg:space-y-0">
            {/* Left Column - Content */}
            <div className="space-y-6 lg:space-y-8">
              {/* Hero Badge */}
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-900/50 to-blue-900/50 px-4 py-2 rounded-full border border-purple-800/50">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-medium text-slate-300">New: AI-Powered Task Insights</span>
              </div>

              {/* Main Headline */}
              <div className="space-y-4 lg:space-y-6">
                <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold leading-tight text-white">
                  Your Tasks,
                  <br />
                  <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    Beautifully Organized
                  </span>
                </h1>
                <p className="text-lg lg:text-xl text-slate-300 leading-relaxed max-w-lg mx-auto lg:mx-0">
                  The most intuitive task manager designed for how you actually work. Simple, powerful, and delightfully
                  smooth across all your devices.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 pt-4">
                <Link href="/auth/signup">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto h-12 lg:h-14 text-base lg:text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg shadow-purple-500/25 rounded-2xl px-8"
                  >
                    Get Started Free
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/auth/login">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto h-12 lg:h-14 text-base lg:text-lg font-medium border-2 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white rounded-2xl px-8"
                  >
                    Sign In
                  </Button>
                </Link>
              </div>

              {/* Social Proof */}
              <div className="pt-4 lg:pt-8 space-y-3">
                <div className="flex items-center justify-center lg:justify-start space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 lg:w-5 lg:h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm lg:text-base text-slate-400">
                  Loved by <span className="font-semibold text-slate-200">10,000+</span> productive people
                </p>
              </div>
            </div>

            {/* Right Column - Visual */}
            <div className="relative lg:block">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Desktop Preview */}
                <div className="hidden lg:block relative">
                  <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 shadow-2xl border border-slate-700">
                    <div className="space-y-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl"></div>
                        <div className="space-y-1">
                          <div className="w-24 h-3 bg-slate-600 rounded"></div>
                          <div className="w-16 h-2 bg-slate-700 rounded"></div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="bg-slate-700/50 rounded-xl p-4 space-y-2">
                            <div className="w-3/4 h-3 bg-slate-500 rounded"></div>
                            <div className="w-1/2 h-2 bg-slate-600 rounded"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile Preview */}
                <div className="lg:hidden relative">
                  <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-700 max-w-xs mx-auto">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg"></div>
                        <div className="space-y-1">
                          <div className="w-20 h-2 bg-slate-600 rounded"></div>
                          <div className="w-12 h-1 bg-slate-700 rounded"></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="bg-slate-700/50 rounded-xl p-3 space-y-1">
                            <div className="w-3/4 h-2 bg-slate-500 rounded"></div>
                            <div className="w-1/2 h-1 bg-slate-600 rounded"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 lg:px-8 pb-12 lg:pb-20 safe-area-inset">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl lg:text-4xl font-bold text-white mb-4">Everything You Need</h2>
            <p className="text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto">
              Powerful features that feel effortless on every device
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Feature Cards */}
            <Card className="bg-gradient-to-br from-slate-800/50 to-blue-900/30 border-slate-700/50 shadow-lg backdrop-blur-sm hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-6 lg:p-8">
                <div className="space-y-4">
                  <div className="w-12 h-12 lg:w-16 lg:h-16 bg-blue-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle2 className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-lg lg:text-xl mb-2">Smart Organization</h3>
                    <p className="text-sm lg:text-base text-slate-300 leading-relaxed">
                      Automatically organize tasks by project, priority, and due date. Your workflow, simplified.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 border-slate-700/50 shadow-lg backdrop-blur-sm hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-6 lg:p-8">
                <div className="space-y-4">
                  <div className="w-12 h-12 lg:w-16 lg:h-16 bg-purple-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <BarChart3 className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-lg lg:text-xl mb-2">Daily Insights</h3>
                    <p className="text-sm lg:text-base text-slate-300 leading-relaxed">
                      Track your productivity with beautiful charts and personalized insights that motivate you.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-slate-800/50 to-green-900/30 border-slate-700/50 shadow-lg backdrop-blur-sm hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-6 lg:p-8">
                <div className="space-y-4">
                  <div className="w-12 h-12 lg:w-16 lg:h-16 bg-green-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Zap className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-lg lg:text-xl mb-2">Lightning Fast</h3>
                    <p className="text-sm lg:text-base text-slate-300 leading-relaxed">
                      Built for speed. Every interaction is instant, every animation is smooth.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Platform Support Section */}
      <section className="container mx-auto px-4 lg:px-8 pb-12 lg:pb-20 safe-area-inset">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-8 lg:mb-12">Works Everywhere You Do</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto">
                <Monitor className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-lg mb-2">Desktop</h3>
                <p className="text-slate-300 text-sm">Full-featured experience for power users</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto">
                <Smartphone className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-lg mb-2">Mobile</h3>
                <p className="text-slate-300 text-sm">Native-feeling iOS and Android experience</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-lg mb-2">Web</h3>
                <p className="text-slate-300 text-sm">Access anywhere with your browser</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="container mx-auto px-4 lg:px-8 pb-8 lg:pb-16 safe-area-inset">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-purple-600 to-blue-600 border-0 shadow-2xl">
            <CardContent className="p-8 lg:p-12 text-center text-white">
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">Ready to Get Organized?</h3>
              <p className="text-lg lg:text-xl text-purple-100 mb-8 leading-relaxed max-w-2xl mx-auto">
                Join thousands who've transformed their productivity with TaskFlow. Start your journey today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth/signup">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto h-12 lg:h-14 bg-white text-purple-600 hover:bg-gray-50 font-semibold rounded-2xl px-8 text-base lg:text-lg"
                  >
                    Start Your Free Trial
                  </Button>
                </Link>
                <Link href="/auth/login">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto h-12 lg:h-14 border-2 border-white/30 text-white hover:bg-white/10 font-semibold rounded-2xl px-8 text-base lg:text-lg"
                  >
                    Sign In
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Bottom Safe Area */}
      <div className="h-safe-bottom bg-transparent"></div>
    </div>
  )
}
