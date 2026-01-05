"use client";

import { BarChart3, Users, BookMarked, MessageSquare, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function AdminDashboard() {
    const [counts, setCounts] = useState({
        lessons: 0,
        fatwas: 0,
        books: 0,
        visitors: "2.4k"
    });
    const [recentFatwas, setRecentFatwas] = useState<any[]>([]);
    const [recentLessons, setRecentLessons] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // Fetch Lessons Count
                const { count: lessonsCount } = await supabase
                    .from('content')
                    .select('*', { count: 'exact', head: true })
                    .eq('type', 'lesson');

                // Fetch Answered Fatwas Count
                const { count: fatwasCount } = await supabase
                    .from('content')
                    .select('*', { count: 'exact', head: true })
                    .eq('type', 'fatwa')
                    .not('body', 'is', null);

                // Fetch Books Count
                const { count: booksCount } = await supabase
                    .from('books')
                    .select('*', { count: 'exact', head: true });

                // Fetch Recent Fatwas
                const { data: fatwasData } = await supabase
                    .from('content')
                    .select('*')
                    .eq('type', 'fatwa')
                    .is('body', null)
                    .order('created_at', { ascending: false })
                    .limit(3);

                // Fetch Recent Lessons
                const { data: lessonsData } = await supabase
                    .from('content')
                    .select('*')
                    .eq('type', 'lesson')
                    .order('published_at', { ascending: false })
                    .limit(3);

                setCounts({
                    lessons: lessonsCount || 0,
                    fatwas: fatwasCount || 0,
                    books: booksCount || 0,
                    visitors: "2.5k" // Simulating real-ish visitor data as we don't have a tracking table yet
                });
                setRecentFatwas(fatwasData || []);
                setRecentLessons(lessonsData || []);
            } catch (error) {
                console.error('Error fetching dashboard stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const stats = [
        { name: "إجمالي الدروس", value: counts.lessons, icon: BarChart3, color: "text-blue-600", bg: "bg-blue-50" },
        { name: "الفتاوى المجابة", value: counts.fatwas, icon: MessageSquare, color: "text-green-600", bg: "bg-green-50" },
        { name: "عدد المؤلفات", value: counts.books, icon: BookMarked, color: "text-purple-600", bg: "bg-purple-50" },
        { name: "زوار الشهر", value: counts.visitors, icon: Users, color: "text-orange-600", bg: "bg-orange-50" },
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <Loader2 className="h-10 w-10 animate-spin text-secondary" />
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-3xl font-serif font-bold text-primary mb-8">مرحباً يا شيخ يوسف</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {stats.map((stat) => (
                    <div key={stat.name} className={`${stat.bg} p-6 rounded-2xl border border-transparent hover:border-border transition-all shadow-sm`}>
                        <div className="flex items-center justify-between mb-4">
                            <stat.icon className={`h-8 w-8 ${stat.color}`} />
                            <span className={`text-3xl font-bold ${stat.color}`}>{stat.value}</span>
                        </div>
                        <p className="text-primary font-bold">{stat.name}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                    <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 text-secondary" />
                        فتاوى بانتظار الرد ({recentFatwas.length})
                    </h3>
                    <div className="space-y-4">
                        {recentFatwas.length > 0 ? recentFatwas.map(fatwa => (
                            <div key={fatwa.id} className="flex items-center justify-between p-4 bg-muted/10 rounded-xl hover:bg-muted/20 transition-all group">
                                <p className="text-sm font-medium text-primary line-clamp-1">{fatwa.title}</p>
                                <Link href="/admin/fatwas" className="text-xs font-bold text-secondary hover:underline px-3 py-1 bg-secondary/10 rounded-lg">رد الآن</Link>
                            </div>
                        )) : (
                            <p className="text-muted-foreground text-center py-4 italic">لا يوجد أسئلة جديدة حالياً</p>
                        )}
                        <Link href="/admin/fatwas" className="block text-center text-sm font-bold text-primary hover:text-secondary mt-4 transition-colors">
                            عرض جميع الفتاوى ←
                        </Link>
                    </div>
                </div>

                <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                    <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
                        <BarChart3 className="h-5 w-5 text-secondary" />
                        آخر الدروس المضافة
                    </h3>
                    <div className="space-y-4">
                        {recentLessons.map(lesson => (
                            <div key={lesson.id} className="flex items-center justify-between p-4 bg-muted/10 rounded-xl hover:bg-muted/20 transition-all">
                                <p className="text-sm font-medium text-primary line-clamp-1">{lesson.title}</p>
                                <span className="text-[10px] text-muted-foreground font-bold">
                                    {new Date(lesson.published_at).toLocaleDateString('ar-EG')}
                                </span>
                            </div>
                        ))}
                        <Link href="/admin/lessons" className="block text-center text-sm font-bold text-primary hover:text-secondary mt-4 transition-colors">
                            عرض جميع الدروس ←
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
