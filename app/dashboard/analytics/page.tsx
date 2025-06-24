"use client"

import { Card, CardContent } from "@/components/ui/card"
import { BarChart3, Clock } from "lucide-react"

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      <div className="container mx-auto px-4 lg:px-8 py-6 lg:py-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white">Analytics</h1>
            <p className="text-slate-300">Track your productivity and progress</p>
          </div>
        </div>

        <Card className="border-0 shadow-lg bg-slate-800/50 backdrop-blur-sm">
          <CardContent className="p-8 lg:p-12 text-center space-y-6">
            <div className="w-20 h-20 bg-slate-700/50 rounded-3xl flex items-center justify-center mx-auto border border-slate-600/50">
              <BarChart3 className="w-10 h-10 text-slate-400" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl lg:text-2xl font-semibold text-white">Analytics Dashboard Coming Soon</h3>
              <p className="text-slate-300 lg:text-lg max-w-md mx-auto">
                Get insights into your productivity patterns, task completion rates, and project progress
              </p>
            </div>
            <div className="flex items-center justify-center space-x-2 text-slate-400">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Feature in development</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
