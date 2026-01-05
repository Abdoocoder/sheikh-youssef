"use client";

import { MessageSquare, Search, CheckCircle2, Clock, Reply, Trash2 } from "lucide-react";
import { useState } from "react";

const initialFatwas = [
    { id: 1, question: "ما حكم السرقة لشخص يدعي أنه مضطر ولا يعلم أنها حرام؟", category: "الجنايات", status: "replied", date: "2024-01-05" },
    { id: 2, question: "حكم التداول في العملات الرقمية عند السادة الأحناف؟", category: "المعاملات", status: "pending", date: "2024-01-04" },
    { id: 3, question: "هل يجوز التأخر في إخراج زكاة المال لانتظار قريب مسافر؟", category: "العبادات", status: "replied", date: "2024-01-03" },
];

export default function AdminFatwas() {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-primary mb-1">إدارة الفتاوى</h1>
                    <p className="text-muted-foreground text-sm">مراجعة أسئلة المستفتين والإجابة عليها وتصنيفها.</p>
                </div>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex items-center gap-4">
                    <div className="bg-orange-100 p-3 rounded-xl text-orange-600">
                        <Clock className="h-6 w-6" />
                    </div>
                    <div>
                        <span className="block text-2xl font-bold text-primary">12</span>
                        <span className="text-xs text-muted-foreground uppercase tracking-wider font-bold">بانتظار الرد</span>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex items-center gap-4">
                    <div className="bg-green-100 p-3 rounded-xl text-green-600">
                        <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <div>
                        <span className="block text-2xl font-bold text-primary">145</span>
                        <span className="text-xs text-muted-foreground uppercase tracking-wider font-bold">تم الرد عليها</span>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex items-center gap-4">
                    <div className="bg-primary/5 p-3 rounded-xl text-primary">
                        <MessageSquare className="h-6 w-6" />
                    </div>
                    <div>
                        <span className="block text-2xl font-bold text-primary">157</span>
                        <span className="text-xs text-muted-foreground uppercase tracking-wider font-bold">إجمالي الفتاوى</span>
                    </div>
                </div>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                    type="text"
                    placeholder="البحث في الأسئلة..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all font-serif"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Fatwas List */}
            <div className="space-y-4">
                {initialFatwas.map((fatwa) => (
                    <div key={fatwa.id} className="bg-white p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-all group">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                            <div className="space-y-3 flex-grow">
                                <div className="flex items-center gap-3">
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ${fatwa.status === 'replied' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                                        {fatwa.status === 'replied' ? 'تم الرد' : 'بانتظار الرد'}
                                    </span>
                                    <span className="text-xs text-muted-foreground font-serif">{fatwa.date}</span>
                                    <span className="text-xs bg-muted px-2 py-0.5 rounded text-muted-foreground">{fatwa.category}</span>
                                </div>
                                <h3 className="text-lg font-bold text-primary group-hover:text-secondary transition-colors leading-relaxed">
                                    {fatwa.question}
                                </h3>
                            </div>
                            <div className="flex gap-2 shrink-0 self-end md:self-start">
                                <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-bold hover:bg-secondary transition-all">
                                    <Reply className="h-4 w-4" />
                                    {fatwa.status === 'replied' ? 'تعديل الإجابة' : 'إجابة الآن'}
                                </button>
                                <button className="p-2 text-destructive hover:bg-destructive/5 rounded-xl transition-all border border-transparent hover:border-destructive/20">
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
