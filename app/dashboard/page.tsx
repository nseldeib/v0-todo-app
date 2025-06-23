"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { DashboardHeader } from "@/components/dashboard-header"
import { DailyRecap } from "@/components/daily-recap"
import { ProjectCard } from "@/components/project-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search, CheckCircle2, Clock, AlertTriangle } from "lucide-react"
import type { Project, Task } from "@/lib/types"

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [taskDialogOpen, setTaskDialogOpen] = useState(false)
  const [projectDialogOpen, setProjectDialogOpen] = useState(false)
  const [selectedProjectId, setSelectedProjectId] = useState<string>("")
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
    try {
      // Fetch projects
      const { data: projectsData } = await supabase
        .from("projects")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      // Fetch tasks with project info
      const { data: tasksData } = await supabase
        .from("tasks")
        .select(`
          *,
          project:projects(*)
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      if (projectsData) setProjects(projectsData)
      if (tasksData) setTasks(tasksData)
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

  if (loading) {
    return (
      <div className="min-h-screen gradient-bg">
        <DashboardHeader />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-muted rounded w-1/4"></div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 bg-muted rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen gradient-bg">
      <DashboardHeader userEmail={user?.email} />

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Welcome Section */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Welcome back, {user?.email?.split("@")[0]}!</h1>
          <p className="text-muted-foreground">Here's what's happening with your projects today.</p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4">
          <Button onClick={() => setProjectDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
          <Button variant="outline" onClick={() => handleCreateTask()}>
            <Plus className="w-4 h-4 mr-2" />
            New Task
          </Button>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="tasks">All Tasks</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <DailyRecap />

              {/* Quick Stats */}
              <Card className="project-card">
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                  <CardDescription>Your productivity at a glance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total Projects</span>
                    <Badge variant="secondary">{projects.length}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total Tasks</span>
                    <Badge variant="secondary">{tasks.length}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Completed Tasks</span>
                    <Badge variant="secondary" className="bg-green-500/20 text-green-500">
                      {tasks.filter((t) => t.status === "completed").length}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">In Progress</span>
                    <Badge variant="secondary" className="bg-blue-500/20 text-blue-500">
                      {tasks.filter((t) => t.status === "in_progress").length}
                    </Badge>
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
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                      <Plus className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
                    <p className="text-muted-foreground text-center mb-4">
                      Create your first project to start organizing your tasks
                    </p>
                    <Button onClick={() => setProjectDialogOpen(true)}>
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
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={statusFilter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("all")}
                >
                  All
                </Button>
                <Button
                  variant={statusFilter === "todo" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("todo")}
                >
                  To Do
                </Button>
                <Button
                  variant={statusFilter === "in_progress" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("in_progress")}
                >
                  In Progress
                </Button>
                <Button
                  variant={statusFilter === "completed" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("completed")}
                >
                  Completed
                </Button>
              </div>
            </div>

            {/* Tasks List */}
            <div className="space-y-4">
              {filteredTasks.map((task) => (
                <Card key={task.id} className="task-card">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-1 flex items-center gap-2">
                        {getStatusIcon(task.status)}
                        {task.emoji && <span className="text-lg">{task.emoji}</span>}
                        {task.is_important && <span className="text-yellow-500">⭐</span>}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-1">{task.title}</h3>
                            {task.description && (
                              <p className="text-muted-foreground text-sm mb-2">{task.description}</p>
                            )}
                            <div className="flex items-center gap-3 text-sm">
                              {task.project && (
                                <div className="flex items-center gap-1">
                                  <span className="text-lg">{task.project.emoji || "📋"}</span>
                                  <span className="text-muted-foreground">{task.project.name}</span>
                                </div>
                              )}
                              {task.due_date && (
                                <span className="text-muted-foreground">
                                  Due: {new Date(task.due_date).toLocaleDateString()}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className={getPriorityColor(task.priority)}>
                              {task.priority}
                            </Badge>
                            <Badge variant="secondary">{task.status.replace("_", " ")}</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {filteredTasks.length === 0 && (
                <Card className="task-card">
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                      <CheckCircle2 className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">No tasks found</h3>
                    <p className="text-muted-foreground text-center mb-4">
                      Try adjusting your filters or creating a new task
                    </p>
                    <Button onClick={() => handleCreateTask()}>
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
    </div>
  )
}
