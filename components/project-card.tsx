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
        return "bg-red-900/20 text-red-400"
      case "medium":
        return "bg-yellow-900/20 text-yellow-400"
      case "low":
        return "bg-green-900/20 text-green-400"
      default:
        return "bg-slate-700/50 text-slate-400"
    }
  }

  return (
    <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 shadow-lg hover:bg-slate-800/70 transition-all duration-300 group">
      <CardHeader className="pb-3 lg:pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3 lg:gap-4">
            <div className="text-2xl lg:text-3xl flex-shrink-0">{project.emoji || "📋"}</div>
            <div className="min-w-0">
              <CardTitle className="text-lg lg:text-xl text-white truncate">{project.name}</CardTitle>
              {project.description && (
                <CardDescription className="mt-1 text-slate-300 line-clamp-2">{project.description}</CardDescription>
              )}
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8 lg:w-10 lg:h-10 rounded-xl bg-slate-700/50 hover:bg-slate-600/50"
              >
                <MoreHorizontal className="w-4 h-4 text-slate-300" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
              <DropdownMenuItem className="text-slate-200 hover:bg-slate-700">
                <Edit className="w-4 h-4 mr-2" />
                Edit Project
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete} disabled={loading} className="text-red-400 hover:bg-red-900/20">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Project
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 lg:space-y-6">
        {/* Progress */}
        <div className="space-y-2 lg:space-y-3">
          <div className="flex items-center justify-between text-sm lg:text-base">
            <span className="text-slate-200">Progress</span>
            <span className="text-slate-400">
              {completedTasks}/{totalTasks} tasks
            </span>
          </div>
          <Progress value={progress} className="h-2 lg:h-3 bg-slate-700" />
        </div>

        {/* Recent Tasks */}
        {tasks.length > 0 && (
          <div className="space-y-2 lg:space-y-3">
            <h4 className="text-sm lg:text-base font-medium text-slate-200">Recent Tasks</h4>
            <div className="space-y-2">
              {tasks.slice(0, 3).map((task) => (
                <div key={task.id} className="flex items-center gap-2 lg:gap-3 text-sm lg:text-base">
                  <div
                    className={`w-2 h-2 lg:w-3 lg:h-3 rounded-full ${
                      task.status === "completed"
                        ? "bg-green-500"
                        : task.status === "in_progress"
                          ? "bg-blue-500"
                          : "bg-slate-500"
                    }`}
                  />
                  <span className="flex-1 truncate text-slate-300">{task.title}</span>
                  <Badge variant="secondary" className={`text-xs ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </Badge>
                </div>
              ))}
              {tasks.length > 3 && <p className="text-xs lg:text-sm text-slate-400">+{tasks.length - 3} more tasks</p>}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="pt-2">
          <Button
            onClick={() => onCreateTask(project.id)}
            variant="outline"
            size="sm"
            className="w-full h-10 lg:h-12 border-slate-600 text-slate-300 hover:bg-slate-700 hover:border-slate-500 rounded-xl"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Task
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
