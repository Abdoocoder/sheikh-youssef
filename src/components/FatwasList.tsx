"use client";

import { SectionHeading } from "@/components/Hero";
import { Search, MessageCircle, ChevronRight, HelpCircle, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

const fatwas = [
    { id: 1, question: "ما حكم السرقة لشخص يدعي أنه مضطر ولا يعلم أنها حرام؟", category: "الجنايات", status: "تمت الإجابة" },
    { id: 2, question: "هل يجوز التأخر في إخراج زكاة المال لانتظار قريب مسافر؟", category: "العبادات / الزكاة", status: "تمت الإجابة" },
    { id: 3, question: "ما معنى 'الشيخ المأذون' في اصطلاح السلوكيين؟", category: "التزكية", status: "تمت الإجابة" },
    { id: 4, question: "حكم التداول في العملات الرقمية عند السادة الأحناف؟", category: "المعاملات", status: "قيد البحث" },
    { id: 5, question: "كيف يتعامل الموظف مع هدايا المراجعين في المؤسسات الرسمية؟", category: "المعاملات / الرشوة", status: "تمت الإجابة" },
];

export function FatwasList() {
    const [fatwaItems, setFatwaItems] = useState<any[]>(fatwas);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFatwas = async () => {
            const { data, error } = await supabase
                .from('content')
                .select('*')
                .eq('type', 'fatwa')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching fatwas:', error);
            } else if (data && data.length > 0) {
                setFatwaItems(data.map(item => ({
                    id: item.id,
                    question: item.title,
                    category: item.category,
                    status: item.body ? "تمت الإجابة" : "قيد البحث"
                })));
            }
            setLoading(false);
        };

        fetchFatwas();
    }, []);

    if (loading) {
        return (
            <div className="py-20 text-center">
                <Loader2 className="h-10 w-10 animate-spin text-secondary mx-auto mb-4" />
                <p className="text-muted-foreground font-serif">جاري تحميل الفتاوى...</p>
            </div>
        );
    }
    return (
        <main className="flex-grow py-20 bg-background">
            <div className="container mx-auto px-4">
                <div className="mb-12">
                    <SectionHeading title="ركن الفتاوى" subtitle="إجابات شرعية مبنية على أدلة الكتاب والسنة ومنهج المذاهب المعتبرة" />
                </div>

                {/* Ask Question CTA */}
                <div className="bg-primary shadow-2xl rounded-3xl p-10 mb-16 relative overflow-hidden text-white flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                    <div className="relative z-10 text-right">
                        <h3 className="text-3xl font-serif font-bold mb-4">هل لديك سؤال شرعي؟</h3>
                        <p className="text-primary-foreground/70 max-w-lg text-lg">يمكنك إرسال سؤالك مباشرة للشيخ، وسيتم الرد عليك في أقرب وقت ونشر الإجابة لأهميتها.</p>
                    </div>
                    <button className="relative z-10 px-10 py-4 bg-secondary text-secondary-foreground font-bold rounded-2xl hover:scale-105 transition-transform flex items-center gap-3">
                        <MessageCircle className="h-6 w-6" />
                        أرسل سؤالك الآن
                    </button>
                </div>

                {/* Search & Fatwa List */}
                <div className="max-w-5xl mx-auto">
                    <div className="relative mb-12">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="ابحث في أرشيف الفتاوى..."
                            className="w-full pl-12 pr-6 py-5 rounded-2xl border border-border shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 text-lg transition-all"
                        />
                    </div>

                    <div className="space-y-4">
                        {fatwaItems.map(fatwa => (
                            <div key={fatwa.id} className="glass p-6 rounded-2xl hover:border-secondary/30 transition-all group flex items-start justify-between gap-4 cursor-pointer">
                                <div className="flex items-start gap-4 text-right">
                                    <div className="bg-primary/5 p-3 rounded-xl group-hover:bg-primary/10 transition-colors">
                                        <HelpCircle className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <span className="text-secondary font-bold text-xs bg-secondary/10 px-2 py-0.5 rounded-md mb-2 inline-block">
                                            {fatwa.category}
                                        </span>
                                        <h4 className="text-xl font-bold text-primary group-hover:text-secondary transition-colors leading-relaxed">
                                            {fatwa.question}
                                        </h4>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-3 shrink-0">
                                    <span className={`text-xs px-2 py-1 rounded-full ${fatwa.status === "تمت الإجابة" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}>
                                        {fatwa.status}
                                    </span>
                                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-secondary transition-all" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    )
}
