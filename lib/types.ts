export interface Project {
  id: string
  name: string
  description: string | null
  emoji: string | null
  user_id: string
  created_at: string
  updated_at: string
}

export interface Task {
  id: string
  title: string
  description: string | null
  status: string // USER-DEFINED type from your schema
  priority: string // USER-DEFINED type from your schema
  due_date: string | null
  project_id: string | null
  user_id: string
  emoji: string | null
  is_important: boolean | null
  created_at: string
  updated_at: string
  project?: Project
}

export interface ChecklistItem {
  id: string
  task_id: string
  text: string
  is_completed: boolean
  created_at: string
}

export interface DailyStats {
  completed: number
  total: number
  overdue: number
  upcoming: number
}
