-- Add emoji field to projects table
ALTER TABLE projects ADD COLUMN IF NOT EXISTS emoji VARCHAR(10) DEFAULT '📋';

-- Add emoji and is_important fields to tasks table  
ALTER TABLE tasks ADD COLUMN IF NOT EXISTS emoji VARCHAR(10);
ALTER TABLE tasks ADD COLUMN IF NOT EXISTS is_important BOOLEAN DEFAULT FALSE;

-- Add completed_at field to tasks table
ALTER TABLE tasks ADD COLUMN IF NOT EXISTS completed_at TIMESTAMP WITH TIME ZONE;

-- Update existing projects to have default emoji
UPDATE projects SET emoji = '📋' WHERE emoji IS NULL;
