
-- Seed data for Site Settings
INSERT INTO site_settings (id, site_title, site_description, contact_email)
VALUES (1, 'فضيلة الشيخ يوسف حازم أبو غزالة', 'الموقع الرسمي للشيخ يوسف حازم أبو غزالة', 'info@sheikhyoussef.com')
ON CONFLICT (id) DO UPDATE 
SET site_title = EXCLUDED.site_title,
    site_description = EXCLUDED.site_description,
    contact_email = EXCLUDED.contact_email;

-- Seed data for Lessons
INSERT INTO content (title, slug, type, category, media_url, published_at)
VALUES 
('تذكرة السامع والمتكلم في أدب العالم والمتعلم', 'lesson-tadkira-samia', 'lesson', 'أدب طلب العلم', 'https://www.youtube.com/playlist?list=PL_mR76HnumsSnHQpJPR7lWBVEew85hgL8', NOW()),
('كتاب تعليم المتعلّم طريق التعلّم للإمام الزرنوجي', 'lesson-zarnuji-talim', 'lesson', 'أدب طلب العلم', 'https://www.youtube.com/playlist?list=PL_mR76HnumsStIP-IZ__dw2b-6dqm3Sly', NOW() - INTERVAL '1 day'),
('شرح الأوراد الشاذلية للعلامة ابن عجيبة', 'lesson-awrad-shadhiliya', 'lesson', 'التزكية', 'https://www.youtube.com/playlist?list=PL_mR76HnumsS0YKk8Zg9neCnVUDSJLFNJ', NOW() - INTERVAL '2 days'),
('درس الفقه - متن القدوري في الفقه الحنفي', 'lesson-quduri-fiqh', 'lesson', 'الفقه', 'https://www.youtube.com/playlist?list=PL_mR76HnumsRCchUPTaqYwc7Xfa_s5BoO', NOW() - INTERVAL '3 days'),
('خطب الجمعة لفضيلة الشيخ يوسف أبو غزالة', 'lesson-khutab-juma', 'lesson', 'خطب', 'https://www.youtube.com/playlist?list=PL_mR76HnumsQ9KUAfEDQRquNWU61_H4ge', NOW() - INTERVAL '4 days'),
('كتاب حول تفسير سورة الحجرات للشيخ عبدالله سراج الدين', 'lesson-hujurat-tafsir', 'lesson', 'التفسير', 'https://www.youtube.com/playlist?list=PL_mR76HnumsSD9CKELMYwHDIULQa7ldHp', NOW() - INTERVAL '5 days'),
('كتاب من أدب الإسلام للشيخ عبد الفتاح أبو غدة', 'lesson-adab-islam', 'lesson', 'أدب طلب العلم', 'https://www.youtube.com/playlist?list=PL_mR76HnumsSR9rikjj0oYj7tM8OHPGqA', NOW() - INTERVAL '6 days'),
('فقه الصوم - فقه حنفي', 'lesson-fasting-fiqh', 'lesson', 'الفقه', 'https://www.youtube.com/playlist?list=PL_mR76HnumsSyJiBGdfL-FlW2AfgnwTg2', NOW() - INTERVAL '7 days'),
('درس التزكية - الحكم الغوثية لأبي مدين الغوث', 'lesson-hikam-ghawthiya', 'lesson', 'التزكية', 'https://www.youtube.com/playlist?list=PL_mR76HnumsQpwAahYHmNT8fB7Cm3B0A3', NOW() - INTERVAL '8 days')
ON CONFLICT (slug) DO UPDATE 
SET title = EXCLUDED.title,
    category = EXCLUDED.category,
    media_url = EXCLUDED.media_url,
    published_at = EXCLUDED.published_at;

-- Seed data for Fatwas
INSERT INTO content (title, slug, type, category, body, created_at)
VALUES 
('ما حكم السرقة لشخص يدعي أنه مضطر ولا يعلم أنها حرام؟', 'fatwa-theft-necessity', 'fatwa', 'الجنايات', 'الإجابة المفصلة تظهر هنا من قاعدة البيانات...', NOW()),
('هل يجوز التأخر في إخراج زكاة المال لانتظار قريب مسافر؟', 'fatwa-zakat-delay', 'fatwa', 'العبادات / الزكاة', 'نعم يجوز في حالات معينة...', NOW() - INTERVAL '1 day'),
('ما معنى الشيخ المأذون في اصطلاح السلوكيين؟', 'fatwa-authorized-sheikh', 'fatwa', 'التزكية', 'الشيخ المأذون هو من تلقى الإذن بالتربية...', NOW() - INTERVAL '2 days'),
('حكم التداول في العملات الرقمية عند السادة الأحناف؟', 'fatwa-crypto-trading', 'fatwa', 'المعاملات', NULL, NOW() - INTERVAL '3 days'),
('كيف يتعامل الموظف مع هدايا المراجعين في المؤسسات الرسمية؟', 'fatwa-employees-gifts', 'fatwa', 'المعاملات / الرشوة', 'الأصل في هدايا العمال أنها غلول...', NOW() - INTERVAL '4 days')
ON CONFLICT (slug) DO UPDATE 
SET title = EXCLUDED.title,
    category = EXCLUDED.category,
    body = EXCLUDED.body;

-- Seed data for Books
INSERT INTO books (title, description, published_year, cover_url)
VALUES 
('الوجيز في الفقه الحنفي', 'كتاب جامع لأهم مسائل العبادات والمعاملات على مذهب الإمام أبي حنيفة النعمان بأسلوب عصري ميسر.', 2023, '/assets/book-fiqh.png'),
('أنوار التزكية في شرح الوظيفة الزروقية', 'شرح تربوي وعلمي لوظيفة الإمام أحمد زروق رضي الله عنه، يتناول آداب السلوك وتزكية النفس.', 2024, '/assets/book-spiritual.png'),
('المدخل إلى المصارف الإسلامية', 'دراسة تحليلية لقواعد الاقتصاد الإسلامي وتطبيقاته في البنوك الحديثة، مع مقارنة بالفقه التقليدي.', 2022, '/assets/book-economics.png')
ON CONFLICT (title) DO UPDATE 
SET description = EXCLUDED.description,
    published_year = EXCLUDED.published_year,
    cover_url = EXCLUDED.cover_url;

-- Seed data for Playlist Items (Example)
INSERT INTO playlist_items (content_id, title, video_id, position)
SELECT id, 'مقدمة في أدب طلب العلم', 'wEC_JTiiLiE', 1 FROM content WHERE slug = 'lesson-tadkira-samia'
ON CONFLICT (content_id, position) DO NOTHING;

INSERT INTO playlist_items (content_id, title, video_id, position)
SELECT id, 'الدرس الأول: فضل العلم وأهله', 'sgJdho2JkKc', 2 FROM content WHERE slug = 'lesson-tadkira-samia'
ON CONFLICT (content_id, position) DO NOTHING;

INSERT INTO playlist_items (content_id, title, video_id, position)
SELECT id, 'الدرس الثاني: آداب العالم في نفسه', 'exWnP3dh9l0', 3 FROM content WHERE slug = 'lesson-tadkira-samia'
ON CONFLICT (content_id, position) DO NOTHING;
