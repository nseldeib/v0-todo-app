"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { CheckCircle2 } from "lucide-react"
import type { Project, Task } from "@/lib/types"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<any>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    checkUser()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session) {
        setUser(session.user)
      } else if (event === "SIGNED_OUT" || !session) {
        setUser(null)
        router.push("/auth/login")
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (user) {
      fetchStats()
    }
  }, [user])

  const checkUser = async () => {
    try {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession()

      if (sessionError || !session) {
        router.push("/auth/login")
        return
      }

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()

      if (userError || !user) {
        router.push("/auth/login")
        return
      }

      setUser(user)
    } catch (error) {
      console.error("Error checking user:", error)
      router.push("/auth/login")
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    if (!user) return

    try {
      // Fetch projects count
      const { data: projectsData, error: projectsError } = await supabase
        .from("projects")
        .select("*")
        .eq("user_id", user.id)

      if (!projectsError && projectsData) {
        setProjects(projectsData)
      }

      // Fetch tasks count
      const { data: tasksData, error: tasksError } = await supabase.from("tasks").select("*").eq("user_id", user.id)

      if (!tasksError && tasksData) {
        setTasks(tasksData)
      }
    } catch (error) {
      console.error("Error fetching stats:", error)
    }
  }

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
      router.push("/")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  if (loading) {
    return (
      <TooltipProvider>
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center">
          <div className="text-center space-y-6">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto animate-pulse shadow-2xl shadow-purple-500/25">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-3xl opacity-20 animate-ping"></div>
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-white">Loading TaskFlow</h2>
              <p className="text-slate-300">Setting up your workspace...</p>
            </div>
          </div>
        </div>
      </TooltipProvider>
    )
  }

  if (!user) {
    return null
  }

  return (
    <TooltipProvider>
      <SidebarProvider>
        <DashboardSidebar
          userEmail={user?.email}
          onSignOut={handleSignOut}
          onCreateProject={() => {
            // These will be handled by individual pages
          }}
          onCreateTask={() => {
            // These will be handled by individual pages
          }}
          stats={{
            projects: projects.length,
            completedTasks: tasks.filter((t) => t.status === "completed").length,
            inProgressTasks: tasks.filter((t) => t.status === "in_progress").length,
            todoTasks: tasks.filter((t) => t.status === "todo").length,
          }}
        />
        <SidebarInset>
          {/* Mobile Header */}
          <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50 lg:hidden">
            <div className="flex items-center justify-between p-4">
              <SidebarTrigger className="text-white" />
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold text-white">TaskFlow</span>
              </div>
              <div className="w-10" /> {/* Spacer for centering */}
            </div>
          </header>
          {children}
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  )
}
