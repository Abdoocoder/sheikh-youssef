"use client";

import { MessageSquare, Search, CheckCircle2, Clock, Reply, Trash2, Loader2 } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";

interface Fatwa {
    id: string;
    type: string;
    title: string;
    body: string | null;
    created_at: string;
}

export default function AdminFatwas() {
    const [searchTerm, setSearchTerm] = useState("");
    const [fatwas, setFatwas] = useState<Fatwa[]>([]);
    const [loading, setLoading] = useState(true);
    const [replyingTo, setReplyingTo] = useState<Fatwa | null>(null);
    const [replyBody, setReplyBody] = useState("");

    const fetchFatwas = useCallback(async () => {
        const { data, error } = await supabase
            .from('content')
            .select('*')
            .eq('type', 'fatwa')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching fatwas:', error);
        } else {
            setFatwas(data || []);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchFatwas();
    }, [fetchFatwas]);

    const handleDelete = async (id: string) => {
        if (!confirm('هل أنت متأكد من حذف هذه الفتوى؟')) return;

        const { error } = await supabase
            .from('content')
            .delete()
            .eq('id', id);

        if (error) {
            alert('خطأ في الحذف: ' + error.message);
        } else {
            setFatwas(fatwas.filter(f => f.id !== id));
        }
    };

    const handleReply = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!replyingTo) return;

        const { error } = await supabase
            .from('content')
            .update({ body: replyBody })
            .eq('id', replyingTo.id);

        if (error) {
            alert('خطأ في حفظ الرد: ' + error.message);
        } else {
            setFatwas(fatwas.map(f => f.id === replyingTo.id ? { ...f, body: replyBody } : f));
            setReplyingTo(null);
            setReplyBody("");
        }
    };

    return (
        <div className="space-y-12 py-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-border pb-8">
                <div>
                    <h1 className="text-3xl font-bold text-primary mb-2">إدارة الفتاوى</h1>
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

            {/* Reply Form Modal-like UI */}
            {replyingTo && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="bg-primary p-6 text-white">
                            <h2 className="text-xl font-bold font-serif flex items-center gap-2">
                                <Reply className="h-6 w-6" />
                                الرد على الفتوى
                            </h2>
                            <p className="text-primary-foreground/70 text-sm mt-1 line-clamp-1">{replyingTo.title}</p>
                        </div>
                        <form onSubmit={handleReply} className="p-6 space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-muted-foreground px-1">نص الإجابة الشرعية</label>
                                <textarea
                                    required
                                    rows={8}
                                    placeholder="اكتب الإجابة هنا..."
                                    className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all font-serif leading-relaxed"
                                    value={replyBody}
                                    onChange={(e) => setReplyBody(e.target.value)}
                                />
                            </div>
                            <div className="flex gap-3">
                                <button
                                    type="submit"
                                    className="flex-grow bg-primary text-white py-3 rounded-xl font-bold hover:bg-secondary transition-all shadow-lg"
                                >
                                    اعتماد الإجابة ونشرها
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setReplyingTo(null)}
                                    className="px-6 bg-muted text-muted-foreground py-3 rounded-xl font-bold hover:bg-muted/80 transition-all"
                                >
                                    إلغاء
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Fatwas List */}
            <div className="space-y-4">
                {loading ? (
                    <div className="py-20 text-center">
                        <Loader2 className="h-8 w-8 animate-spin text-secondary mx-auto mb-2" />
                        <span className="text-muted-foreground font-serif">جاري تحميل الفتاوى...</span>
                    </div>
                ) : fatwas.length === 0 ? (
                    <div className="py-20 text-center bg-white rounded-2xl border border-dashed border-border">
                        <span className="text-muted-foreground font-serif">لا يوجد فتاوى واردة حالياً.</span>
                    </div>
                ) : (
                    fatwas.filter(f => f.title.includes(searchTerm)).map((fatwa) => (
                        <div key={fatwa.id} className="bg-white p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-all group">
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                                <div className="space-y-3 flex-grow">
                                    <div className="flex items-center gap-3">
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ${fatwa.body ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                                            {fatwa.body ? 'تم الرد' : 'بانتظار الرد'}
                                        </span>
                                        <span className="text-xs text-muted-foreground font-serif">{new Date(fatwa.created_at).toLocaleDateString('ar-EG')}</span>
                                        <span className="text-xs bg-muted px-2 py-0.5 rounded text-muted-foreground">{fatwa.type}</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-primary group-hover:text-secondary transition-colors leading-relaxed">
                                        {fatwa.title}
                                    </h3>
                                </div>
                                <div className="flex gap-2 shrink-0 self-end md:self-start">
                                    <button
                                        onClick={() => {
                                            setReplyingTo(fatwa);
                                            setReplyBody(fatwa.body || "");
                                        }}
                                        className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-bold hover:bg-secondary transition-all"
                                    >
                                        <Reply className="h-4 w-4" />
                                        {fatwa.body ? 'تعديل الإجابة' : 'إجابة الآن'}
                                    </button>
                                    <button
                                        onClick={() => handleDelete(fatwa.id)}
                                        className="p-2 text-destructive hover:bg-destructive/5 rounded-xl transition-all border border-transparent hover:border-destructive/20"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
