-- Create demo user data (Note: The actual user account needs to be created in Supabase Auth)
-- This script creates the projects and tasks for the demo user

-- First, let's create some sample projects for the demo user
-- Replace 'DEMO_USER_UUID' with the actual UUID from Supabase Auth after creating the user

INSERT INTO projects (id, user_id, name, description, emoji, color, created_at, updated_at) VALUES
  (
    gen_random_uuid(),
    'DEMO_USER_UUID', -- Replace this with actual demo user UUID
    'Website Redesign',
    'Complete overhaul of company website with modern design and improved UX',
    '🎨',
    'blue',
    NOW() - INTERVAL '7 days',
    NOW() - INTERVAL '1 day'
  ),
  (
    gen_random_uuid(),
    'DEMO_USER_UUID', -- Replace this with actual demo user UUID
    'Mobile App Development',
    'Build cross-platform mobile application for iOS and Android',
    '📱',
    'purple',
    NOW() - INTERVAL '14 days',
    NOW() - INTERVAL '2 days'
  ),
  (
    gen_random_uuid(),
    'DEMO_USER_UUID', -- Replace this with actual demo user UUID
    'Marketing Campaign',
    'Q1 marketing campaign for product launch',
    '📢',
    'green',
    NOW() - INTERVAL '5 days',
    NOW() - INTERVAL '1 day'
  );

-- Create sample tasks for the demo user
-- We'll use the project IDs from above (you'll need to get the actual IDs after running the project inserts)

-- Get project IDs for the demo user (this is a helper query - run this to get the IDs)
-- SELECT id, name FROM projects WHERE user_id = 'DEMO_USER_UUID';

-- Sample tasks (replace PROJECT_ID_1, PROJECT_ID_2, PROJECT_ID_3 with actual project IDs)
INSERT INTO tasks (id, user_id, project_id, title, description, status, priority, emoji, is_important, due_date, created_at, updated_at) VALUES
  -- Website Redesign tasks
  (
    gen_random_uuid(),
    'DEMO_USER_UUID',
    'PROJECT_ID_1', -- Website Redesign project ID
    'Create wireframes',
    'Design wireframes for all main pages including homepage, about, and contact',
    'completed',
    'high',
    '📐',
    true,
    NOW() + INTERVAL '3 days',
    NOW() - INTERVAL '6 days',
    NOW() - INTERVAL '1 day'
  ),
  (
    gen_random_uuid(),
    'DEMO_USER_UUID',
    'PROJECT_ID_1',
    'Design system setup',
    'Establish color palette, typography, and component library',
    'in_progress',
    'high',
    '🎨',
    true,
    NOW() + INTERVAL '5 days',
    NOW() - INTERVAL '4 days',
    NOW() - INTERVAL '1 hour'
  ),
  (
    gen_random_uuid(),
    'DEMO_USER_UUID',
    'PROJECT_ID_1',
    'Homepage mockup',
    'Create high-fidelity mockup for the new homepage design',
    'todo',
    'medium',
    '🏠',
    false,
    NOW() + INTERVAL '7 days',
    NOW() - INTERVAL '2 days',
    NOW() - INTERVAL '2 days'
  ),
  
  -- Mobile App Development tasks
  (
    gen_random_uuid(),
    'DEMO_USER_UUID',
    'PROJECT_ID_2', -- Mobile App project ID
    'Setup development environment',
    'Configure React Native development environment and dependencies',
    'completed',
    'high',
    '⚙️',
    true,
    NOW() - INTERVAL '1 day',
    NOW() - INTERVAL '10 days',
    NOW() - INTERVAL '8 days'
  ),
  (
    gen_random_uuid(),
    'DEMO_USER_UUID',
    'PROJECT_ID_2',
    'User authentication flow',
    'Implement login, signup, and password reset functionality',
    'in_progress',
    'high',
    '🔐',
    true,
    NOW() + INTERVAL '4 days',
    NOW() - INTERVAL '5 days',
    NOW() - INTERVAL '2 hours'
  ),
  (
    gen_random_uuid(),
    'DEMO_USER_UUID',
    'PROJECT_ID_2',
    'API integration',
    'Connect mobile app to backend API endpoints',
    'todo',
    'medium',
    '🔌',
    false,
    NOW() + INTERVAL '10 days',
    NOW() - INTERVAL '3 days',
    NOW() - INTERVAL '3 days'
  ),
  
  -- Marketing Campaign tasks
  (
    gen_random_uuid(),
    'DEMO_USER_UUID',
    'PROJECT_ID_3', -- Marketing Campaign project ID
    'Content calendar',
    'Plan social media content for the next 3 months',
    'completed',
    'medium',
    '📅',
    false,
    NOW() - INTERVAL '2 days',
    NOW() - INTERVAL '4 days',
    NOW() - INTERVAL '3 days'
  ),
  (
    gen_random_uuid(),
    'DEMO_USER_UUID',
    'PROJECT_ID_3',
    'Email campaign design',
    'Design email templates for product launch announcement',
    'in_progress',
    'medium',
    '📧',
    false,
    NOW() + INTERVAL '6 days',
    NOW() - INTERVAL '2 days',
    NOW() - INTERVAL '4 hours'
  ),
  (
    gen_random_uuid(),
    'DEMO_USER_UUID',
    'PROJECT_ID_3',
    'Influencer outreach',
    'Identify and contact potential influencers for collaboration',
    'todo',
    'low',
    '🤝',
    false,
    NOW() + INTERVAL '14 days',
    NOW() - INTERVAL '1 day',
    NOW() - INTERVAL '1 day'
  );
