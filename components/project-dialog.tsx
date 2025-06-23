"use client"

import type React from "react"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface ProjectDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

const EMOJI_OPTIONS = ["📋", "💼", "🎯", "🚀", "💡", "🔥", "⭐", "🎨", "📊", "🔧", "📱", "💻", "🏠", "🎓", "💪", "🌟"]

export function ProjectDialog({ open, onOpenChange, onSuccess }: ProjectDialogProps) {
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [emoji, setEmoji] = useState("📋")
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    setLoading(true)
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const { error } = await supabase.from("projects").insert({
        name: name.trim(),
        description: description.trim() || null,
        emoji: emoji,
        user_id: user.id,
      })

      if (error) {
        console.error("Error creating project:", error)
        return
      }

      // Reset form
      setName("")
      setDescription("")
      setEmoji("📋")

      onSuccess()
      onOpenChange(false)
    } catch (error) {
      console.error("Error creating project:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Create New Project</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Project Name *
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter project name..."
              required
              className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Description (Optional)
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add project description..."
              rows={3}
              className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 resize-none"
            />
          </div>

          {/* Emoji Selection */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Choose an Icon</Label>
            <div className="flex flex-wrap gap-2">
              {EMOJI_OPTIONS.map((emojiOption) => (
                <Button
                  key={emojiOption}
                  type="button"
                  variant={emoji === emojiOption ? "default" : "outline"}
                  size="sm"
                  onClick={() => setEmoji(emojiOption)}
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

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading || !name.trim()}
            className="w-full h-12 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 hover:from-cyan-700 hover:via-purple-700 hover:to-pink-700 rounded-xl"
          >
            {loading ? "Creating..." : "Create Project"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
