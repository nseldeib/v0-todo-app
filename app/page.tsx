import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle2, ArrowRight, Sparkles } from "lucide-react"

export default async function HomePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen gradient-bg flex flex-col">
      {/* Simple Navigation */}
      <nav className="p-6">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center glow-effect">
              <CheckCircle2 className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-gradient">TaskFlow</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild className="text-white/80 hover:text-white">
              <Link href="/auth/login">Sign In</Link>
            </Button>
            <Button asChild className="glow-effect">
              <Link href="/auth/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section - Centered and Beautiful */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full glass-effect mb-6">
              <Sparkles className="w-4 h-4 mr-2 text-primary" />
              <span className="text-sm text-white/90">Beautiful task management, reimagined</span>
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
            <span className="text-gradient">Organize</span>
            <br />
            <span className="text-white">Everything</span>
            <br />
            <span className="text-gradient">Beautifully</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed">
            The most beautiful way to manage your tasks, projects, and productivity. Built for those who appreciate
            great design.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button size="lg" asChild className="glow-effect text-lg px-8 py-6 h-auto">
              <Link href="/auth/signup">
                Start Your Journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="glass-effect text-lg px-8 py-6 h-auto border-white/20 text-white hover:bg-white/10"
            >
              See How It Works
            </Button>
          </div>
        </div>
      </div>

      {/* Minimal Footer */}
      <footer className="p-6">
        <div className="container mx-auto text-center">
          <p className="text-white/50 text-sm">Built with ❤️ using Next.js 15 and Supabase</p>
        </div>
      </footer>
    </div>
  )
}
