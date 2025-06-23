"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, Clock, Target, TrendingUp, Calendar } from "lucide-react"

export function DailyRecap() {
  // Mock data - in a real app, this would come from props or API
  const stats = {
    completed: 8,
    total: 12,
    overdue: 2,
    upcoming: 5,
  }

  const completionRate = Math.round((stats.completed / stats.total) * 100)
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-white flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-purple-400" />
            Daily Recap
          </CardTitle>
          <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
            {today.split(",")[0]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress Overview */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-300">Today's Progress</span>
            <span className="text-white font-medium">
              {stats.completed}/{stats.total} tasks
            </span>
          </div>
          <Progress value={completionRate} className="h-2 bg-slate-700" />
          <div className="text-center">
            <span className="text-2xl font-bold text-white">{completionRate}%</span>
            <p className="text-xs text-slate-400">completion rate</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-3 text-center">
            <div className="flex items-center justify-center mb-2">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
            </div>
            <div className="text-lg font-bold text-green-100">{stats.completed}</div>
            <div className="text-xs text-green-300">Completed</div>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 text-center">
            <div className="flex items-center justify-center mb-2">
              <Clock className="w-5 h-5 text-blue-400" />
            </div>
            <div className="text-lg font-bold text-blue-100">{stats.upcoming}</div>
            <div className="text-xs text-blue-300">Upcoming</div>
          </div>

          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-center">
            <div className="flex items-center justify-center mb-2">
              <Target className="w-5 h-5 text-red-400" />
            </div>
            <div className="text-lg font-bold text-red-100">{stats.overdue}</div>
            <div className="text-xs text-red-300">Overdue</div>
          </div>

          <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-3 text-center">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="w-5 h-5 text-purple-400" />
            </div>
            <div className="text-lg font-bold text-purple-100">{stats.total}</div>
            <div className="text-xs text-purple-300">Total</div>
          </div>
        </div>

        {/* Motivational Message */}
        <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-xl p-4 text-center">
          <p className="text-sm text-cyan-100 font-medium">
            {completionRate >= 80
              ? "🎉 Excellent work today!"
              : completionRate >= 50
                ? "💪 Keep pushing forward!"
                : "🚀 Let's get started!"}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            {completionRate >= 80 ? "You're crushing your goals!" : "Every task completed is progress made."}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
