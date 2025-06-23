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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search, CheckCircle2, Clock, AlertTriangle, Filter } from "lucide-react"
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
        return "bg-red-500/20 text-red-500 border-red-500/20"
      case "medium":
        return "bg-yellow-500/20 text-yellow-500 border-yellow-500/20"
      case "low":
        return "bg-green-500/20 text-green-500 border-green-500/20"
      default:
        return "bg-gray-500/20 text-gray-500 border-gray-500/20"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-4 h-4 text-green-500" />
      case "in_progress":
        return <Clock className="w-4 h-4 text-blue-500" />
      case "todo":
        return <AlertTriangle className="w-4 h-4 text-gray-500" />
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-500" />
    }
  }

  // Show loading while checking authentication
  if (!authChecked || loading) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          <p className="text-white/80">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  // If no user after auth check, don't render anything (redirect will happen)
  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen gradient-bg">
      <DashboardHeader userEmail={user?.email} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 space-y-6 sm:space-y-8">
        {/* Welcome Section */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold">Welcome back, {user?.email?.split("@")[0]}!</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Here's what's happening with your projects today.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Button onClick={() => setProjectDialogOpen(true)} className="w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
          <Button variant="outline" onClick={() => handleCreateTask()} className="w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            New Task
          </Button>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 h-auto p-1">
            <TabsTrigger value="overview" className="text-xs sm:text-sm py-2">
              Overview
            </TabsTrigger>
            <TabsTrigger value="projects" className="text-xs sm:text-sm py-2">
              Projects
            </TabsTrigger>
            <TabsTrigger value="tasks" className="text-xs sm:text-sm py-2">
              All Tasks
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              <div className="lg:col-span-2 xl:col-span-1">
                <DailyRecap />
              </div>

              {/* Quick Stats */}
              <Card className="project-card">
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">Quick Stats</CardTitle>
                  <CardDescription className="text-sm">Your productivity at a glance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{projects.length}</div>
                      <div className="text-xs text-muted-foreground">Projects</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">{tasks.length}</div>
                      <div className="text-xs text-muted-foreground">Tasks</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-500">
                        {tasks.filter((t) => t.status === "completed").length}
                      </div>
                      <div className="text-xs text-muted-foreground">Completed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-500">
                        {tasks.filter((t) => t.status === "in_progress").length}
                      </div>
                      <div className="text-xs text-muted-foreground">In Progress</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Projects */}
              {projects.slice(0, 1).map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  tasks={getTasksByProject(project.id)}
                  onUpdate={fetchData}
                  onCreateTask={handleCreateTask}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
                <Card className="project-card col-span-full">
                  <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                      <Plus className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
                    <p className="text-muted-foreground text-center mb-4 text-sm">
                      Create your first project to start organizing your tasks
                    </p>
                    <Button onClick={() => setProjectDialogOpen(true)} className="w-full sm:w-auto">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Project
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-6">
            {/* Task Filters */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search tasks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-10 sm:h-11"
                  />
                </div>
                <Button
                  variant="outline"
                  onClick={() => setShowMobileFilters(!showMobileFilters)}
                  className="sm:hidden"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </div>

              {/* Mobile Filters */}
              <div className={`${showMobileFilters ? "block" : "hidden"} sm:block`}>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={statusFilter === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setStatusFilter("all")}
                    className="text-xs"
                  >
                    All
                  </Button>
                  <Button
                    variant={statusFilter === "todo" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setStatusFilter("todo")}
                    className="text-xs"
                  >
                    To Do
                  </Button>
                  <Button
                    variant={statusFilter === "in_progress" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setStatusFilter("in_progress")}
                    className="text-xs"
                  >
                    In Progress
                  </Button>
                  <Button
                    variant={statusFilter === "completed" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setStatusFilter("completed")}
                    className="text-xs"
                  >
                    Completed
                  </Button>
                </div>
              </div>
            </div>

            {/* Tasks List */}
            <div className="space-y-3 sm:space-y-4">
              {filteredTasks.map((task) => (
                <Card key={task.id} className="task-card">
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="flex-shrink-0 mt-1 flex items-center gap-2">
                        {getStatusIcon(task.status)}
                        {task.emoji && <span className="text-base sm:text-lg">{task.emoji}</span>}
                        {task.is_important && <span className="text-yellow-500 text-sm sm:text-base">⭐</span>}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-4">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-base sm:text-lg mb-1 line-clamp-2">{task.title}</h3>
                            {task.description && (
                              <p className="text-muted-foreground text-sm mb-2 line-clamp-2">{task.description}</p>
                            )}
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                              {task.project && (
                                <div className="flex items-center gap-1">
                                  <span className="text-sm sm:text-base">{task.project.emoji || "📋"}</span>
                                  <span className="text-muted-foreground truncate">{task.project.name}</span>
                                </div>
                              )}
                              {task.due_date && (
                                <span className="text-muted-foreground">
                                  Due: {new Date(task.due_date).toLocaleDateString()}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <Badge variant="outline" className={`text-xs ${getPriorityColor(task.priority)}`}>
                              {task.priority}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {task.status.replace("_", " ")}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {filteredTasks.length === 0 && (
                <Card className="task-card">
                  <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                      <CheckCircle2 className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">No tasks found</h3>
                    <p className="text-muted-foreground text-center mb-4 text-sm">
                      Try adjusting your filters or creating a new task
                    </p>
                    <Button onClick={() => handleCreateTask()} className="w-full sm:w-auto">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Task
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
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
    </div>
  )
}
