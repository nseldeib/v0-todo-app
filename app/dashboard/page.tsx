"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { DashboardHeader } from "@/components/dashboard-header"
import { DailyRecap } from "@/components/daily-recap"
import { ProjectCard } from "@/components/project-card"
import { TaskDialog } from "@/components/task-dialog"
import { ProjectDialog } from "@/components/project-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Plus,
  Search,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Sparkles,
  TrendingUp,
  Filter,
  MoreHorizontal,
  Calendar,
  Target,
} from "lucide-react"
import type { Project, Task } from "@/lib/types"

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [authChecked, setAuthChecked] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [taskDialogOpen, setTaskDialogOpen] = useState(false)
  const [projectDialogOpen, setProjectDialogOpen] = useState(false)
  const [selectedProjectId, setSelectedProjectId] = useState<string>("")
  const [showMobileFilters, setShowMobileFilters] = useState(false)
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
        setAuthChecked(true)
      } else if (event === "SIGNED_OUT" || !session) {
        setUser(null)
        setAuthChecked(true)
        router.push("/auth/login")
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (user && authChecked) {
      fetchData()
    }
  }, [user, authChecked])

  useEffect(() => {
    filterTasks()
  }, [tasks, searchQuery, statusFilter])

  const checkUser = async () => {
    try {
      // First check if we have a session
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession()

      if (sessionError) {
        console.error("Session error:", sessionError)
        setAuthChecked(true)
        router.push("/auth/login")
        return
      }

      if (!session) {
        console.log("No session found")
        setAuthChecked(true)
        router.push("/auth/login")
        return
      }

      // If we have a session, get the user
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession()

      if (sessionError) {
        console.error("Session error:", sessionError)
        setAuthChecked(true)
        router.push("/auth/login")
        return
      }

      if (!session) {
        console.log("No session found")
        setAuthChecked(true)
        router.push("/auth/login")
        return
      }

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()

      if (userError) {
        console.error("User error:", userError)
        setAuthChecked(true)
        router.push("/auth/login")
        return
      }

      if (!user) {
        console.log("No user found")
        setAuthChecked(true)
        router.push("/auth/login")
        return
      }

      setUser(user)
      setAuthChecked(true)
    } catch (error) {
      console.error("Error checking user:", error)
      setAuthChecked(true)
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

  const handleCreateTask = (projectId?: string) => {
    setSelectedProjectId(projectId || "")
    setTaskDialogOpen(true)
  }

  const getTasksByProject = (projectId: string) => {
    return tasks.filter((task) => task.project_id === projectId)
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

  // Show loading while checking authentication
  if (!authChecked || loading) {
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
            <div className="space-y-2">
              <div className="w-48 h-2 bg-slate-800 rounded-full overflow-hidden mx-auto">
                <div className="w-full h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full animate-pulse"></div>
              </div>
              <div className="flex justify-center space-x-1">
                <Skeleton className="w-2 h-2 rounded-full bg-slate-700" />
                <Skeleton className="w-2 h-2 rounded-full bg-slate-700" />
                <Skeleton className="w-2 h-2 rounded-full bg-slate-700" />
              </div>
            </div>
          </div>
        </div>
      </TooltipProvider>
    )
  }

  // If no user after auth check, don't render anything (redirect will happen)
  if (!user) {
    return null
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
        {/* Status Bar Safe Area */}
        <div className="h-safe-top bg-transparent"></div>

        <DashboardHeader userEmail={user?.email} />

        <div className="container mx-auto px-4 lg:px-8 py-6 lg:py-8 safe-area-inset space-y-6 lg:space-y-8">
          {/* Welcome Section */}
          <Card className="bg-gradient-to-r from-slate-900/50 to-purple-900/30 border-slate-700/50 backdrop-blur-sm">
            <CardContent className="p-6 lg:p-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex items-center space-x-3 lg:space-x-4">
                  <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl lg:rounded-3xl flex items-center justify-center shadow-lg">
                    <Sparkles className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-white">
                      Welcome back, {user?.email?.split("@")[0]}!
                    </h1>
                    <p className="text-slate-300 lg:text-lg">Ready to tackle your day?</p>
                  </div>
                </div>

                {/* Desktop Quick Actions */}
                <div className="hidden lg:flex items-center space-x-4">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={() => setProjectDialogOpen(true)}
                        className="h-12 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 hover:from-cyan-700 hover:via-purple-700 hover:to-pink-700 rounded-2xl px-6 shadow-lg shadow-purple-500/25"
                      >
                        <Plus className="w-5 h-5 mr-2" />
                        New Project
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Create a new project to organize your tasks</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        onClick={() => handleCreateTask()}
                        className="h-12 border-2 border-slate-600 text-slate-300 hover:border-slate-500 hover:bg-slate-800 rounded-2xl px-6"
                      >
                        <Plus className="w-5 h-5 mr-2" />
                        New Task
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Add a new task to your workflow</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>

              {/* Mobile Quick Actions */}
              <div className="grid grid-cols-2 gap-3 lg:hidden mt-4">
                <Button
                  onClick={() => setProjectDialogOpen(true)}
                  className="h-14 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 hover:from-cyan-700 hover:via-purple-700 hover:to-pink-700 rounded-2xl shadow-lg shadow-purple-500/25"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  New Project
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleCreateTask()}
                  className="h-14 border-2 border-slate-600 hover:border-slate-500 rounded-2xl"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  New Task
                </Button>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="overview" className="space-y-6 lg:space-y-8">
            <TabsList className="grid w-full grid-cols-3 h-12 lg:h-14 p-1 bg-slate-800/50 rounded-2xl border border-slate-700/50">
              <TabsTrigger
                value="overview"
                className="rounded-xl font-medium text-sm lg:text-base data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-600 data-[state=active]:to-purple-600"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="projects"
                className="rounded-xl font-medium text-sm lg:text-base data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-600 data-[state=active]:to-purple-600"
              >
                Projects
              </TabsTrigger>
              <TabsTrigger
                value="tasks"
                className="rounded-xl font-medium text-sm lg:text-base data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-600 data-[state=active]:to-purple-600"
              >
                Tasks
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6 lg:space-y-8">
              {/* Stats Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                <Card className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 border-blue-700/50 backdrop-blur-sm hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
                  <CardContent className="p-4 lg:p-6 text-center">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-blue-500/30">
                      <TrendingUp className="w-5 h-5 lg:w-6 lg:h-6 text-blue-400" />
                    </div>
                    <div className="text-xl lg:text-2xl font-bold text-blue-100">{projects.length}</div>
                    <div className="text-xs lg:text-sm text-blue-300">Active Projects</div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-900/50 to-green-800/30 border-green-700/50 backdrop-blur-sm hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300">
                  <CardContent className="p-4 lg:p-6 text-center">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-green-500/30">
                      <CheckCircle2 className="w-5 h-5 lg:w-6 lg:h-6 text-green-400" />
                    </div>
                    <div className="text-xl lg:text-2xl font-bold text-green-100">
                      {tasks.filter((t) => t.status === "completed").length}
                    </div>
                    <div className="text-xs lg:text-sm text-green-300">Completed</div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-yellow-900/50 to-yellow-800/30 border-yellow-700/50 backdrop-blur-sm hover:shadow-lg hover:shadow-yellow-500/10 transition-all duration-300">
                  <CardContent className="p-4 lg:p-6 text-center">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-yellow-500/20 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-yellow-500/30">
                      <Clock className="w-5 h-5 lg:w-6 lg:h-6 text-yellow-400" />
                    </div>
                    <div className="text-xl lg:text-2xl font-bold text-yellow-100">
                      {tasks.filter((t) => t.status === "in_progress").length}
                    </div>
                    <div className="text-xs lg:text-sm text-yellow-300">In Progress</div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 border-purple-700/50 backdrop-blur-sm hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
                  <CardContent className="p-4 lg:p-6 text-center">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-purple-500/30">
                      <Target className="w-5 h-5 lg:w-6 lg:h-6 text-purple-400" />
                    </div>
                    <div className="text-xl lg:text-2xl font-bold text-purple-100">
                      {tasks.filter((t) => t.status === "todo").length}
                    </div>
                    <div className="text-xs lg:text-sm text-purple-300">To Do</div>
                  </CardContent>
                </Card>
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                {/* Daily Recap */}
                <div className="lg:col-span-1">
                  <DailyRecap />
                </div>

                {/* Recent Projects */}
                <div className="lg:col-span-2 space-y-4 lg:space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg lg:text-xl font-semibold text-white">Recent Projects</h2>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>More options</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <ScrollArea className="h-[600px] lg:h-[500px]">
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6 pr-4">
                      {projects.slice(0, 4).map((project) => (
                        <ProjectCard
                          key={project.id}
                          project={project}
                          tasks={getTasksByProject(project.id)}
                          onUpdate={fetchData}
                          onCreateTask={handleCreateTask}
                        />
                      ))}
                      {projects.length === 0 && (
                        <Card className="border-0 shadow-lg bg-slate-800/50 backdrop-blur-sm xl:col-span-2">
                          <CardContent className="p-6 lg:p-8 text-center space-y-4">
                            <div className="w-16 h-16 bg-slate-700/50 rounded-3xl flex items-center justify-center mx-auto border border-slate-600/50">
                              <Plus className="w-8 h-8 text-slate-400" />
                            </div>
                            <div className="space-y-2">
                              <h3 className="text-lg font-semibold text-white">No projects yet</h3>
                              <p className="text-slate-300 text-sm">Create your first project to get started</p>
                            </div>
                            <Button
                              onClick={() => setProjectDialogOpen(true)}
                              className="w-full lg:w-auto h-12 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 rounded-2xl"
                            >
                              <Plus className="w-5 h-5 mr-2" />
                              Create Project
                            </Button>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="projects" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
                {projects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    tasks={getTasksByProject(project.id)}
                    onUpdate={fetchData}
                    onCreateTask={handleCreateTask}
                  />
                ))}

                {projects.length === 0 && (
                  <Card className="border-0 shadow-lg bg-slate-800/50 backdrop-blur-sm col-span-full">
                    <CardContent className="p-8 lg:p-12 text-center space-y-6">
                      <div className="w-20 h-20 bg-slate-700/50 rounded-3xl flex items-center justify-center mx-auto border border-slate-600/50">
                        <Plus className="w-10 h-10 text-slate-400" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl lg:text-2xl font-semibold text-white">No projects yet</h3>
                        <p className="text-slate-300 lg:text-lg max-w-md mx-auto">
                          Create your first project to start organizing your tasks and boost your productivity
                        </p>
                      </div>
                      <Button
                        onClick={() => setProjectDialogOpen(true)}
                        className="h-12 lg:h-14 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 rounded-2xl px-8 text-base lg:text-lg"
                      >
                        <Plus className="w-5 h-5 mr-2" />
                        Create Your First Project
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="tasks" className="space-y-6">
              {/* Search and Filters */}
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

              {/* Tasks List */}
              <ScrollArea className="h-[800px]">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6 pr-4">
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
                          onClick={() => handleCreateTask()}
                          className="h-12 lg:h-14 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 rounded-2xl px-8 text-base lg:text-lg"
                        >
                          <Plus className="w-5 h-5 mr-2" />
                          Create Your First Task
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>

        {/* Floating Action Button for Mobile */}
        <div className="fixed bottom-6 right-4 z-40 lg:hidden">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => handleCreateTask()}
                size="lg"
                className="w-14 h-14 rounded-full bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 hover:from-cyan-700 hover:via-purple-700 hover:to-pink-700 shadow-2xl shadow-purple-500/25"
              >
                <Plus className="w-6 h-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Create new task</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Dialogs */}
        <TaskDialog
          open={taskDialogOpen}
          onOpenChange={setTaskDialogOpen}
          onSuccess={fetchData}
          projectId={selectedProjectId}
          projects={projects}
        />

        <ProjectDialog open={projectDialogOpen} onOpenChange={setProjectDialogOpen} onSuccess={fetchData} />

        {/* Bottom Safe Area */}
        <div className="h-safe-bottom bg-transparent"></div>
      </div>
    </TooltipProvider>
  )
}
