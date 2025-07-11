"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { TaskDialog } from "@/components/task-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Plus, Search, CheckCircle2, Clock, AlertTriangle, Filter, MoreHorizontal, Calendar } from "lucide-react"
import type { Project, Task } from "@/lib/types"

export default function TasksPage() {
  const [user, setUser] = useState<any>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [taskDialogOpen, setTaskDialogOpen] = useState(false)
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    checkUser()
  }, [])

  useEffect(() => {
    if (user) {
      fetchData()
    }
  }, [user])

  useEffect(() => {
    filterTasks()
  }, [tasks, searchQuery, statusFilter])

  const checkUser = async () => {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser()

      if (error || !user) {
        router.push("/auth/login")
        return
      }

      setUser(user)
    } catch (error) {
      console.error("Error checking user:", error)
      router.push("/auth/login")
    }
  }

  const fetchData = async () => {
    if (!user) return

    try {
      // Fetch projects
      const { data: projectsData, error: projectsError } = await supabase
        .from("projects")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      if (projectsError) {
        console.error("Error fetching projects:", projectsError)
      } else if (projectsData) {
        setProjects(projectsData)
      }

      // Fetch tasks with project info
      const { data: tasksData, error: tasksError } = await supabase
        .from("tasks")
        .select(`
          *,
          project:projects(*)
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      if (tasksError) {
        console.error("Error fetching tasks:", tasksError)
      } else if (tasksData) {
        setTasks(tasksData)
      }
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterTasks = () => {
    let filtered = tasks

    if (searchQuery) {
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.description?.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((task) => task.status === statusFilter)
    }

    setFilteredTasks(filtered)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800/30"
      case "medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800/30"
      case "low":
        return "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800/30"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800/50 dark:text-gray-400 dark:border-gray-700/50"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />
      case "in_progress":
        return <Clock className="w-5 h-5 text-blue-500" />
      case "todo":
        return <AlertTriangle className="w-5 h-5 text-gray-500" />
      default:
        return <AlertTriangle className="w-5 h-5 text-gray-500" />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center">
        <div className="text-white">Loading tasks...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Mobile Header */}
      <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50 md:hidden">
        <div className="flex items-center justify-between p-4">
          <SidebarTrigger className="text-white" />
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-white">Tasks</span>
          </div>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>
      </header>

      <div className="p-4 md:p-6 lg:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white">Tasks</h1>
            <p className="text-slate-300">Manage your daily tasks and priorities</p>
          </div>
          <Button
            onClick={() => setTaskDialogOpen(true)}
            className="h-12 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 hover:from-cyan-700 hover:via-purple-700 hover:to-pink-700 rounded-2xl px-6 shadow-lg shadow-purple-500/25"
          >
            <Plus className="w-5 h-5 mr-2" />
            New Task
          </Button>
        </div>

        {/* Search and Filters */}
        <TooltipProvider>
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardContent className="p-4 lg:p-6">
              <div className="space-y-4">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <Input
                      placeholder="Search tasks..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="h-12 lg:h-14 pl-12 text-base bg-slate-800/50 border-slate-600 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setShowMobileFilters(!showMobileFilters)}
                    className="lg:hidden h-12 border-slate-600 text-slate-300 rounded-2xl"
                  >
                    <Filter className="w-5 h-5 mr-2" />
                    Filters
                  </Button>
                </div>

                {/* Filter Buttons */}
                <div className={`${showMobileFilters ? "block" : "hidden"} lg:block`}>
                  <div className="flex flex-wrap gap-2 lg:gap-3">
                    {[
                      { key: "all", label: "All", count: tasks.length },
                      { key: "todo", label: "To Do", count: tasks.filter((t) => t.status === "todo").length },
                      {
                        key: "in_progress",
                        label: "In Progress",
                        count: tasks.filter((t) => t.status === "in_progress").length,
                      },
                      {
                        key: "completed",
                        label: "Done",
                        count: tasks.filter((t) => t.status === "completed").length,
                      },
                    ].map((filter) => (
                      <Tooltip key={filter.key}>
                        <TooltipTrigger asChild>
                          <Button
                            variant={statusFilter === filter.key ? "default" : "outline"}
                            size="sm"
                            onClick={() => setStatusFilter(filter.key)}
                            className={`flex-shrink-0 h-10 lg:h-12 px-4 lg:px-6 rounded-2xl font-medium ${
                              statusFilter === filter.key
                                ? "bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25"
                                : "border-slate-600 text-slate-300 hover:border-slate-500 hover:bg-slate-800"
                            }`}
                          >
                            {filter.label}
                            <Badge
                              variant="secondary"
                              className="ml-2 bg-white/20 text-current border-0 text-xs lg:text-sm"
                            >
                              {filter.count}
                            </Badge>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Filter by {filter.label.toLowerCase()} tasks</p>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TooltipProvider>

        {/* Tasks List */}
        <ScrollArea className="h-[800px]">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6 pr-4">
            {filteredTasks.map((task) => (
              <Card
                key={task.id}
                className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/70 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-200 group"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">{getStatusIcon(task.status)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          {task.emoji && <span className="text-lg">{task.emoji}</span>}
                          {task.is_important && <span className="text-lg">⭐</span>}
                        </div>
                        <CardTitle className="text-base lg:text-lg leading-tight mb-2 line-clamp-2 text-white">
                          {task.title}
                        </CardTitle>
                      </div>
                    </div>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Task options</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    {task.description && (
                      <p className="text-slate-300 text-sm leading-relaxed line-clamp-2">{task.description}</p>
                    )}

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2 text-slate-400">
                          {task.project && (
                            <div className="flex items-center space-x-1">
                              <span className="text-base">{task.project.emoji || "📋"}</span>
                              <span className="font-medium truncate max-w-24">{task.project.name}</span>
                            </div>
                          )}
                          {task.due_date && (
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-3 h-3" />
                              <span className="text-xs">Due {new Date(task.due_date).toLocaleDateString()}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <Separator className="bg-slate-700/50" />

                      <div className="flex items-center justify-between">
                        <Badge className={`text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </Badge>
                        <Badge
                          variant="secondary"
                          className="text-xs bg-slate-700/50 text-slate-300 border-slate-600/50"
                        >
                          {task.status.replace("_", " ")}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredTasks.length === 0 && (
              <Card className="border-0 shadow-lg bg-slate-800/50 backdrop-blur-sm col-span-full">
                <CardContent className="p-8 lg:p-12 text-center space-y-6">
                  <div className="w-20 h-20 bg-slate-700/50 rounded-3xl flex items-center justify-center mx-auto border border-slate-600/50">
                    <CheckCircle2 className="w-10 h-10 text-slate-400" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl lg:text-2xl font-semibold text-white">No tasks found</h3>
                    <p className="text-slate-300 lg:text-lg max-w-md mx-auto">
                      Try adjusting your filters or create a new task to get started
                    </p>
                  </div>
                  <Button
                    onClick={() => setTaskDialogOpen(true)}
                    className="h-12 lg:h-14 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 rounded-2xl px-8 text-base lg:text-lg shadow-lg shadow-purple-500/25"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Create Your First Task
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </ScrollArea>

        {/* Task Dialog */}
        <TaskDialog open={taskDialogOpen} onOpenChange={setTaskDialogOpen} onSuccess={fetchData} projects={projects} />
      </div>
    </div>
  )
}
