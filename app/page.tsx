import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Circle, Minus } from "lucide-react"

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
      {/* Zen background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/5 w-96 h-96 bg-gradient-radial from-white/[0.02] to-transparent rounded-full breathe-animation"></div>
        <div
          className="absolute bottom-1/3 right-1/5 w-64 h-64 bg-gradient-radial from-purple-500/[0.03] to-transparent rounded-full breathe-animation"
          style={{ animationDelay: "4s" }}
        ></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-px h-32 bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
      </div>

      {/* Minimal Navigation */}
      <nav className="p-8 relative z-10">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center gentle-float">
              <Circle className="w-4 h-4 text-white/60" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-display font-normal text-white/90 tracking-wide">TaskFlow</h1>
              <span className="text-xs font-mono text-white/40 tracking-wider">BETA</span>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <Link
              href="/auth/login"
              className="text-sm font-light text-white/60 hover:text-white/90 transition-colors duration-300 tracking-wide"
            >
              Sign In
            </Link>
            <Button asChild className="btn-zen-primary zen-glow text-sm px-6 py-2 h-auto rounded-full">
              <Link href="/auth/signup">Join</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-12">
          {/* Zen indicator */}
          <div className="flex items-center justify-center space-x-4 mb-16">
            <Minus className="w-8 h-8 text-white/20" />
            <div className="w-2 h-2 rounded-full bg-white/30 breathe-animation"></div>
            <Minus className="w-8 h-8 text-white/20" />
          </div>

          {/* Main heading */}
          <div className="space-y-6">
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-display font-normal leading-none tracking-tight">
              <span className="block text-white/95">Task</span>
              <span className="block text-gradient-accent">Flow</span>
            </h1>

            <div className="w-24 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto"></div>
          </div>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl font-light text-white/50 max-w-2xl mx-auto leading-relaxed tracking-wide">
            A mindful approach to productivity.
            <br />
            <span className="text-white/30">Organize thoughts, focus energy, achieve clarity.</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
            <Button
              size="lg"
              asChild
              className="btn-zen-primary zen-glow text-base px-12 py-4 h-auto rounded-full font-light tracking-wide"
            >
              <Link href="/auth/signup">
                Begin Journey
                <ArrowRight className="w-4 h-4 ml-3 opacity-70" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="btn-zen-secondary text-base px-12 py-4 h-auto rounded-full font-light tracking-wide"
            >
              Explore
            </Button>
          </div>

          {/* Zen elements */}
          <div className="pt-16 space-y-8">
            <div className="flex items-center justify-center space-x-8 text-xs font-mono text-white/25 tracking-widest uppercase">
              <span>Mindful</span>
              <div className="w-1 h-1 rounded-full bg-white/20"></div>
              <span>Focused</span>
              <div className="w-1 h-1 rounded-full bg-white/20"></div>
              <span>Intentional</span>
            </div>

            <div className="flex items-center justify-center">
              <div className="w-32 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Minimal Footer */}
      <footer className="p-8 relative z-10">
        <div className="container mx-auto">
          <div className="flex items-center justify-center space-x-6 text-xs font-mono text-white/20 tracking-wider">
            <span>Next.js</span>
            <div className="w-1 h-1 rounded-full bg-white/20"></div>
            <span>Supabase</span>
            <div className="w-1 h-1 rounded-full bg-white/20"></div>
            <span>Tailwind</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
