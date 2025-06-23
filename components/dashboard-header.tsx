"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CheckCircle2, LogOut, Settings, User, Bell, Code } from "lucide-react"

interface DashboardHeaderProps {
  userEmail?: string
}

export function DashboardHeader({ userEmail }: DashboardHeaderProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    setLoading(true)
    await supabase.auth.signOut()
    router.push("/auth/login")
    router.refresh()
  }

  const getInitials = (email: string) => {
    return email.split("@")[0].slice(0, 2).toUpperCase()
  }

  return (
    <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50">
      <div className="container mx-auto px-4 lg:px-8 py-4 safe-area-inset">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 lg:space-x-4">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25">
              <CheckCircle2 className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  TaskFlow
                </h1>
                <Badge variant="outline" className="text-xs border-purple-500/50 text-purple-300 bg-purple-500/10">
                  BETA
                </Badge>
              </div>
              <p className="text-xs lg:text-sm text-slate-400 -mt-1">Welcome back!</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 lg:space-x-3">
            {/* Notifications */}
            <Button
              variant="ghost"
              size="sm"
              className="w-10 h-10 lg:w-12 lg:h-12 rounded-2xl bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50"
            >
              <Bell className="w-5 h-5 text-slate-300" />
            </Button>

            {/* Profile Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative w-10 h-10 lg:w-12 lg:h-12 rounded-2xl p-0">
                  <Avatar className="w-10 h-10 lg:w-12 lg:h-12">
                    <AvatarFallback className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white text-sm lg:text-base font-semibold">
                      {userEmail ? getInitials(userEmail) : "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-64 lg:w-72 mr-4 mt-2 border-0 shadow-2xl bg-slate-900/95 backdrop-blur-xl rounded-3xl p-2 border border-slate-700/50"
                align="end"
              >
                <div className="px-4 py-3 border-b border-slate-700/50">
                  <p className="text-sm lg:text-base font-semibold text-white truncate">{userEmail}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <p className="text-xs lg:text-sm text-slate-400">Beta Tester</p>
                    <Badge variant="outline" className="text-xs border-green-500/50 text-green-300 bg-green-500/10">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1"></div>
                      Active
                    </Badge>
                  </div>
                </div>
                <div className="py-2">
                  <DropdownMenuItem className="rounded-2xl mx-2 my-1 h-12 lg:h-14 cursor-pointer hover:bg-slate-800/50 text-slate-200">
                    <User className="mr-3 h-5 w-5 text-slate-400" />
                    <span className="font-medium">Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-2xl mx-2 my-1 h-12 lg:h-14 cursor-pointer hover:bg-slate-800/50 text-slate-200">
                    <Settings className="mr-3 h-5 w-5 text-slate-400" />
                    <span className="font-medium">Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-2xl mx-2 my-1 h-12 lg:h-14 cursor-pointer hover:bg-slate-800/50 text-slate-200">
                    <Code className="mr-3 h-5 w-5 text-slate-400" />
                    <span className="font-medium">Send Feedback</span>
                  </DropdownMenuItem>
                </div>
                <DropdownMenuSeparator className="mx-2 bg-slate-700/50" />
                <div className="py-2">
                  <DropdownMenuItem
                    onClick={handleSignOut}
                    disabled={loading}
                    className="rounded-2xl mx-2 my-1 h-12 lg:h-14 cursor-pointer hover:bg-red-900/20 text-red-400"
                  >
                    <LogOut className="mr-3 h-5 w-5" />
                    <span className="font-medium">Sign Out</span>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
