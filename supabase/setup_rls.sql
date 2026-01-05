
-- Enable RLS on all tables
ALTER TABLE IF EXISTS content ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS books ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS bio_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS awrad ENABLE ROW LEVEL SECURITY;

-- Create Policy for Public Read Access (Anon Select)
-- This allows anyone to READ data (needed for the public website and admin dashboard to fetch data)
CREATE POLICY "Allow Public Read Access" ON content FOR SELECT USING (true);
CREATE POLICY "Allow Public Read Access" ON books FOR SELECT USING (true);
CREATE POLICY "Allow Public Read Access" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Allow Public Read Access" ON categories FOR SELECT USING (true);
CREATE POLICY "Allow Public Read Access" ON bio_sections FOR SELECT USING (true);
CREATE POLICY "Allow Public Read Access" ON awrad FOR SELECT USING (true);

-- NOTE: Write access (INSERT, UPDATE, DELETE) is still BLOCKED for anonymous users by default.
-- You will need to use the Supabase Dashboard or authenticated server-side actions for editing.
