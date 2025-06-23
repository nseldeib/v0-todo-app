"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"
import type { Project } from "@/lib/types"

interface ProjectDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
  project?: Project
}

const projectEmojis = ["📋", "💼", "🎯", "📚", "🏠", "💡", "🚀", "⭐", "🔥", "💎"]

export function ProjectDialog({ open, onOpenChange, onSuccess, project }: ProjectDialogProps) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [emoji, setEmoji] = useState("📋")
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    if (project) {
      setName(project.name)
      setDescription(project.description || "")
      setEmoji(project.emoji || "📋")
    } else {
      setName("")
      setDescription("")
      setEmoji("📋")
    }
  }, [project])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error("No user found")

      const projectData = {
        name,
        description: description || null,
        emoji,
        user_id: user.id,
        updated_at: new Date().toISOString(),
      }

      if (project) {
        const { error } = await supabase.from("projects").update(projectData).eq("id", project.id)

        if (error) throw error
      } else {
        const { error } = await supabase.from("projects").insert([projectData])

        if (error) throw error
      }

      onSuccess()
      onOpenChange(false)
    } catch (error) {
      console.error("Error saving project:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{project ? "Edit Project" : "Create New Project"}</DialogTitle>
          <DialogDescription>
            {project ? "Update your project details." : "Add a new project to organize your tasks."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Project Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter project name"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter project description (optional)"
                rows={3}
              />
            </div>
            <div className="grid gap-2">
              <Label>Project Emoji</Label>
              <div className="flex flex-wrap gap-2">
                {projectEmojis.map((emojiOption) => (
                  <button
                    key={emojiOption}
                    type="button"
                    className={`w-10 h-10 rounded-lg border-2 transition-all text-xl hover:scale-105 ${
                      emoji === emojiOption ? "border-primary scale-110" : "border-border"
                    }`}
                    onClick={() => setEmoji(emojiOption)}
                  >
                    {emojiOption}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {project ? "Update Project" : "Create Project"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
