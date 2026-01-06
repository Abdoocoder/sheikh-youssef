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
    cover_image TEXT, -- Optional custom cover image (e.g., book cover)
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
    site_title TEXT DEFAULT 'موقع الشيخ يوسف حازم أبو غزالة',
    site_description TEXT DEFAULT 'بإدارة وإشراف أحد طلاب الشيخ يوسف ابو غزالة',
    contact_email TEXT DEFAULT 'contact@sheikhyoussef.com',
    contact_phone TEXT,
    whatsapp_number TEXT,
    facebook_url TEXT,
    youtube_url TEXT,
    telegram_url TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Fatwa Questions (Incoming requests)
CREATE TABLE IF NOT EXISTS fatwa_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question TEXT NOT NULL,
    details TEXT,
    asker_name TEXT,
    asker_email TEXT,
    is_private BOOLEAN DEFAULT FALSE,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'answered', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS for fatwa_questions
ALTER TABLE fatwa_questions ENABLE ROW LEVEL SECURITY;

-- Allow public to INSERT questions (Ask)
DROP POLICY IF EXISTS "Allow public insert on fatwa_questions" ON fatwa_questions;
CREATE POLICY "Allow public insert on fatwa_questions" ON fatwa_questions FOR INSERT WITH CHECK (true);

-- Allow authenticated users (Admins) to READ/UPDATE/DELETE
DROP POLICY IF EXISTS "Allow authenticated full access on fatwa_questions" ON fatwa_questions;
CREATE POLICY "Allow authenticated full access on fatwa_questions" ON fatwa_questions FOR ALL USING (auth.role() = 'authenticated');

-- Ensure cover_image column exists on content table (Migration)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'content' AND column_name = 'cover_image') THEN
        ALTER TABLE content ADD COLUMN cover_image TEXT;
    END IF;
END $$;
