"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionHeading } from "@/components/Hero";
import { Play, Filter, Search } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const lessons = [
    {
        id: 1,
        title: "تذكرة السامع والمتكلم في أدب العالم والمتعلم",
        category: "أدب طلب العلم",
        duration: "سلسلة علمية",
        date: "متجدد",
        url: "https://www.youtube.com/playlist?list=PL_mR76HnumsSnHQpJPR7lWBVEew85hgL8"
    },
    {
        id: 2,
        title: "كتاب تعليم المتعلّم طريق التعلّم للإمام الزرنوجي",
        category: "أدب طلب العلم",
        duration: "سلسلة علمیة",
        date: "متجدد",
        url: "https://www.youtube.com/playlist?list=PL_mR76HnumsStIP-IZ__dw2b-6dqm3Sly"
    },
    {
        id: 3,
        title: "شرح الأوراد الشاذلية للعلامة ابن عجيبة",
        category: "التزكية",
        duration: "سلسلة علمية",
        date: "متجدد",
        url: "https://www.youtube.com/playlist?list=PL_mR76HnumsS0YKk8Zg9neCnVUDSJLFNJ"
    },
    {
        id: 4,
        title: "درس الفقه - متن القدوري في الفقه الحنفي",
        category: "الفقه",
        duration: "سلسلة علمية",
        date: "متجدد",
        url: "https://www.youtube.com/playlist?list=PL_mR76HnumsRCchUPTaqYwc7Xfa_s5BoO"
    },
    {
        id: 5,
        title: "خطب الجمعة لفضيلة الشيخ يوسف أبو غزالة",
        category: "خطب",
        duration: "متنوع",
        date: "أسبوعي",
        url: "https://www.youtube.com/playlist?list=PL_mR76HnumsQ9KUAfEDQRquNWU61_H4ge"
    },
    {
        id: 6,
        title: "كتاب 'حول تفسير سورة الحجرات' للشيخ عبدالله سراج الدين",
        category: "التفسير",
        duration: "سلسلة علمية",
        date: "مكتمل",
        url: "https://www.youtube.com/playlist?list=PL_mR76HnumsSD9CKELMYwHDIULQa7ldHp"
    },
    {
        id: 7,
        title: "كتاب من أدب الإسلام للشيخ عبد الفتاح أبو غدة",
        category: "أدب طلب العلم",
        duration: "سلسلة علمية",
        date: "متجدد",
        url: "https://www.youtube.com/playlist?list=PL_mR76HnumsSR9rikjj0oYj7tM8OHPGqA"
    },
    {
        id: 8,
        title: "فقه الصوم - فقه حنفي",
        category: "الفقه",
        duration: "سلسلة علمية",
        date: "مكتمل",
        url: "https://www.youtube.com/playlist?list=PL_mR76HnumsSyJiBGdfL-FlW2AfgnwTg2"
    },
    {
        id: 9,
        title: "درس التزكية (الحكم الغوثية لأبي مدين الغوث)",
        category: "التزكية",
        duration: "سلسلة علمية",
        date: "متجدد",
        url: "https://www.youtube.com/playlist?list=PL_mR76HnumsQpwAahYHmNT8fB7Cm3B0A3"
    },
];

export default function LessonsPage() {
    const [selectedCategory, setSelectedCategory] = useState("الكل");
    const categories = ["الكل", "الفقه", "التزكية", "الأصول", "التربية", "أذكار"];

    const filteredLessons = selectedCategory === "الكل"
        ? lessons
        : lessons.filter(l => l.category === selectedCategory);

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow py-20 bg-background">
                <div className="container mx-auto px-4">
                    <SectionHeading title="الدروس العلمية" subtitle="مكتبة مرئية وصوتية متكاملة لجميع الدروس والمجالس العلمية" />

                    {/* Filters & Search */}
                    <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
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
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all"
                            />
                        </div>
                    </div>

                    {/* Lessons Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredLessons.map((lesson, index) => (
                            <motion.div
                                key={lesson.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05 }}
                                className="glass group rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500"
                            >
                                <a href={lesson.url} target="_blank" rel="noopener noreferrer">
                                    <div className="relative h-56 bg-primary/10 overflow-hidden">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Play className="h-16 w-16 text-secondary/40 group-hover:text-secondary group-hover:scale-110 transition-all duration-500" />
                                        </div>
                                        <div className="absolute top-4 right-4 px-3 py-1 bg-black/40 backdrop-blur-md text-white text-xs rounded-lg">
                                            {lesson.duration}
                                        </div>
                                    </div>
                                </a>
                                <div className="p-8">
                                    <span className="text-secondary font-bold text-xs uppercase tracking-wider block mb-2">
                                        {lesson.category}
                                    </span>
                                    <h3 className="text-xl font-bold text-primary mb-6 group-hover:text-secondary transition-colors line-clamp-2 min-h-[3.5rem]">
                                        {lesson.title}
                                    </h3>
                                    <div className="flex items-center justify-between pt-6 border-t border-border">
                                        <span className="text-muted-foreground text-sm">{lesson.date}</span>
                                        <a href={lesson.url} target="_blank" rel="noopener noreferrer" className="bg-primary/5 text-primary hover:bg-primary hover:text-white p-2 rounded-lg transition-all">
                                            <Play className="h-5 w-5" />
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
