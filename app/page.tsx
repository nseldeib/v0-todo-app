"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  CheckCircle2,
  Sparkles,
  Zap,
  BarChart3,
  ArrowRight,
  Code,
  Smartphone,
  Monitor,
  Globe,
  Cpu,
  Database,
  Layers,
  Github,
  ExternalLink,
  Calendar,
} from "lucide-react"

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
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-6">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center animate-pulse shadow-2xl shadow-purple-500/25">
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>
            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-3xl opacity-20 animate-ping"></div>
          </div>
          <div className="space-y-2 text-center">
            <div className="w-48 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div className="w-full h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full animate-pulse"></div>
            </div>
            <p className="text-slate-400 text-sm">Initializing TaskFlow...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        {/* Status Bar Safe Area */}
        <div className="h-safe-top bg-transparent"></div>

        {/* Header */}
        <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50">
          <div className="container mx-auto px-4 lg:px-8 py-4 safe-area-inset">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                    <CheckCircle2 className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-950 animate-pulse"></div>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                      TaskFlow
                    </h1>
                    <Badge variant="outline" className="text-xs border-purple-500/50 text-purple-300 bg-purple-500/10">
                      BETA
                    </Badge>
                  </div>
                  <p className="text-xs lg:text-sm text-slate-400 -mt-1">Personal Project</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 lg:space-x-4">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-slate-300 font-medium hover:text-white hover:bg-slate-800/50 rounded-xl"
                      asChild
                    >
                      <Link href="https://github.com/nseldeib/v0-todo-app" target="_blank">
                        <Github className="w-4 h-4" />
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View on GitHub</p>
                  </TooltipContent>
                </Tooltip>
                <Link href="/auth/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-slate-300 font-medium hover:text-white hover:bg-slate-800/50 rounded-xl"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signup" className="hidden lg:block">
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 hover:from-cyan-700 hover:via-purple-700 hover:to-pink-700 shadow-lg shadow-purple-500/25 rounded-xl"
                  >
                    Try Beta
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-4 lg:px-8 pt-8 lg:pt-16 pb-12 lg:pb-20 safe-area-inset relative">
          <div className="max-w-6xl mx-auto">
            <div className="text-center lg:text-left lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center space-y-8 lg:space-y-0">
              {/* Left Column - Content */}
              <div className="space-y-6 lg:space-y-8">
                {/* Hero Badge */}
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-slate-900/80 to-purple-900/50 px-4 py-2 rounded-full border border-purple-700/50 backdrop-blur-sm cursor-pointer hover:border-purple-600/70 transition-colors">
                      <Code className="w-4 h-4 text-cyan-400" />
                      <span className="text-sm font-medium text-slate-300">Built with Next.js & Supabase</span>
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80 bg-slate-900/95 border-slate-700/50 backdrop-blur-xl">
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-white">Tech Stack</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span className="text-sm text-slate-300">Next.js 15 with App Router</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="text-sm text-slate-300">Supabase PostgreSQL</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span className="text-sm text-slate-300">TypeScript & Tailwind CSS</span>
                        </div>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>

                {/* Main Headline */}
                <div className="space-y-4 lg:space-y-6">
                  <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold leading-tight text-white">
                    Task Management
                    <br />
                    <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                      Reimagined
                    </span>
                  </h1>
                  <p className="text-lg lg:text-xl text-slate-300 leading-relaxed max-w-lg mx-auto lg:mx-0">
                    A personal experiment in building the perfect task manager. Clean, fast, and designed for developers
                    who care about details.
                  </p>
                </div>

                {/* Status Badges */}
                <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                  <Badge variant="outline" className="border-green-500/50 text-green-300 bg-green-500/10">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                    Live Beta
                  </Badge>
                  <Badge variant="outline" className="border-blue-500/50 text-blue-300 bg-blue-500/10">
                    <Github className="w-3 h-3 mr-1" />
                    Open Source Soon
                  </Badge>
                  <Badge variant="outline" className="border-purple-500/50 text-purple-300 bg-purple-500/10">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Active Development
                  </Badge>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 pt-4">
                  <Link href="/auth/signup">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto h-12 lg:h-14 text-base lg:text-lg font-semibold bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 hover:from-cyan-700 hover:via-purple-700 hover:to-pink-700 shadow-lg shadow-purple-500/25 rounded-2xl px-8 group"
                    >
                      Try the Beta
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link href="/auth/login">
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto h-12 lg:h-14 text-base lg:text-lg font-medium border-2 border-slate-700 text-slate-300 hover:bg-slate-800/50 hover:text-white hover:border-slate-600 rounded-2xl px-8"
                    >
                      Sign In
                    </Button>
                  </Link>
                </div>

                {/* Developer Note */}
                <div className="pt-4 lg:pt-8">
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <div className="cursor-pointer">
                        <p className="text-sm lg:text-base text-slate-400 italic">
                          "Building this as a learning project and personal tool. Feedback welcome!"
                          <span className="text-slate-500 ml-2">— Developer</span>
                        </p>
                      </div>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80 bg-slate-900/95 border-slate-700/50 backdrop-blur-xl">
                      <div className="flex justify-between space-x-4">
                        <Avatar>
                          <AvatarImage src="/placeholder-user.jpg" />
                          <AvatarFallback className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white">
                            DEV
                          </AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <h4 className="text-sm font-semibold text-white">Developer</h4>
                          <p className="text-sm text-slate-300">
                            Passionate about creating beautiful, functional software.
                          </p>
                          <div className="flex items-center pt-2">
                            <Calendar className="mr-2 h-4 w-4 opacity-70" />
                            <span className="text-xs text-muted-foreground">Started December 2024</span>
                          </div>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </div>
              </div>

              {/* Right Column - Visual */}
              <div className="relative lg:block">
                <div className="relative mx-auto max-w-md lg:max-w-none">
                  {/* Desktop Preview */}
                  <div className="hidden lg:block relative">
                    <Card className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 border-slate-700/50 shadow-2xl backdrop-blur-sm">
                      <CardContent className="p-8">
                        <div className="space-y-6">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-xl"></div>
                            <div className="space-y-1">
                              <div className="w-24 h-3 bg-slate-600 rounded animate-pulse"></div>
                              <div className="w-16 h-2 bg-slate-700 rounded animate-pulse delay-100"></div>
                            </div>
                          </div>
                          <Separator className="bg-slate-700/50" />
                          <div className="space-y-3">
                            {[1, 2, 3].map((i) => (
                              <Card key={i} className="bg-slate-800/50 border-slate-700/30">
                                <CardContent className="p-4 space-y-2">
                                  <div
                                    className="w-3/4 h-3 bg-slate-500 rounded animate-pulse"
                                    style={{ animationDelay: `${i * 200}ms` }}
                                  ></div>
                                  <div
                                    className="w-1/2 h-2 bg-slate-600 rounded animate-pulse"
                                    style={{ animationDelay: `${i * 200 + 100}ms` }}
                                  ></div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Mobile Preview */}
                  <div className="lg:hidden relative">
                    <Card className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 border-slate-700/50 shadow-2xl max-w-xs mx-auto backdrop-blur-sm">
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-lg"></div>
                            <div className="space-y-1">
                              <div className="w-20 h-2 bg-slate-600 rounded animate-pulse"></div>
                              <div className="w-12 h-1 bg-slate-700 rounded animate-pulse delay-100"></div>
                            </div>
                          </div>
                          <Separator className="bg-slate-700/50" />
                          <div className="space-y-2">
                            {[1, 2, 3].map((i) => (
                              <Card key={i} className="bg-slate-800/50 border-slate-700/30">
                                <CardContent className="p-3 space-y-1">
                                  <div
                                    className="w-3/4 h-2 bg-slate-500 rounded animate-pulse"
                                    style={{ animationDelay: `${i * 200}ms` }}
                                  ></div>
                                  <div
                                    className="w-1/2 h-1 bg-slate-600 rounded animate-pulse"
                                    style={{ animationDelay: `${i * 200 + 100}ms` }}
                                  ></div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="container mx-auto px-4 lg:px-8 pb-12 lg:pb-20 safe-area-inset">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-2xl lg:text-4xl font-bold text-white mb-4">Built with Modern Tech</h2>
              <p className="text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto">
                Experimenting with the latest tools and frameworks
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Tech Cards */}
              <Card className="bg-gradient-to-br from-slate-900/50 to-blue-900/20 border-slate-700/50 shadow-lg backdrop-blur-sm hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 group">
                <CardContent className="p-6 lg:p-8">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 lg:w-16 lg:h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-blue-500/30">
                        <Layers className="w-6 h-6 lg:w-8 lg:h-8 text-blue-400" />
                      </div>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Learn more about Next.js</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-lg lg:text-xl mb-2">Next.js 15</h3>
                      <p className="text-sm lg:text-base text-slate-300 leading-relaxed">
                        React Server Components, App Router, and the latest performance optimizations.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-slate-900/50 to-green-900/20 border-slate-700/50 shadow-lg backdrop-blur-sm hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300 group">
                <CardContent className="p-6 lg:p-8">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 lg:w-16 lg:h-16 bg-green-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-green-500/30">
                        <Database className="w-6 h-6 lg:w-8 lg:h-8 text-green-400" />
                      </div>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Learn more about Supabase</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-lg lg:text-xl mb-2">Supabase</h3>
                      <p className="text-sm lg:text-base text-slate-300 leading-relaxed">
                        PostgreSQL database with real-time subscriptions and built-in authentication.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-slate-900/50 to-purple-900/20 border-slate-700/50 shadow-lg backdrop-blur-sm hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 group">
                <CardContent className="p-6 lg:p-8">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 lg:w-16 lg:h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-purple-500/30">
                        <Cpu className="w-6 h-6 lg:w-8 lg:h-8 text-purple-400" />
                      </div>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Learn more about TypeScript</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-lg lg:text-xl mb-2">TypeScript</h3>
                      <p className="text-sm lg:text-base text-slate-300 leading-relaxed">
                        Full type safety with modern React patterns and server-side validation.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 lg:px-8 pb-12 lg:pb-20 safe-area-inset">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-2xl lg:text-4xl font-bold text-white mb-4">Core Features</h2>
              <p className="text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto">
                Focus on the essentials, executed flawlessly
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Feature Cards */}
              <Card className="bg-gradient-to-br from-slate-900/50 to-cyan-900/20 border-slate-700/50 shadow-lg backdrop-blur-sm hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 group">
                <CardContent className="p-6 lg:p-8">
                  <div className="space-y-4">
                    <div className="w-12 h-12 lg:w-16 lg:h-16 bg-cyan-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-cyan-500/30">
                      <CheckCircle2 className="w-6 h-6 lg:w-8 lg:h-8 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-lg lg:text-xl mb-2">Smart Organization</h3>
                      <p className="text-sm lg:text-base text-slate-300 leading-relaxed">
                        Intuitive project and task management with drag-and-drop simplicity.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-slate-900/50 to-purple-900/20 border-slate-700/50 shadow-lg backdrop-blur-sm hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 group">
                <CardContent className="p-6 lg:p-8">
                  <div className="space-y-4">
                    <div className="w-12 h-12 lg:w-16 lg:h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-purple-500/30">
                      <BarChart3 className="w-6 h-6 lg:w-8 lg:h-8 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-lg lg:text-xl mb-2">Progress Tracking</h3>
                      <p className="text-sm lg:text-base text-slate-300 leading-relaxed">
                        Visual insights into your productivity patterns and goal completion.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-slate-900/50 to-pink-900/20 border-slate-700/50 shadow-lg backdrop-blur-sm hover:shadow-xl hover:shadow-pink-500/10 transition-all duration-300 group">
                <CardContent className="p-6 lg:p-8">
                  <div className="space-y-4">
                    <div className="w-12 h-12 lg:w-16 lg:h-16 bg-pink-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-pink-500/30">
                      <Zap className="w-6 h-6 lg:w-8 lg:h-8 text-pink-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-lg lg:text-xl mb-2">Lightning Fast</h3>
                      <p className="text-sm lg:text-base text-slate-300 leading-relaxed">
                        Optimized for speed with instant interactions and smooth animations.
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
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-8 lg:mb-12">Cross-Platform Ready</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Card className="bg-slate-900/50 border-slate-700/50 hover:bg-slate-800/50 transition-colors cursor-pointer">
                    <CardContent className="p-6 space-y-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl flex items-center justify-center mx-auto border border-blue-500/30">
                        <Monitor className="w-8 h-8 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white text-lg mb-2">Desktop</h3>
                        <p className="text-slate-300 text-sm">Responsive web app optimized for productivity</p>
                      </div>
                    </CardContent>
                  </Card>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Works on all desktop browsers</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Card className="bg-slate-900/50 border-slate-700/50 hover:bg-slate-800/50 transition-colors cursor-pointer">
                    <CardContent className="p-6 space-y-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-2xl flex items-center justify-center mx-auto border border-purple-500/30">
                        <Smartphone className="w-8 h-8 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white text-lg mb-2">Mobile</h3>
                        <p className="text-slate-300 text-sm">Native-feeling PWA for iOS and Android</p>
                      </div>
                    </CardContent>
                  </Card>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Install as PWA on mobile devices</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Card className="bg-slate-900/50 border-slate-700/50 hover:bg-slate-800/50 transition-colors cursor-pointer">
                    <CardContent className="p-6 space-y-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-blue-600/20 rounded-2xl flex items-center justify-center mx-auto border border-green-500/30">
                        <Globe className="w-8 h-8 text-green-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white text-lg mb-2">Web</h3>
                        <p className="text-slate-300 text-sm">Works in any modern browser, anywhere</p>
                      </div>
                    </CardContent>
                  </Card>
                </TooltipTrigger>
                <TooltipContent>
                  <p>No installation required</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="container mx-auto px-4 lg:px-8 pb-8 lg:pb-16 safe-area-inset">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-r from-slate-900/80 via-purple-900/50 to-slate-900/80 border border-slate-700/50 shadow-2xl backdrop-blur-sm">
              <CardContent className="p-8 lg:p-12 text-center text-white">
                <div className="space-y-6">
                  <div className="flex justify-center">
                    <Badge variant="outline" className="border-cyan-500/50 text-cyan-300 bg-cyan-500/10 px-4 py-1">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Beta Access Available
                    </Badge>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold mb-4">Ready to Test Drive?</h3>
                  <p className="text-lg lg:text-xl text-slate-300 mb-8 leading-relaxed max-w-2xl mx-auto">
                    This is a work in progress, but it's functional and improving daily. Your feedback helps shape the
                    future of this project.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/auth/signup">
                      <Button
                        size="lg"
                        className="w-full sm:w-auto h-12 lg:h-14 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 hover:from-cyan-700 hover:via-purple-700 hover:to-pink-700 font-semibold rounded-2xl px-8 text-base lg:text-lg shadow-lg shadow-purple-500/25 group"
                      >
                        Join the Beta
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                    <Link href="/auth/login">
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full sm:w-auto h-12 lg:h-14 border-2 border-slate-600 text-slate-300 hover:bg-slate-800/50 hover:text-white hover:border-slate-500 font-semibold rounded-2xl px-8 text-base lg:text-lg"
                      >
                        Sign In
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Bottom Safe Area */}
        <div className="h-safe-bottom bg-transparent"></div>
      </div>
    </TooltipProvider>
  )
}
