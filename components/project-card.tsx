"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Plus, MoreHorizontal, Edit, Trash2, CheckCircle2, Clock, AlertTriangle } from "lucide-react"
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
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  const handleDeleteProject = async () => {
    setLoading(true)
    try {
      // First delete all tasks in the project
      const { error: tasksError } = await supabase.from("tasks").delete().eq("project_id", project.id)

      if (tasksError) {
        console.error("Error deleting tasks:", tasksError)
        return
      }

      // Then delete the project
      const { error: projectError } = await supabase.from("projects").delete().eq("id", project.id)

      if (projectError) {
        console.error("Error deleting project:", projectError)
        return
      }

      onUpdate()
    } catch (error) {
      console.error("Error deleting project:", error)
    } finally {
      setLoading(false)
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

  return (
    <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/70 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-200 group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{project.emoji || "📋"}</div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg leading-tight mb-1 line-clamp-1 text-white">{project.name}</CardTitle>
              {project.description && <p className="text-slate-300 text-sm line-clamp-2">{project.description}</p>}
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-slate-800 border-slate-700" align="end">
              <DropdownMenuItem className="text-slate-300 hover:bg-slate-700 hover:text-white">
                <Edit className="mr-2 h-4 w-4" />
                Edit Project
              </DropdownMenuItem>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem
                    className="text-red-400 hover:bg-red-500/10 hover:text-red-300"
                    onSelect={(e) => e.preventDefault()}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Project
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-slate-800 border-slate-700">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-white">Delete Project</AlertDialogTitle>
                    <AlertDialogDescription className="text-slate-300">
                      Are you sure you want to delete "{project.name}"? This will also delete all tasks in this project.
                      This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDeleteProject}
                      disabled={loading}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      {loading ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-300">Progress</span>
            <span className="text-white font-medium">
              {completedTasks}/{totalTasks} tasks
            </span>
          </div>
          <Progress value={completionRate} className="h-2 bg-slate-700" />
          <div className="text-center">
            <span className="text-lg font-bold text-white">{completionRate}%</span>
          </div>
        </div>

        {/* Recent Tasks */}
        {tasks.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-slate-300">Recent Tasks</h4>
            <div className="space-y-1">
              {tasks.slice(0, 3).map((task) => (
                <div key={task.id} className="flex items-center space-x-2 text-sm">
                  {getStatusIcon(task.status)}
                  <span className="text-slate-300 truncate flex-1">{task.title}</span>
                  {task.is_important && <span className="text-yellow-400">⭐</span>}
                </div>
              ))}
              {tasks.length > 3 && <p className="text-xs text-slate-400">+{tasks.length - 3} more tasks</p>}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <Badge variant="secondary" className="bg-slate-700/50 text-slate-300 border-slate-600/50">
            {totalTasks} {totalTasks === 1 ? "task" : "tasks"}
          </Badge>
          <Button
            size="sm"
            onClick={() => onCreateTask(project.id)}
            className="h-8 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 rounded-xl"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Task
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
