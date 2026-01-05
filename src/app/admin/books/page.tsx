"use client";

import { BookOpen, Plus, Search, Edit2, Trash2, CheckCircle, Clock } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

const initialBooks = [
    {
        id: 1,
        title: "الوجيز في الفقه الحنفي",
        description: "كتاب جامع لأهم مسائل العبادات والمعاملات على مذهب الإمام أبي حنيفة النعمان بأسلوب عصري ميسر.",
        cover: "/assets/book-fiqh.png",
        year: "2023",
        status: "available"
    },
    {
        id: 2,
        title: "أنوار التزكية في شرح الوظيفة الزروقية",
        description: "شرح تربوي وعلمي لوظيفة الإمام أحمد زروق رضي الله عنه، يتناول آداب السلوك وتزكية النفس.",
        cover: "/assets/book-spiritual.png",
        year: "2024",
        status: "soon"
    },
    {
        id: 3,
        title: "المدخل إلى المصارف الإسلامية",
        description: "دراسة تحليلية لقواعد الاقتصاد الإسلامي وتطبيقاته في البنوك الحديثة، مع مقارنة بالفقه التقليدي.",
        cover: "/assets/book-economics.png",
        year: "2022",
        status: "available"
    }
];

export default function AdminBooks() {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-primary mb-1">إدارة الكتب والمؤلفات</h1>
                    <p className="text-muted-foreground text-sm">إضافة وتعديل بيانات الكتب والمؤلفات العلمية للشيخ.</p>
                </div>
                <button className="flex items-center justify-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-xl font-bold shadow-lg shadow-secondary/20 hover:scale-105 transition-all">
                    <Plus className="h-5 w-5" />
                    إضافة كتاب جديد
                </button>
            </div>

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
                {initialBooks.map((book) => (
                    <div key={book.id} className="bg-white p-5 rounded-2xl border border-border shadow-sm hover:shadow-md transition-all group flex flex-col sm:flex-row gap-6">
                        <div className="relative w-full sm:w-32 h-44 shrink-0 rounded-lg overflow-hidden shadow-md">
                            <Image
                                src={book.cover}
                                alt={book.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-2 sm:hidden">
                                <span className="text-[10px] text-white font-bold">{book.status === 'available' ? 'متوفر' : 'قريباً'}</span>
                            </div>
                        </div>

                        <div className="flex flex-col flex-grow">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-lg font-bold text-primary group-hover:text-secondary transition-colors leading-tight">
                                    {book.title}
                                </h3>
                                <span className={`hidden sm:flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ${book.status === 'available' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                                    {book.status === 'available' ? <CheckCircle className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                                    {book.status === 'available' ? 'متوفر' : 'قريباً'}
                                </span>
                            </div>

                            <p className="text-xs text-muted-foreground line-clamp-2 mb-4 leading-relaxed font-serif">
                                {book.description}
                            </p>

                            <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
                                <span className="text-xs font-bold text-muted-foreground">{book.year} م</span>
                                <div className="flex gap-1">
                                    <button className="p-2 text-primary hover:bg-primary/5 rounded-lg transition-all" title="تعديل">
                                        <Edit2 className="h-4 w-4" />
                                    </button>
                                    <button className="p-2 text-destructive hover:bg-destructive/5 rounded-lg transition-all" title="حذف">
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
