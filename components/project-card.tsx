"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Edit, Trash2, Plus } from "lucide-react"
import type { Project, Task } from "@/lib/types"

interface ProjectCardProps {
  project: Project
  tasks: Task[]
  onUpdate: () => void
  onCreateTask: (projectId: string) => void
}

export function ProjectCard({ project, tasks, onUpdate, onCreateTask }: ProjectCardProps) {
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const completedTasks = tasks.filter((task) => task.status === "completed").length
  const totalTasks = tasks.length
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this project? This will also delete all associated tasks.")) {
      return
    }

    setLoading(true)
    try {
      const { error } = await supabase.from("projects").delete().eq("id", project.id)

      if (error) throw error
      onUpdate()
    } catch (error) {
      console.error("Error deleting project:", error)
    } finally {
      setLoading(false)
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500/20 text-red-500"
      case "medium":
        return "bg-yellow-500/20 text-yellow-500"
      case "low":
        return "bg-green-500/20 text-green-500"
      default:
        return "bg-gray-500/20 text-gray-500"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-500"
      case "in_progress":
        return "bg-blue-500/20 text-blue-500"
      case "todo":
        return "bg-gray-500/20 text-gray-500"
      default:
        return "bg-gray-500/20 text-gray-500"
    }
  }

  return (
    <Card className="project-card group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl flex-shrink-0">{project.emoji || "📋"}</div>
            <div>
              <CardTitle className="text-lg">{project.name}</CardTitle>
              {project.description && <CardDescription className="mt-1">{project.description}</CardDescription>}
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Edit className="w-4 h-4 mr-2" />
                Edit Project
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete} disabled={loading} className="text-destructive">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Project
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Progress</span>
            <span className="text-muted-foreground">
              {completedTasks}/{totalTasks} tasks
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Recent Tasks */}
        {tasks.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Recent Tasks</h4>
            <div className="space-y-1">
              {tasks.slice(0, 3).map((task) => (
                <div key={task.id} className="flex items-center gap-2 text-sm">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      task.status === "completed"
                        ? "bg-green-500"
                        : task.status === "in_progress"
                          ? "bg-blue-500"
                          : "bg-gray-500"
                    }`}
                  />
                  <span className="flex-1 truncate">{task.title}</span>
                  <Badge variant="secondary" className={`text-xs ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </Badge>
                </div>
              ))}
              {tasks.length > 3 && <p className="text-xs text-muted-foreground">+{tasks.length - 3} more tasks</p>}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="pt-2">
          <Button onClick={() => onCreateTask(project.id)} variant="outline" size="sm" className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Add Task
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
