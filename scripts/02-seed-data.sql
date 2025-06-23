-- Insert sample projects (these will be created for the authenticated user)
-- Note: In a real app, user_id would be dynamically set based on the authenticated user

-- Sample projects
INSERT INTO projects (name, description, color, user_id) VALUES
('Personal Tasks', 'My personal todo items and goals', '#8B5CF6', auth.uid()),
('Work Projects', 'Professional tasks and deadlines', '#3B82F6', auth.uid()),
('Learning Goals', 'Skills to develop and courses to complete', '#6366F1', auth.uid())
ON CONFLICT DO NOTHING;

-- Sample tasks
INSERT INTO tasks (title, description, status, priority, due_date, project_id, user_id) VALUES
('Complete project proposal', 'Draft and review the Q1 project proposal document', 'in_progress', 'high', CURRENT_DATE + INTERVAL '3 days', 
  (SELECT id FROM projects WHERE name = 'Work Projects' AND user_id = auth.uid() LIMIT 1), auth.uid()),
('Learn Next.js 15 features', 'Study the new features in Next.js 15 including async request APIs', 'todo', 'medium', CURRENT_DATE + INTERVAL '1 week',
  (SELECT id FROM projects WHERE name = 'Learning Goals' AND user_id = auth.uid() LIMIT 1), auth.uid()),
('Grocery shopping', 'Buy ingredients for weekend meal prep', 'todo', 'low', CURRENT_DATE + INTERVAL '2 days',
  (SELECT id FROM projects WHERE name = 'Personal Tasks' AND user_id = auth.uid() LIMIT 1), auth.uid()),
('Review team feedback', 'Go through performance reviews and prepare responses', 'completed', 'medium', CURRENT_DATE - INTERVAL '1 day',
  (SELECT id FROM projects WHERE name = 'Work Projects' AND user_id = auth.uid() LIMIT 1), auth.uid())
ON CONFLICT DO NOTHING;
