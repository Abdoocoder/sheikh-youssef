
-- Seed data for Site Settings
INSERT INTO site_settings (id, site_title, site_description, contact_email)
VALUES (1, 'فضيلة الشيخ يوسف حازم أبو غزالة', 'الموقع الرسمي للشيخ يوسف حازم أبو غزالة', 'info@sheikhyoussef.com')
ON CONFLICT (id) DO UPDATE 
SET site_title = EXCLUDED.site_title;

-- Seed data for Lessons
INSERT INTO content (title, slug, type, category_id, media_url, published_at)
VALUES 
('شرح كتاب الاختيار لتعليل المختار', 'lesson-choice-explanation', 'lesson', NULL, 'https://www.youtube.com/watch?v=example1', NOW()),
('سلسلة فقه النفس', 'lesson-fiqh-nafs', 'lesson', NULL, 'https://www.youtube.com/watch?v=example2', NOW() - INTERVAL '2 days'),
('شرح الحكم العطائية', 'lesson-hikam', 'lesson', NULL, 'https://www.youtube.com/watch?v=example3', NOW() - INTERVAL '1 week');

-- Seed data for Fatwas
INSERT INTO content (title, slug, type, body, created_at)
VALUES 
('حكم صيام الست من شوال قبل القضاء', 'fatwa-fasting-shawwal', 'fatwa', 'يجوز ذلك عند السادة الأحناف...', NOW()),
('ما هو وقت صلاة الضحى؟', 'fatwa-duha-time', 'fatwa', NULL, NOW() - INTERVAL '1 day');

-- Seed data for Books
INSERT INTO books (title, description, published_year, cover_url)
VALUES 
('لوامع المجامع', 'شرح مفصل في الفقه الحنفي المقارن...', 2023, '/assets/book-cover-placeholder.png'),
('تهذيب السلوك', 'رسالة مختصرة في التزكية والأخلاق...', 2024, '/assets/book-cover-placeholder.png');
