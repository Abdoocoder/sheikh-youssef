"use client";

import { Plus, Search, Edit2, Trash2, ExternalLink, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminLessons() {
    const [searchTerm, setSearchTerm] = useState("");
    const [lessons, setLessons] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingLesson, setEditingLesson] = useState<any>(null);
    const [newLesson, setNewLesson] = useState({
        title: "",
        media_url: "",
        category: "أدب طلب العلم",
        type: "lesson"
    });

    useEffect(() => {
        fetchLessons();
    }, []);

    const fetchLessons = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('content')
            .select('*')
            .eq('type', 'lesson')
            .order('published_at', { ascending: false });

        if (error) {
            console.error('Error fetching lessons:', error);
        } else {
            setLessons(data || []);
        }
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('هل أنت متأكد من حذف هذا الدرس؟')) return;

        const { error } = await supabase
            .from('content')
            .delete()
            .eq('id', id);

        if (error) {
            alert('خطأ في الحذف: ' + error.message);
        } else {
            setLessons(lessons.filter(l => l.id !== id));
        }
    };

    const handleAddLesson = async (e: React.FormEvent) => {
        e.preventDefault();
        const slug = newLesson.title.trim().toLowerCase().replace(/\s+/g, '-');

        const { data, error } = await supabase
            .from('content')
            .insert([{
                ...newLesson,
                slug,
                published_at: new Date().toISOString()
            }])
            .select();

        if (error) {
            alert('خطأ في الإضافة: ' + error.message);
        } else {
            if (data) setLessons([data[0], ...lessons]);
            setShowAddForm(false);
            setNewLesson({ title: "", media_url: "", category: "أدب طلب العلم", type: "lesson" });
        }
    };

    const handleUpdateLesson = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingLesson) return;

        const { error } = await supabase
            .from('content')
            .update({
                title: editingLesson.title,
                media_url: editingLesson.media_url,
                category: editingLesson.category
            })
            .eq('id', editingLesson.id);

        if (error) {
            alert('خطأ في التحديث: ' + error.message);
        } else {
            setLessons(lessons.map(l => l.id === editingLesson.id ? editingLesson : l));
            setEditingLesson(null);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-primary mb-1">إدارة الدروس</h1>
                    <p className="text-muted-foreground text-sm">إدارة السلاسل العلمية والدروس المرئية المعروضة على الموقع.</p>
                </div>
                <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="flex items-center justify-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-xl font-bold shadow-lg shadow-secondary/20 hover:scale-105 transition-all"
                >
                    <Plus className="h-5 w-5" />
                    {showAddForm ? "إلغاء" : "إضافة درس جديد"}
                </button>
            </div>

            {/* Edit Lesson Modal */}
            {editingLesson && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="bg-secondary p-6 text-secondary-foreground">
                            <h2 className="text-xl font-bold font-serif flex items-center gap-2">
                                <Edit2 className="h-6 w-6" />
                                تعديل بيانات الدرس
                            </h2>
                        </div>
                        <form onSubmit={handleUpdateLesson} className="p-6 space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-muted-foreground px-1">عنوان الدرس</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all font-serif"
                                    value={editingLesson.title}
                                    onChange={(e) => setEditingLesson({ ...editingLesson, title: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-muted-foreground px-1">رابط يوتيوب / الوسائط</label>
                                <input
                                    required
                                    type="url"
                                    className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all font-serif text-left ltr"
                                    value={editingLesson.media_url}
                                    onChange={(e) => setEditingLesson({ ...editingLesson, media_url: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-muted-foreground px-1">التصنيف</label>
                                <select
                                    className="w-full px-4 py-3 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all font-serif"
                                    value={editingLesson.category}
                                    onChange={(e) => setEditingLesson({ ...editingLesson, category: e.target.value })}
                                >
                                    <option>أدب طلب العلم</option>
                                    <option>الفقه</option>
                                    <option>التزكية</option>
                                    <option>العقيدة</option>
                                </select>
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="submit"
                                    className="flex-grow bg-primary text-white py-3 rounded-xl font-bold hover:bg-secondary transition-all shadow-lg"
                                >
                                    حفظ التعديلات
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setEditingLesson(null)}
                                    className="px-6 bg-muted text-muted-foreground py-3 rounded-xl font-bold hover:bg-muted/80 transition-all"
                                >
                                    إلغاء
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Add Lesson Form */}
            {showAddForm && (
                <div className="bg-white p-6 rounded-2xl border border-secondary/20 shadow-xl animate-in fade-in slide-in-from-top-4 duration-300">
                    <h2 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                        <Plus className="h-5 w-5 text-secondary" />
                        إضافة درس جديد
                    </h2>
                    <form onSubmit={handleAddLesson} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-muted-foreground px-1">عنوان الدرس</label>
                            <input
                                required
                                type="text"
                                placeholder="مثال: شرح كتاب الوجيز..."
                                className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all font-serif"
                                value={newLesson.title}
                                onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-muted-foreground px-1">رابط يوتيوب / الوسائط</label>
                            <input
                                required
                                type="url"
                                placeholder="https://youtube.com/..."
                                className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all font-serif text-left ltr"
                                value={newLesson.media_url}
                                onChange={(e) => setNewLesson({ ...newLesson, media_url: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-muted-foreground px-1">التصنيف</label>
                            <select
                                className="w-full px-4 py-3 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all font-serif"
                                value={newLesson.category}
                                onChange={(e) => setNewLesson({ ...newLesson, category: e.target.value })}
                            >
                                <option>أدب طلب العلم</option>
                                <option>الفقه</option>
                                <option>التزكية</option>
                                <option>العقيدة</option>
                            </select>
                        </div>
                        <div className="flex items-end">
                            <button
                                type="submit"
                                className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-secondary transition-all shadow-lg"
                            >
                                حفظ الدرس ونشره
                            </button>
                        </div>
                    </form>
                </div>
            )}

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
                        {loading ? (
                            <tr>
                                <td colSpan={4} className="py-20 text-center">
                                    <Loader2 className="h-8 w-8 animate-spin text-secondary mx-auto mb-2" />
                                    <span className="text-muted-foreground">جاري تحميل الدروس...</span>
                                </td>
                            </tr>
                        ) : lessons.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="py-20 text-center">
                                    <span className="text-muted-foreground">لا يوجد دروس مضافة بعد.</span>
                                </td>
                            </tr>
                        ) : (
                            lessons.filter(l => l.title.includes(searchTerm)).map((lesson) => (
                                <tr key={lesson.id} className="group hover:bg-muted/30 transition-colors">
                                    <td className="py-5 px-4">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-primary group-hover:text-secondary transition-colors">{lesson.title}</span>
                                            {lesson.media_url && (
                                                <a href={lesson.media_url} target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground flex items-center gap-1 hover:text-secondary mt-1">
                                                    <ExternalLink className="h-3 w-3" />
                                                    رابط الوسائط
                                                </a>
                                            )}
                                        </div>
                                    </td>
                                    <td className="py-5 px-4">
                                        <span className="px-3 py-1 bg-primary/5 text-primary text-xs rounded-full border border-primary/10">
                                            {lesson.category}
                                        </span>
                                    </td>
                                    <td className="py-5 px-4 text-sm text-muted-foreground">
                                        {new Date(lesson.published_at).toLocaleDateString('ar-EG')}
                                    </td>
                                    <td className="py-5 px-4 font-serif">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => setEditingLesson(lesson)}
                                                className="p-2 text-primary hover:bg-primary/5 rounded-lg transition-all"
                                                title="تعديل"
                                            >
                                                <Edit2 className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(lesson.id)}
                                                className="p-2 text-destructive hover:bg-destructive/5 rounded-lg transition-all"
                                                title="حذف"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
