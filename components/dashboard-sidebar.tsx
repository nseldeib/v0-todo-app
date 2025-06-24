"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  CheckCircle2,
  LayoutDashboard,
  FolderKanban,
  ListTodo,
  Calendar,
  BarChart3,
  Settings,
  LogOut,
  User,
  Plus,
  Target,
  Clock,
  TrendingUp,
} from "lucide-react"

interface DashboardSidebarProps {
  userEmail?: string
  onSignOut: () => void
  onCreateProject: () => void
  onCreateTask: () => void
  stats?: {
    projects: number
    completedTasks: number
    inProgressTasks: number
    todoTasks: number
  }
}

export function DashboardSidebar({
  userEmail,
  onSignOut,
  onCreateProject,
  onCreateTask,
  stats = { projects: 0, completedTasks: 0, inProgressTasks: 0, todoTasks: 0 },
}: DashboardSidebarProps) {
  const pathname = usePathname()

  const getInitials = (email?: string) => {
    if (!email) return "U"
    return email.charAt(0).toUpperCase()
  }

  const navigationItems = [
    {
      title: "Overview",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: pathname === "/dashboard",
    },
    {
      title: "Projects",
      url: "/dashboard/projects",
      icon: FolderKanban,
      badge: stats.projects,
      isActive: pathname === "/dashboard/projects",
    },
    {
      title: "Tasks",
      url: "/dashboard/tasks",
      icon: ListTodo,
      badge: stats.todoTasks + stats.inProgressTasks + stats.completedTasks,
      isActive: pathname === "/dashboard/tasks",
    },
    {
      title: "Calendar",
      url: "/dashboard/calendar",
      icon: Calendar,
      isActive: pathname === "/dashboard/calendar",
    },
    {
      title: "Analytics",
      url: "/dashboard/analytics",
      icon: BarChart3,
      isActive: pathname === "/dashboard/analytics",
    },
  ]

  const quickStats = [
    {
      title: "Active Projects",
      value: stats.projects,
      icon: Target,
      color: "text-blue-400",
    },
    {
      title: "Completed",
      value: stats.completedTasks,
      icon: CheckCircle2,
      color: "text-green-400",
    },
    {
      title: "In Progress",
      value: stats.inProgressTasks,
      icon: Clock,
      color: "text-yellow-400",
    },
    {
      title: "To Do",
      value: stats.todoTasks,
      icon: TrendingUp,
      color: "text-purple-400",
    },
  ]

  return (
    <Sidebar className="border-r border-slate-700/50">
      <SidebarHeader className="border-b border-slate-700/50 p-4">
        {/* Logo */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
            <CheckCircle2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">TaskFlow</h1>
            <Badge variant="secondary" className="text-xs bg-purple-500/20 text-purple-300 border-purple-500/30">
              Beta
            </Badge>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-2">
          <Button
            onClick={onCreateProject}
            size="sm"
            className="h-9 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 hover:from-cyan-700 hover:via-purple-700 hover:to-pink-700 rounded-xl text-xs"
          >
            <Plus className="w-4 h-4 mr-1" />
            Project
          </Button>
          <Button
            onClick={onCreateTask}
            variant="outline"
            size="sm"
            className="h-9 border-slate-600 text-slate-300 hover:border-slate-500 hover:bg-slate-800 rounded-xl text-xs"
          >
            <Plus className="w-4 h-4 mr-1" />
            Task
          </Button>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-400 font-medium">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={item.isActive}>
                    <Link href={item.url} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <item.icon className="w-4 h-4 mr-3" />
                        <span>{item.title}</span>
                      </div>
                      {item.badge !== undefined && item.badge > 0 && (
                        <Badge
                          variant="secondary"
                          className="ml-auto bg-slate-700/50 text-slate-300 border-slate-600/50 text-xs"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Quick Stats */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-400 font-medium">Quick Stats</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="space-y-2">
              {quickStats.map((stat) => (
                <div key={stat.title} className="flex items-center justify-between p-2 rounded-lg bg-slate-800/30">
                  <div className="flex items-center space-x-2">
                    <stat.icon className={`w-4 h-4 ${stat.color}`} />
                    <span className="text-sm text-slate-300">{stat.title}</span>
                  </div>
                  <span className="text-sm font-medium text-white">{stat.value}</span>
                </div>
              ))}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-slate-700/50 p-4">
        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start h-12 px-3">
              <Avatar className="h-8 w-8 mr-3">
                <AvatarFallback className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-sm">
                  {getInitials(userEmail)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start flex-1 min-w-0">
                <span className="text-sm font-medium text-white truncate">{userEmail?.split("@")[0]}</span>
                <span className="text-xs text-slate-400 truncate">{userEmail}</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-slate-800 border-slate-700" align="end" side="right">
            <DropdownMenuItem className="text-slate-300 hover:bg-slate-700 hover:text-white">
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="text-slate-300 hover:bg-slate-700 hover:text-white">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-700" />
            <DropdownMenuItem className="text-red-400 hover:bg-red-500/10 hover:text-red-300" onClick={onSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
