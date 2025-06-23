"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CalendarDays, CheckCircle2, Clock, AlertTriangle } from "lucide-react"
import type { DailyStats, Task } from "@/lib/types"

export function DailyRecap() {
  const [stats, setStats] = useState<DailyStats>({ completed: 0, total: 0, overdue: 0, upcoming: 0 })
  const [recentTasks, setRecentTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchDailyStats()
  }, [])

  const fetchDailyStats = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const today = new Date().toISOString().split("T")[0]
      const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split("T")[0]

      // Get all tasks for stats
      const { data: allTasks } = await supabase.from("tasks").select("*").eq("user_id", user.id)

      // Get recent completed tasks
      const { data: completedTasks } = await supabase
        .from("tasks")
        .select("*, project:projects(*)")
        .eq("user_id", user.id)
        .eq("status", "completed")
        .gte("completed_at", today)
        .order("completed_at", { ascending: false })
        .limit(5)

      if (allTasks) {
        const completed = allTasks.filter((task) => task.status === "completed").length
        const total = allTasks.length
        const overdue = allTasks.filter(
          (task) => task.due_date && task.due_date < today && task.status !== "completed",
        ).length
        const upcoming = allTasks.filter((task) => task.due_date === tomorrow && task.status !== "completed").length

        setStats({ completed, total, overdue, upcoming })
      }

      if (completedTasks) {
        setRecentTasks(completedTasks)
      }
    } catch (error) {
      console.error("Error fetching daily stats:", error)
    } finally {
      setLoading(false)
    }
  }

  const completionRate = stats.total > 0 ? (stats.completed / stats.total) * 100 : 0

  if (loading) {
    return (
      <Card className="project-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarDays className="w-5 h-5" />
            Daily Recap
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-2 bg-muted rounded"></div>
            <div className="space-y-2">
              <div className="h-3 bg-muted rounded"></div>
              <div className="h-3 bg-muted rounded w-5/6"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="project-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarDays className="w-5 h-5" />
          Daily Recap
        </CardTitle>
        <CardDescription>Your productivity summary for today</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress Overview */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Overall Progress</span>
            <span className="text-sm text-muted-foreground">
              {stats.completed} of {stats.total} tasks
            </span>
          </div>
          <Progress value={completionRate} className="h-2" />
          <p className="text-xs text-muted-foreground">{completionRate.toFixed(0)}% completion rate</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center w-8 h-8 bg-green-500/20 rounded-full mx-auto mb-1">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-green-500">{stats.completed}</p>
            <p className="text-xs text-muted-foreground">Completed</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-8 h-8 bg-orange-500/20 rounded-full mx-auto mb-1">
              <Clock className="w-4 h-4 text-orange-500" />
            </div>
            <p className="text-2xl font-bold text-orange-500">{stats.upcoming}</p>
            <p className="text-xs text-muted-foreground">Due Tomorrow</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-8 h-8 bg-red-500/20 rounded-full mx-auto mb-1">
              <AlertTriangle className="w-4 h-4 text-red-500" />
            </div>
            <p className="text-2xl font-bold text-red-500">{stats.overdue}</p>
            <p className="text-xs text-muted-foreground">Overdue</p>
          </div>
        </div>

        {/* Recent Completions */}
        {recentTasks.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Recently Completed</h4>
            <div className="space-y-2">
              {recentTasks.map((task) => (
                <div key={task.id} className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{task.title}</p>
                    {task.project && <p className="text-xs text-muted-foreground">{task.project.name}</p>}
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {task.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
