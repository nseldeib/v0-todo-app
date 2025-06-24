"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { ProjectCard } from "@/components/project-card"
import { ProjectDialog } from "@/components/project-dialog"
import { TaskDialog } from "@/components/task-dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus } from "lucide-react"
import type { Project, Task } from "@/lib/types"

export default function ProjectsPage() {
  const [user, setUser] = useState<any>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [projectDialogOpen, setProjectDialogOpen] = useState(false)
  const [taskDialogOpen, setTaskDialogOpen] = useState(false)
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

      // Fetch tasks
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

  const handleCreateTask = (projectId?: string) => {
    setSelectedProjectId(projectId || "")
    setTaskDialogOpen(true)
  }

  const getTasksByProject = (projectId: string) => {
    return tasks.filter((task) => task.project_id === projectId)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center">
        <div className="text-white">Loading projects...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      <div className="container mx-auto px-4 lg:px-8 py-6 lg:py-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white">Projects</h1>
            <p className="text-slate-300">Manage and organize your work</p>
          </div>
          <Button
            onClick={() => setProjectDialogOpen(true)}
            className="h-12 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 hover:from-cyan-700 hover:via-purple-700 hover:to-pink-700 rounded-2xl px-6"
          >
            <Plus className="w-5 h-5 mr-2" />
            New Project
          </Button>
        </div>

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
    </div>
  )
}
