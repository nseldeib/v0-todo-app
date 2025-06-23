"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Zap, Users, BarChart3, ArrowRight, Star, Calendar, Target, Sparkles } from "lucide-react"

export function LandingPage() {
  const features = [
    {
      icon: CheckCircle2,
      title: "Smart Task Management",
      description: "Organize your tasks with intelligent prioritization and status tracking.",
    },
    {
      icon: Calendar,
      title: "Project Organization",
      description: "Group related tasks into projects with custom emojis and colors.",
    },
    {
      icon: BarChart3,
      title: "Progress Analytics",
      description: "Track your productivity with detailed insights and daily recaps.",
    },
    {
      icon: Target,
      title: "Goal Achievement",
      description: "Set deadlines and priorities to stay focused on what matters most.",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Built with Next.js 15 for optimal performance and user experience.",
    },
    {
      icon: Users,
      title: "Secure & Private",
      description: "Your data is protected with Supabase authentication and RLS policies.",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Manager",
      content: "TaskFlow has revolutionized how I manage my daily tasks. The interface is beautiful and intuitive.",
      rating: 5,
    },
    {
      name: "Mike Rodriguez",
      role: "Software Engineer",
      content: "Finally, a task manager that doesn't get in my way. Clean, fast, and exactly what I needed.",
      rating: 5,
    },
    {
      name: "Emily Johnson",
      role: "Designer",
      content: "The visual design is stunning. It makes task management actually enjoyable!",
      rating: 5,
    },
  ]

  return (
    <div className="min-h-screen gradient-bg">
      {/* Navigation */}
      <nav className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-gradient">TaskFlow</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/auth/login">Sign In</Link>
            </Button>
            <Button asChild className="glow-effect">
              <Link href="/auth/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge variant="secondary" className="mb-6 glass-effect">
            <Sparkles className="w-4 h-4 mr-2" />
            New: AI-powered task insights coming soon
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gradient">
            Organize Your Life
            <br />
            <span className="text-white">Beautifully</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            TaskFlow is the modern task management app that combines stunning design with powerful features to help you
            stay productive and organized.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="glow-effect">
              <Link href="/auth/signup">
                Start Free Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="glass-effect">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Everything You Need to Stay Organized</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Powerful features designed to make task management effortless and enjoyable.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="project-card group hover:glow-effect transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Loved by Thousands of Users</h2>
            <p className="text-xl text-gray-300">See what our community has to say about TaskFlow.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="project-card">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <Card className="project-card text-center glow-effect">
            <CardContent className="py-16">
              <h2 className="text-4xl font-bold mb-4 text-white">Ready to Transform Your Productivity?</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of users who have already made the switch to TaskFlow. Start organizing your life
                beautifully today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild className="glow-effect">
                  <Link href="/auth/signup">
                    Get Started Free
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="glass-effect">
                  Contact Sales
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/20 backdrop-blur-sm py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-gradient">TaskFlow</span>
            </div>
            <div className="flex space-x-6 text-gray-300">
              <Link href="#" className="hover:text-white transition-colors">
                Privacy
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Terms
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Support
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 text-center text-gray-400">
            <p>&copy; 2024 TaskFlow. All rights reserved. Built with ❤️ using Next.js and Supabase.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
