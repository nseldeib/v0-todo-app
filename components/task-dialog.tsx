"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import type { Project } from "@/lib/types"

interface TaskDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
  projectId?: string
  projects: Project[]
}

const EMOJI_OPTIONS = ["📝", "💼", "🎯", "🚀", "💡", "🔥", "⭐", "🎨", "📊", "🔧", "📱", "💻"]

export function TaskDialog({ open, onOpenChange, onSuccess, projectId, projects }: TaskDialogProps) {
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState("todo")
  const [priority, setPriority] = useState("medium")
  const [selectedProjectId, setSelectedProjectId] = useState(projectId || "")
  const [emoji, setEmoji] = useState("")
  const [isImportant, setIsImportant] = useState(false)
  const [dueDate, setDueDate] = useState<Date>()
  const supabase = createClient()

  useEffect(() => {
    if (projectId) {
      setSelectedProjectId(projectId)
    }
  }, [projectId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    setLoading(true)
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const { error } = await supabase.from("tasks").insert({
        title: title.trim(),
        description: description.trim() || null,
        status,
        priority,
        project_id: selectedProjectId || null,
        user_id: user.id,
        emoji: emoji || null,
        is_important: isImportant,
        due_date: dueDate ? dueDate.toISOString() : null,
      })

      if (error) {
        console.error("Error creating task:", error)
        return
      }

      // Reset form
      setTitle("")
      setDescription("")
      setStatus("todo")
      setPriority("medium")
      setSelectedProjectId(projectId || "")
      setEmoji("")
      setIsImportant(false)
      setDueDate(undefined)

      onSuccess()
      onOpenChange(false)
    } catch (error) {
      console.error("Error creating task:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Create New Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">
              Task Title *
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title..."
              required
              className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add task description..."
              rows={3}
              className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 resize-none"
            />
          </div>

          {/* Project Selection */}
          {projects.length > 0 && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">Project</Label>
              <Select value={selectedProjectId} onValueChange={setSelectedProjectId}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue placeholder="Select a project (optional)" />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  <SelectItem value="" className="text-slate-300">
                    No project
                  </SelectItem>
                  {projects.map((project) => (
                    <SelectItem key={project.id} value={project.id} className="text-white">
                      <div className="flex items-center space-x-2">
                        <span>{project.emoji || "📋"}</span>
                        <span>{project.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Status and Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  <SelectItem value="todo" className="text-white">
                    To Do
                  </SelectItem>
                  <SelectItem value="in_progress" className="text-white">
                    In Progress
                  </SelectItem>
                  <SelectItem value="completed" className="text-white">
                    Completed
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Priority</Label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  <SelectItem value="low" className="text-white">
                    Low
                  </SelectItem>
                  <SelectItem value="medium" className="text-white">
                    Medium
                  </SelectItem>
                  <SelectItem value="high" className="text-white">
                    High
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Emoji Selection */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Emoji (Optional)</Label>
            <div className="flex flex-wrap gap-2">
              {EMOJI_OPTIONS.map((emojiOption) => (
                <Button
                  key={emojiOption}
                  type="button"
                  variant={emoji === emojiOption ? "default" : "outline"}
                  size="sm"
                  onClick={() => setEmoji(emoji === emojiOption ? "" : emojiOption)}
                  className={`w-10 h-10 p-0 ${
                    emoji === emojiOption
                      ? "bg-purple-600 border-purple-500"
                      : "bg-slate-700 border-slate-600 hover:bg-slate-600"
                  }`}
                >
                  {emojiOption}
                </Button>
              ))}
            </div>
          </div>

          {/* Due Date */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Due Date (Optional)</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dueDate ? format(dueDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-slate-800 border-slate-700" align="start">
                <Calendar
                  mode="single"
                  selected={dueDate}
                  onSelect={setDueDate}
                  initialFocus
                  className="bg-slate-800 text-white"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Important Toggle */}
          <div className="flex items-center justify-between">
            <Label htmlFor="important" className="text-sm font-medium">
              Mark as Important
            </Label>
            <Switch id="important" checked={isImportant} onCheckedChange={setIsImportant} />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading || !title.trim()}
            className="w-full h-12 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 hover:from-cyan-700 hover:via-purple-700 hover:to-pink-700 rounded-xl"
          >
            {loading ? "Creating..." : "Create Task"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
