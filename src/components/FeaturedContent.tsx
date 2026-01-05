"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { PlayCircle, Clock } from "lucide-react";
import { SectionHeading } from "./Hero";

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

export function FeaturedContent() {
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
                    {featuredLessons.map((lesson, index) => (
                        <motion.div
                            key={lesson.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group glass rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500"
                        >
                            <a href={lesson.url} target="_blank" rel="noopener noreferrer">
                                <div className="relative h-48 overflow-hidden">
                                    <Image
                                        src={lesson.image}
                                        alt={lesson.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                                        <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-bold rounded-lg uppercase">
                                            {lesson.category}
                                        </span>
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                        <PlayCircle className="h-16 w-16 text-white" />
                                    </div>
                                </div>
                            </a>

                            <div className="p-6">
                                <div className="flex items-center gap-2 text-muted-foreground text-xs mb-3">
                                    <Clock className="h-3 w-3" />
                                    <span>{lesson.date}</span>
                                </div>
                                <h3 className="text-xl font-bold text-primary mb-4 group-hover:text-secondary transition-colors line-clamp-2">
                                    {lesson.title}
                                </h3>
                                <a href={lesson.url} target="_blank" rel="noopener noreferrer" className="text-secondary font-bold inline-flex items-center gap-2 group/btn">
                                    مشاهدة الدرس
                                    <span className="transition-transform group-hover/btn:translate-x-[-4px]">←</span>
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <button className="px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg border border-primary/20">
                        تصفح جميع الدروس
                    </button>
                </div>
            </div>
        </section>
    );
}
