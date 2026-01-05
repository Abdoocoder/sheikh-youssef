"use client";

import { Plus, Search, Edit2, Trash2, ExternalLink } from "lucide-react";
import { useState } from "react";

// Mock data based on the public lessons
const initialLessons = [
    {
        id: 1,
        title: "تذكرة السامع والمتكلم في أدب العالم والمتعلم",
        category: "أدب طلب العلم",
        duration: "سلسلة علمية",
        date: "2024-01-05",
        url: "https://www.youtube.com/playlist?list=PL_mR76HnumsSnHQpJPR7lWBVEew85hgL8"
    },
    {
        id: 2,
        title: "كتاب تعليم المتعلّم طريق التعلّم للإمام الزرنوجي",
        category: "أدب طلب العلم",
        duration: "سلسلة علمیة",
        date: "2024-01-04",
        url: "https://www.youtube.com/playlist?list=PL_mR76HnumsStIP-IZ__dw2b-6dqm3Sly"
    }
];

export default function AdminLessons() {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-primary mb-1">إدارة الدروس</h1>
                    <p className="text-muted-foreground text-sm">إدارة السلاسل العلمية والدروس المرئية المعروضة على الموقع.</p>
                </div>
                <button className="flex items-center justify-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-xl font-bold shadow-lg shadow-secondary/20 hover:scale-105 transition-all">
                    <Plus className="h-5 w-5" />
                    إضافة درس جديد
                </button>
            </div>

            {/* Controls */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="البحث في الدروس..."
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all font-serif"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <select className="px-4 py-3 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all font-serif">
                    <option>كل التصنيفات</option>
                    <option>الفقه</option>
                    <option>التزكية</option>
                    <option>أدب طلب العلم</option>
                </select>
            </div>

            {/* Lessons Table */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="border-b border-border text-right text-muted-foreground text-sm">
                            <th className="pb-4 font-bold px-4">عنوان الدرس</th>
                            <th className="pb-4 font-bold px-4">التصنيف</th>
                            <th className="pb-4 font-bold px-4">التاريخ</th>
                            <th className="pb-4 font-bold px-4">الإجراءات</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {initialLessons.map((lesson) => (
                            <tr key={lesson.id} className="group hover:bg-muted/30 transition-colors">
                                <td className="py-5 px-4">
                                    <div className="flex flex-col">
                                        <span className="font-bold text-primary group-hover:text-secondary transition-colors">{lesson.title}</span>
                                        <a href={lesson.url} target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground flex items-center gap-1 hover:text-secondary mt-1">
                                            <ExternalLink className="h-3 w-3" />
                                            رابط يوتيوب
                                        </a>
                                    </div>
                                </td>
                                <td className="py-5 px-4">
                                    <span className="px-3 py-1 bg-primary/5 text-primary text-xs rounded-full border border-primary/10">
                                        {lesson.category}
                                    </span>
                                </td>
                                <td className="py-5 px-4 text-sm text-muted-foreground">
                                    {lesson.date}
                                </td>
                                <td className="py-5 px-4 font-serif">
                                    <div className="flex gap-2">
                                        <button className="p-2 text-primary hover:bg-primary/5 rounded-lg transition-all" title="تعديل">
                                            <Edit2 className="h-4 w-4" />
                                        </button>
                                        <button className="p-2 text-destructive hover:bg-destructive/5 rounded-lg transition-all" title="حذف">
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
