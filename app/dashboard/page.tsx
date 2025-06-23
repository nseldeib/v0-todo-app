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
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search, CheckCircle2, Clock, AlertTriangle, Sparkles, TrendingUp } from "lucide-react"
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
        return "bg-red-100 text-red-700 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-700 border-green-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto animate-pulse">
            <CheckCircle2 className="w-8 h-8 text-white" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-900">Loading TaskFlow</h2>
            <p className="text-gray-600">Setting up your workspace...</p>
          </div>
          <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden mx-auto">
            <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    )
  }

  // If no user after auth check, don't render anything (redirect will happen)
  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Status Bar Safe Area */}
      <div className="h-safe-top bg-transparent"></div>

      <DashboardHeader userEmail={user?.email} />

      <div className="px-4 py-6 safe-area-inset space-y-8">
        {/* Welcome Section */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.email?.split("@")[0]}!</h1>
              <p className="text-gray-600">Ready to tackle your day?</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={() => setProjectDialogOpen(true)}
            className="h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-2xl shadow-lg shadow-blue-500/25"
          >
            <Plus className="w-5 h-5 mr-2" />
            New Project
          </Button>
          <Button
            variant="outline"
            onClick={() => handleCreateTask()}
            className="h-14 border-2 border-gray-200 hover:border-gray-300 rounded-2xl"
          >
            <Plus className="w-5 h-5 mr-2" />
            New Task
          </Button>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 h-12 p-1 bg-gray-100 rounded-2xl">
            <TabsTrigger value="overview" className="rounded-xl font-medium">
              Overview
            </TabsTrigger>
            <TabsTrigger value="projects" className="rounded-xl font-medium">
              Projects
            </TabsTrigger>
            <TabsTrigger value="tasks" className="rounded-xl font-medium">
              Tasks
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-blue-900">{projects.length}</div>
                  <div className="text-sm text-blue-700">Active Projects</div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-green-900">
                    {tasks.filter((t) => t.status === "completed").length}
                  </div>
                  <div className="text-sm text-green-700">Completed</div>
                </CardContent>
              </Card>
            </div>

            {/* Daily Recap */}
            <DailyRecap />

            {/* Recent Projects */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Recent Projects</h2>
              <div className="space-y-4">
                {projects.slice(0, 3).map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    tasks={getTasksByProject(project.id)}
                    onUpdate={fetchData}
                    onCreateTask={handleCreateTask}
                  />
                ))}
                {projects.length === 0 && (
                  <Card className="border-0 shadow-lg bg-white">
                    <CardContent className="p-8 text-center space-y-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto">
                        <Plus className="w-8 h-8 text-gray-400" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-gray-900">No projects yet</h3>
                        <p className="text-gray-600 text-sm">Create your first project to get started</p>
                      </div>
                      <Button
                        onClick={() => setProjectDialogOpen(true)}
                        className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl"
                      >
                        <Plus className="w-5 h-5 mr-2" />
                        Create Project
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <div className="space-y-4">
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
                <Card className="border-0 shadow-lg bg-white">
                  <CardContent className="p-8 text-center space-y-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto">
                      <Plus className="w-8 h-8 text-gray-400" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-gray-900">No projects yet</h3>
                      <p className="text-gray-600 text-sm">Create your first project to get started</p>
                    </div>
                    <Button
                      onClick={() => setProjectDialogOpen(true)}
                      className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl"
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      Create Project
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-6">
            {/* Search and Filters */}
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-14 pl-12 text-base border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Filter Buttons */}
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {[
                  { key: "all", label: "All", count: tasks.length },
                  { key: "todo", label: "To Do", count: tasks.filter((t) => t.status === "todo").length },
                  {
                    key: "in_progress",
                    label: "In Progress",
                    count: tasks.filter((t) => t.status === "in_progress").length,
                  },
                  { key: "completed", label: "Done", count: tasks.filter((t) => t.status === "completed").length },
                ].map((filter) => (
                  <Button
                    key={filter.key}
                    variant={statusFilter === filter.key ? "default" : "outline"}
                    size="sm"
                    onClick={() => setStatusFilter(filter.key)}
                    className={`flex-shrink-0 h-10 px-4 rounded-2xl font-medium ${
                      statusFilter === filter.key
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {filter.label}
                    <Badge variant="secondary" className="ml-2 bg-white/20 text-current border-0">
                      {filter.count}
                    </Badge>
                  </Button>
                ))}
              </div>
            </div>

            {/* Tasks List */}
            <div className="space-y-4">
              {filteredTasks.map((task) => (
                <Card key={task.id} className="border-0 shadow-lg bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 mt-1">{getStatusIcon(task.status)}</div>
                      <div className="flex-1 min-w-0 space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              {task.emoji && <span className="text-lg">{task.emoji}</span>}
                              {task.is_important && <span className="text-lg">⭐</span>}
                            </div>
                            <h3 className="font-semibold text-gray-900 text-lg leading-tight mb-2">{task.title}</h3>
                            {task.description && (
                              <p className="text-gray-600 text-sm leading-relaxed mb-3">{task.description}</p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3 text-sm text-gray-500">
                            {task.project && (
                              <div className="flex items-center space-x-1">
                                <span className="text-base">{task.project.emoji || "📋"}</span>
                                <span className="font-medium">{task.project.name}</span>
                              </div>
                            )}
                            {task.due_date && <span>Due {new Date(task.due_date).toLocaleDateString()}</span>}
                          </div>

                          <div className="flex items-center space-x-2">
                            <Badge className={`text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                              {task.priority}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {filteredTasks.length === 0 && (
                <Card className="border-0 shadow-lg bg-white">
                  <CardContent className="p-8 text-center space-y-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8 text-gray-400" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-gray-900">No tasks found</h3>
                      <p className="text-gray-600 text-sm">Try adjusting your filters or create a new task</p>
                    </div>
                    <Button
                      onClick={() => handleCreateTask()}
                      className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl"
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      Create Task
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Floating Action Button for Mobile */}
      <div className="fixed bottom-6 right-4 z-40">
        <Button
          onClick={() => handleCreateTask()}
          size="lg"
          className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-2xl shadow-blue-500/25"
        >
          <Plus className="w-6 h-6" />
        </Button>
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
  )
}
