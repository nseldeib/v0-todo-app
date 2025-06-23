-- Simplified version that creates demo data with placeholder user ID
-- After creating the demo user in Supabase Auth, run this script with the actual UUID

-- Demo Projects
INSERT INTO projects (user_id, name, description, emoji, color) VALUES
  ('00000000-0000-0000-0000-000000000000', 'Website Redesign', 'Complete overhaul of company website', '🎨', 'blue'),
  ('00000000-0000-0000-0000-000000000000', 'Mobile App', 'Cross-platform mobile application', '📱', 'purple'),
  ('00000000-0000-0000-0000-000000000000', 'Marketing Campaign', 'Q1 product launch campaign', '📢', 'green');

-- Demo Tasks (you'll need to replace the project_id values with actual IDs after creating projects)
-- For now, this creates tasks without project association
INSERT INTO tasks (user_id, title, description, status, priority, emoji, is_important) VALUES
  ('00000000-0000-0000-0000-000000000000', 'Create wireframes', 'Design wireframes for main pages', 'completed', 'high', '📐', true),
  ('00000000-0000-0000-0000-000000000000', 'Setup development environment', 'Configure React Native environment', 'completed', 'high', '⚙️', true),
  ('00000000-0000-0000-0000-000000000000', 'Design system setup', 'Establish design system', 'in_progress', 'high', '🎨', true),
  ('00000000-0000-0000-0000-000000000000', 'User authentication', 'Implement login/signup', 'in_progress', 'high', '🔐', true),
  ('00000000-0000-0000-0000-000000000000', 'Content calendar', 'Plan social media content', 'completed', 'medium', '📅', false),
  ('00000000-0000-0000-0000-000000000000', 'Homepage mockup', 'Create homepage design', 'todo', 'medium', '🏠', false),
  ('00000000-0000-0000-0000-000000000000', 'API integration', 'Connect to backend APIs', 'todo', 'medium', '🔌', false),
  ('00000000-0000-0000-0000-000000000000', 'Email campaign design', 'Design email templates', 'in_progress', 'medium', '📧', false),
  ('00000000-0000-0000-0000-000000000000', 'Influencer outreach', 'Contact potential influencers', 'todo', 'low', '🤝', false);
