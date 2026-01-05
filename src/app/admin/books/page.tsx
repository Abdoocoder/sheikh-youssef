"use client";

import { BookOpen, Plus, Search, Edit2, Trash2, CheckCircle, Clock, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

export default function AdminBooks() {
    const [searchTerm, setSearchTerm] = useState("");
    const [books, setBooks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newBook, setNewBook] = useState({
        title: "",
        description: "",
        cover_url: "",
        published_year: new Date().getFullYear(),
        pdf_url: ""
    });

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('books')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching books:', error);
        } else {
            setBooks(data || []);
        }
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('هل أنت متأكد من حذف هذا الكتاب؟')) return;

        const { error } = await supabase
            .from('books')
            .delete()
            .eq('id', id);

        if (error) {
            alert('خطأ في الحذف: ' + error.message);
        } else {
            setBooks(books.filter(b => b.id !== id));
        }
    };

    const handleAddBook = async (e: React.FormEvent) => {
        e.preventDefault();

        const { data, error } = await supabase
            .from('books')
            .insert([newBook])
            .select();

        if (error) {
            alert('خطأ في الإضافة: ' + error.message);
        } else {
            if (data) setBooks([data[0], ...books]);
            setShowAddForm(false);
            setNewBook({
                title: "",
                description: "",
                cover_url: "",
                published_year: new Date().getFullYear(),
                pdf_url: ""
            });
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-primary mb-1">إدارة الكتب والمؤلفات</h1>
                    <p className="text-muted-foreground text-sm">إضافة وتعديل بيانات الكتب والمؤلفات العلمية للشيخ.</p>
                </div>
                <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="flex items-center justify-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-xl font-bold shadow-lg shadow-secondary/20 hover:scale-105 transition-all"
                >
                    <Plus className="h-5 w-5" />
                    {showAddForm ? "إلغاء" : "إضافة كتاب جديد"}
                </button>
            </div>

            {/* Add Book Form */}
            {showAddForm && (
                <div className="bg-white p-6 rounded-2xl border border-secondary/20 shadow-xl animate-in fade-in slide-in-from-top-4 duration-300">
                    <h2 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-secondary" />
                        إضافة كتاب جديد
                    </h2>
                    <form onSubmit={handleAddBook} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2 col-span-full">
                            <label className="text-sm font-bold text-muted-foreground px-1">عنوان الكتاب</label>
                            <input
                                required
                                type="text"
                                placeholder="مثال: الوجيز في الفقه الحنفي..."
                                className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all font-serif"
                                value={newBook.title}
                                onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2 col-span-full">
                            <label className="text-sm font-bold text-muted-foreground px-1">وصف الكتاب</label>
                            <textarea
                                required
                                rows={3}
                                placeholder="وصف موجز للمحتوى العلمي للكتاب..."
                                className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all font-serif"
                                value={newBook.description}
                                onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-muted-foreground px-1">رابط صورة الغلاف</label>
                            <input
                                type="url"
                                placeholder="https://..."
                                className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all font-serif text-left ltr"
                                value={newBook.cover_url}
                                onChange={(e) => setNewBook({ ...newBook, cover_url: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-muted-foreground px-1">سنة النشر</label>
                            <input
                                type="number"
                                className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all font-serif"
                                value={newBook.published_year}
                                onChange={(e) => setNewBook({ ...newBook, published_year: parseInt(e.target.value) })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-muted-foreground px-1">رابط ملف الـ PDF (اختياري)</label>
                            <input
                                type="url"
                                placeholder="https://..."
                                className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all font-serif text-left ltr"
                                value={newBook.pdf_url}
                                onChange={(e) => setNewBook({ ...newBook, pdf_url: e.target.value })}
                            />
                        </div>
                        <div className="flex items-end">
                            <button
                                type="submit"
                                className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-secondary transition-all shadow-lg"
                            >
                                حفظ الكتاب في المكتبة
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                    type="text"
                    placeholder="ابحث عن كتاب..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all font-serif"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Books Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {loading ? (
                    <div className="col-span-full py-20 text-center">
                        <Loader2 className="h-8 w-8 animate-spin text-secondary mx-auto mb-2" />
                        <span className="text-muted-foreground font-serif">جاري تحميل الكتب...</span>
                    </div>
                ) : books.length === 0 ? (
                    <div className="col-span-full py-20 text-center bg-white rounded-2xl border border-dashed border-border">
                        <span className="text-muted-foreground font-serif">لا يوجد كتب مضافة بعد.</span>
                    </div>
                ) : (
                    books.filter(b => b.title.includes(searchTerm)).map((book) => (
                        <div key={book.id} className="bg-white p-5 rounded-2xl border border-border shadow-sm hover:shadow-md transition-all group flex flex-col sm:flex-row gap-6">
                            <div className="relative w-full sm:w-32 h-44 shrink-0 rounded-lg overflow-hidden shadow-md">
                                <Image
                                    src={book.cover_url || "/assets/book-fiqh.png"}
                                    alt={book.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-2 sm:hidden">
                                    <span className="text-[10px] text-white font-bold">{book.pdf_url ? 'متوفر' : 'قريباً'}</span>
                                </div>
                            </div>

                            <div className="flex flex-col flex-grow">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-lg font-bold text-primary group-hover:text-secondary transition-colors leading-tight">
                                        {book.title}
                                    </h3>
                                    <span className={`hidden sm:flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ${book.pdf_url ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                                        {book.pdf_url ? <CheckCircle className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                                        {book.pdf_url ? 'متوفر' : 'قريباً'}
                                    </span>
                                </div>

                                <p className="text-xs text-muted-foreground line-clamp-2 mb-4 leading-relaxed font-serif">
                                    {book.description}
                                </p>

                                <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
                                    <span className="text-xs font-bold text-muted-foreground">{book.published_year} م</span>
                                    <div className="flex gap-1">
                                        <button className="p-2 text-primary hover:bg-primary/5 rounded-lg transition-all" title="تعديل">
                                            <Edit2 className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(book.id)}
                                            className="p-2 text-destructive hover:bg-destructive/5 rounded-lg transition-all"
                                            title="حذف"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
