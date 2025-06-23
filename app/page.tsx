import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle2, ArrowRight, Zap, Code2 } from "lucide-react"

export default async function HomePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen gradient-bg flex flex-col relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-orange-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Navigation */}
      <nav className="p-6 relative z-10">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center pulse-glow">
              <CheckCircle2 className="w-6 h-6 text-black" />
            </div>
            <h1 className="text-2xl font-bold text-gradient">TaskFlow</h1>
            <span className="px-2 py-1 text-xs font-semibold bg-gradient-to-r from-orange-500/20 to-pink-500/20 text-orange-400 rounded-full border border-orange-500/30">
              BETA
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild className="text-white/70 hover:text-cyan-400 transition-colors">
              <Link href="/auth/login">Access Portal</Link>
            </Button>
            <Button asChild className="btn-primary glow-effect">
              <Link href="/auth/signup">Join Beta</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center px-6 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center px-6 py-3 rounded-full glass-effect mb-8 float-animation">
              <Code2 className="w-5 h-5 mr-3 text-cyan-400" />
              <span className="text-sm font-medium text-white/90">Next-gen productivity platform</span>
              <Zap className="w-4 h-4 ml-3 text-orange-400" />
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-[0.9] tracking-tight">
            <span className="text-gradient block">TASK</span>
            <span className="text-white block">FLOW</span>
            <span className="text-gradient-secondary block text-5xl md:text-6xl lg:text-7xl font-light">/BETA</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/60 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            Experience the future of task management. Built for developers, designers, and digital creators who demand
            <span className="text-cyan-400 font-medium"> performance</span> and
            <span className="text-orange-400 font-medium"> aesthetics</span>.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
            <Button size="lg" asChild className="btn-primary glow-effect text-lg px-10 py-6 h-auto font-semibold">
              <Link href="/auth/signup">
                ENTER BETA
                <ArrowRight className="w-5 h-5 ml-3" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="btn-secondary text-lg px-10 py-6 h-auto font-semibold">
              VIEW DEMO
            </Button>
          </div>

          <div className="flex items-center justify-center space-x-8 text-sm text-white/40">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Live Beta</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <span>Real-time Sync</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
              <span>Open Source</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="p-6 relative z-10">
        <div className="container mx-auto text-center">
          <p className="text-white/30 text-sm font-mono">Built with Next.js 15 × Supabase × Tailwind CSS</p>
        </div>
      </footer>
    </div>
  )
}
