import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Smartphone, Zap, Shield, Calendar, BarChart3 } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen gradient-bg">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                TaskFlow
              </h1>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <Link href="/auth/login">
                <Button variant="ghost" size="sm" className="text-sm sm:text-base">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button size="sm" className="text-sm sm:text-base">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 sm:py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 sm:space-y-8 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Manage Your Tasks with{" "}
              <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">TaskFlow</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4">
              A modern, intuitive task management application that helps you stay organized, boost productivity, and
              achieve your goals with ease.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link href="/auth/signup">
                <Button size="lg" className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4">
                  Start Free Today
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4"
                >
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 sm:space-y-6 mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Everything You Need to Stay Productive</h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              TaskFlow combines powerful features with an intuitive design to help you manage tasks effortlessly.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <Card className="project-card group hover:scale-105 transition-transform duration-200">
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                </div>
                <CardTitle className="text-lg sm:text-xl">Smart Task Management</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-sm sm:text-base leading-relaxed">
                  Organize tasks with projects, priorities, due dates, and custom emojis. Track progress with visual
                  indicators.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="project-card group hover:scale-105 transition-transform duration-200">
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
                </div>
                <CardTitle className="text-lg sm:text-xl">Daily Recap</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-sm sm:text-base leading-relaxed">
                  Get insights into your productivity with daily statistics, completion rates, and progress tracking.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="project-card group hover:scale-105 transition-transform duration-200">
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500" />
                </div>
                <CardTitle className="text-lg sm:text-xl">Mobile Responsive</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-sm sm:text-base leading-relaxed">
                  Access your tasks anywhere with our fully responsive design that works perfectly on all devices.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="project-card group hover:scale-105 transition-transform duration-200">
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
                </div>
                <CardTitle className="text-lg sm:text-xl">Lightning Fast</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-sm sm:text-base leading-relaxed">
                  Built with Next.js 15 and optimized for speed. Experience instant loading and smooth interactions.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="project-card group hover:scale-105 transition-transform duration-200">
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" />
                </div>
                <CardTitle className="text-lg sm:text-xl">Secure & Private</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-sm sm:text-base leading-relaxed">
                  Your data is protected with enterprise-grade security powered by Supabase authentication.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="project-card group hover:scale-105 transition-transform duration-200">
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" />
                </div>
                <CardTitle className="text-lg sm:text-xl">Smart Scheduling</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-sm sm:text-base leading-relaxed">
                  Set due dates, get reminders, and track overdue tasks to never miss important deadlines.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="project-card max-w-4xl mx-auto">
            <CardContent className="text-center py-12 sm:py-16 px-6 sm:px-8">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
                Ready to Boost Your Productivity?
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
                Join thousands of users who have transformed their task management with TaskFlow. Start your journey
                today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/auth/signup">
                  <Button size="lg" className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4">
                    Get Started Free
                  </Button>
                </Link>
                <Link href="/auth/login">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4"
                  >
                    Sign In
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                TaskFlow
              </h3>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground">
              © 2024 TaskFlow. Built with Next.js 15 and Supabase.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
