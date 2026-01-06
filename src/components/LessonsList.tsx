"use client";

import { SectionHeading } from "@/components/Hero";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { useEffect } from "react";
import { Calendar, Clock, PlayCircle, Search } from "lucide-react";
import { VideoModal } from "./VideoModal";
import Image from "next/image";
import { getYouTubeId } from "@/lib/youtube";
import { LessonSkeleton } from "./Skeleton";
import { ShareButtons } from "./ShareButtons";

interface Lesson {
    id: string;
    title: string;
    category: string;
    duration: string;
    date: string;
    url: string;
    cover_image: string | null;
}

export function LessonsList() {
    const [lessonItems, setLessonItems] = useState<Lesson[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("الكل");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedVideo, setSelectedVideo] = useState<{ id: string; url: string; title: string } | null>(null);
    const categories = ["الكل", "الفقه", "التزكية", "الأصول", "التربية", "أذكار", "خطب", "التفسير", "أدب طلب العلم"];

    useEffect(() => {
        const fetchLessons = async () => {
            const query = supabase
                .from('content')
                .select('*')
                .eq('type', 'lesson')
                .order('published_at', { ascending: false });

            const { data, error } = await query;

            if (error) {
                console.error('Error fetching lessons:', error);
            } else if (data && data.length > 0) {
                setLessonItems(data.map((item) => ({
                    id: String(item.id),
                    title: item.title,
                    category: item.category,
                    duration: "سلسلة علمية",
                    date: new Date(item.published_at).toLocaleDateString('ar-EG'),
                    url: item.media_url,
                    cover_image: item.cover_image
                })));
            }
            setLoading(false);
        };

        fetchLessons();
    }, []);

    const filteredLessons = lessonItems.filter(l => {
        const matchesCategory = selectedCategory === "الكل" || l.category === selectedCategory;
        const matchesSearch = l.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            l.category.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    if (loading) {
        return (
            <main className="flex-grow py-20 bg-background">
                <div className="container mx-auto px-4">
                    <div className="mb-12">
                        <SectionHeading title="الدروس العلمية" subtitle="مكتبة مرئية وصوتية متكاملة لجميع الدروس والمجالس العلمية" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {[1, 2, 3, 4, 5, 6].map(i => <LessonSkeleton key={i} />)}
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="flex-grow py-20 bg-background">
            <div className="container mx-auto px-4">
                <div className="mb-12">
                    <SectionHeading title="الدروس العلمية" subtitle="مكتبة مرئية وصوتية متكاملة لجميع الدروس والمجالس العلمية" />
                </div>

                {/* Filters & Search */}
                <div className="flex flex-col md:flex-row gap-6 mb-16 items-center justify-between">
                    <div className="flex flex-wrap justify-center gap-3">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${selectedCategory === cat
                                    ? "bg-secondary text-secondary-foreground shadow-lg shadow-secondary/20"
                                    : "bg-white text-primary hover:bg-primary/5 border border-border"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="ابحث عن درس..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all"
                        />
                    </div>
                </div>

                {/* Lessons Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    <AnimatePresence mode="popLayout">
                        {filteredLessons.map((lesson, index) => {
                            const ytId = getYouTubeId(lesson.url);
                            // Prioritize uploaded cover image, then YouTube thumbnail
                            const displayImage = lesson.cover_image || (ytId ? `https://i.ytimg.com/vi/${ytId}/hqdefault.jpg` : null);

                            return (
                                <motion.div
                                    key={lesson.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.5, delay: index * 0.05 }}
                                    className="group relative bg-card/40 backdrop-blur-xl border border-primary/10 rounded-[2.5rem] overflow-hidden hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] hover:border-secondary/30 transition-all duration-700 cursor-pointer"
                                    onClick={() => setSelectedVideo({ id: lesson.id, url: lesson.url, title: lesson.title })}
                                >
                                    {/* Image Container */}
                                    <div className="relative h-64 overflow-hidden">
                                        {displayImage ? (
                                            <Image
                                                src={displayImage}
                                                alt={lesson.title}
                                                fill
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-primary/20 flex items-center justify-center">
                                                <PlayCircle className="h-16 w-16 text-primary/20" />
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                        {/* Category Badge - Over Image */}
                                        <div className="absolute top-6 right-6 px-4 py-1.5 bg-secondary text-secondary-foreground text-[10px] font-bold rounded-full uppercase tracking-widest shadow-lg">
                                            {lesson.category}
                                        </div>

                                        {/* Play Overlay */}
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-125 group-hover:scale-100">
                                            <div className="bg-secondary p-5 rounded-full shadow-2xl shadow-secondary/50 transform group-hover:rotate-[360deg] transition-transform duration-1000">
                                                <PlayCircle className="h-8 w-8 text-secondary-foreground fill-current" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-8 text-right flex flex-col h-[280px]">
                                        <div className="flex items-center justify-end gap-3 text-secondary/70 text-xs font-bold mb-4">
                                            <Clock className="h-3.5 w-3.5" />
                                            <span>{lesson.duration}</span>
                                        </div>

                                        <h3 className="text-xl font-bold text-primary mb-auto group-hover:text-secondary transition-colors line-clamp-3 leading-relaxed">
                                            {lesson.title}
                                        </h3>

                                        <div className="mt-8 pt-6 border-t border-primary/5 flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-muted-foreground/60">
                                                <Calendar className="h-4 w-4" />
                                                <span className="text-xs font-medium">{lesson.date}</span>
                                            </div>

                                            <div className="flex items-center gap-4">
                                                <ShareButtons title={lesson.title} url={lesson.url} className="scale-90" />
                                                <button className="flex items-center gap-2 text-primary font-bold text-sm group-hover:text-secondary transition-all">
                                                    <span>ابدأ التعلم</span>
                                                    <span className="transform translate-y-[2px]">←</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                <VideoModal
                    isOpen={!!selectedVideo}
                    onClose={() => setSelectedVideo(null)}
                    videoUrl={selectedVideo?.url || ""}
                    title={selectedVideo?.title || ""}
                    lessonId={selectedVideo?.id}
                />
            </div>
        </main>
    );
}
