-- Database Schema for Sheikh Youssef Website

-- Categories for content (Lessons, Fatwas, Articles, etc.)
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Main content table
CREATE TABLE IF NOT EXISTS content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    body TEXT, -- Markdown or HTML content
    excerpt TEXT,
    type TEXT NOT NULL CHECK (type IN ('lesson', 'fatwa', 'article', 'news')),
    media_url TEXT, -- URL to video (YouTube/Facebook) or Audio
    media_type TEXT CHECK (media_type IN ('video', 'audio', 'image', 'none')),
    category TEXT, -- Text category for simpler management
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    is_featured BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Playlist Items (for series)
CREATE TABLE IF NOT EXISTS playlist_items (
    id SERIAL PRIMARY KEY,
    content_id UUID REFERENCES content(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    video_id TEXT NOT NULL, -- YouTube Video ID
    position INTEGER DEFAULT 0, -- Order in the series
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(content_id, position)
);

CREATE INDEX IF NOT EXISTS idx_playlist_items_content ON playlist_items(content_id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_playlist_items_unique_pos ON playlist_items(content_id, position);

-- Records for various books
CREATE TABLE IF NOT EXISTS books (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT UNIQUE NOT NULL,
    description TEXT,
    cover_url TEXT,
    pdf_url TEXT,
    purchase_url TEXT, -- Optional link to buy
    published_year INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Biography sections (for chronological or thematic presentation)
CREATE TABLE IF NOT EXISTS bio_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Spiritual Litanies (Awrad)
CREATE TABLE IF NOT EXISTS awrad (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT NOT NULL, -- The actual text of the Wird
    audio_url TEXT,
    benefits TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Site settings (Single row for site configuration)
CREATE TABLE IF NOT EXISTS site_settings (
    id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
    site_title TEXT DEFAULT 'فضيلة الشيخ يوسف حازم أبو غزالة',
    site_description TEXT DEFAULT 'الموقع الرسمي للشيخ يوسف حازم أبو غزالة',
    contact_email TEXT DEFAULT 'contact@sheikhyoussef.com',
    contact_phone TEXT,
    whatsapp_number TEXT,
    facebook_url TEXT,
    youtube_url TEXT,
    telegram_url TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default settings row
INSERT INTO site_settings (id) VALUES (1) ON CONFLICT DO NOTHING;

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_content_type ON content(type);
CREATE INDEX IF NOT EXISTS idx_content_category ON content(category_id);
CREATE INDEX IF NOT EXISTS idx_content_published_at ON content(published_at DESC);

-- Enable RLS for main tables
ALTER TABLE content ENABLE ROW LEVEL SECURITY;
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Public READ policies
DROP POLICY IF EXISTS "Allow public read access on content" ON content;
CREATE POLICY "Allow public read access on content" ON content FOR SELECT USING (true);


DROP POLICY IF EXISTS "Allow public read access on books" ON books;
CREATE POLICY "Allow public read access on books" ON books FOR SELECT USING (true);

-- RLS for playlist_items
ALTER TABLE playlist_items ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access on playlist_items" ON playlist_items;
CREATE POLICY "Allow public read access on playlist_items" ON playlist_items FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read access on site_settings" ON site_settings;
CREATE POLICY "Allow public read access on site_settings" ON site_settings FOR SELECT USING (true);

-- Authenticated (Admin) FULL access policies
DROP POLICY IF EXISTS "Allow all actions on content for authenticated" ON content;
CREATE POLICY "Allow all actions on content for authenticated" ON content FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all actions on books for authenticated" ON books;
CREATE POLICY "Allow all actions on books for authenticated" ON books FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all actions on site_settings for authenticated" ON site_settings;
CREATE POLICY "Allow all actions on site_settings for authenticated" ON site_settings FOR ALL USING (true) WITH CHECK (true);
