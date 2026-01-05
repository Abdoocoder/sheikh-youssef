"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { PlayCircle, Clock, Loader2, Calendar } from "lucide-react";
import { SectionHeading } from "./Hero";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { VideoModal } from "./VideoModal";
import Link from "next/link";

interface Lesson {
    id: string;
    title: string;
    media_url: string;
    category: string;
    published_at: string;
}

const featuredLessons = [
    {
        title: "شرح الأوراد الشاذلية للعلامة ابن عجيبة",
        category: "التزكية",
        date: "متجدد",
        image: "/assets/lesson-general.png",
        id: "lesson-awrad",
        url: "https://www.youtube.com/playlist?list=PL_mR76HnumsS0YKk8Zg9neCnVUDSJLFNJ"
    },
    {
        title: "درس الفقه - متن القدوري في الفقه الحنفي",
        category: "الفقه",
        date: "متجدد",
        image: "/assets/book-fiqh.png",
        id: "lesson-quduri",
        url: "https://www.youtube.com/playlist?list=PL_mR76HnumsRCchUPTaqYwc7Xfa_s5BoO"
    },
    {
        title: "تذكرة السامع والمتكلم في أدب العالم والمتعلم",
        category: "أدب طلب العلم",
        date: "متجدد",
        image: "/assets/lesson-general.png",
        id: "lesson-tadkira",
        url: "https://www.youtube.com/playlist?list=PL_mR76HnumsSnHQpJPR7lWBVEew85hgL8"
    }
];

const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url?.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
};

export function FeaturedContent() {
    const [lessons, setLessons] = useState<any[]>(featuredLessons);
    const [loading, setLoading] = useState(true);
    const [selectedVideo, setSelectedVideo] = useState<{ url: string; title: string } | null>(null);

    useEffect(() => {
        const fetchLessons = async () => {
            const { data, error } = await supabase
                .from('content')
                .select('*')
                .eq('type', 'lesson')
                .order('published_at', { ascending: false })
                .limit(3);

            if (error) {
                console.error('Error fetching featured lessons:', error);
            } else if (data && data.length > 0) {
                setLessons(data.map(item => ({
                    id: item.id,
                    title: item.title,
                    category: item.category,
                    date: new Date(item.published_at).toLocaleDateString('ar-EG'),
                    image: "/assets/lesson-general.png",
                    url: item.media_url
                })));
            }
            setLoading(false);
        };

        fetchLessons();
    }, []);

    if (loading) {
        return (
            <div className="py-20 text-center">
                <Loader2 className="h-10 w-10 animate-spin text-secondary mx-auto mb-4" />
                <p className="text-muted-foreground font-serif">جاري تحميل الدروس...</p>
            </div>
        );
    }
    return (
        <section className="py-32 bg-background">
            <div className="container mx-auto px-4">
                <div className="mb-20">
                    <SectionHeading
                        title="أحدث الدروس العلمية"
                        subtitle="سلاسل علمية منهجية في الفقه والتزكية والعلوم الشرعية"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {lessons.map((lesson, index) => {
                        const ytId = getYouTubeId(lesson.url);
                        const thumbnailUrl = ytId ? `https://i.ytimg.com/vi/${ytId}/maxresdefault.jpg` : lesson.image;

                        return (
                            <motion.div
                                key={lesson.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative bg-card/40 backdrop-blur-xl border border-primary/10 rounded-[2rem] overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer text-right"
                                onClick={() => setSelectedVideo({ url: lesson.url, title: lesson.title })}
                            >
                                <div className="relative h-56 overflow-hidden">
                                    <Image
                                        src={thumbnailUrl}
                                        alt={lesson.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    {/* Glass Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                                    <div className="absolute top-4 right-4 z-10">
                                        <span className="px-3 py-1 bg-secondary/90 backdrop-blur-md text-secondary-foreground text-[10px] font-bold rounded-full uppercase tracking-widest shadow-lg">
                                            {lesson.category}
                                        </span>
                                    </div>

                                    <div className="absolute inset-0 flex items-center justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                        <div className="bg-white/20 backdrop-blur-md p-4 rounded-full border border-white/30">
                                            <PlayCircle className="h-12 w-12 text-white fill-white/20" />
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="flex items-center justify-end gap-2 text-muted-foreground/60 text-xs mb-3">
                                        <span>{lesson.date}</span>
                                        <Calendar className="h-3 w-3" />
                                    </div>
                                    <h3 className="text-lg font-bold text-primary mb-6 group-hover:text-secondary transition-colors line-clamp-2 min-h-[3rem]">
                                        {lesson.title}
                                    </h3>
                                    <div className="w-full pt-4 border-t border-primary/5 flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-secondary font-bold text-sm">
                                            <Clock className="h-4 w-4" />
                                            <span>سلسلة علمية</span>
                                        </div>
                                        <div className="text-primary font-bold text-sm hover:text-secondary transition-colors">
                                            مشاهدة الآن ←
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                <VideoModal
                    isOpen={!!selectedVideo}
                    onClose={() => setSelectedVideo(null)}
                    videoUrl={selectedVideo?.url || ""}
                    title={selectedVideo?.title || ""}
                />

                <div className="mt-16 text-center">
                    <Link href="/lessons">
                        <button className="px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg border border-primary/20">
                            تصفح جميع الدروس
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
