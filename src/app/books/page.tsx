"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionHeading } from "@/components/Hero";
import { BookOpen, Download, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

const books = [
    {
        id: 1,
        title: "الوجيز في الفقه الحنفي",
        description: "كتاب جامع لأهم مسائل العبادات والمعاملات على مذهب الإمام أبي حنيفة النعمان بأسلوب عصري ميسر.",
        cover: "https://images.unsplash.com/photo-1544648156-53884518823b?auto=format&fit=crop&q=80&w=400",
        year: "2023",
        status: "available"
    },
    {
        id: 2,
        title: "أنوار التزكية في شرح الوظيفة الزروقية",
        description: "شرح تربوي وعلمي لوظيفة الإمام أحمد زروق رضي الله عنه، يتناول آداب السلوك وتزكية النفس.",
        cover: "https://images.unsplash.com/photo-1589998059171-988d887df643?auto=format&fit=crop&q=80&w=400",
        year: "2024",
        status: "soon"
    },
    {
        id: 3,
        title: "المدخل إلى المصارف الإسلامية",
        description: "دراسة تحليلية لقواعد الاقتصاد الإسلامي وتطبيقاته في البنوك الحديثة، مع مقارنة بالفقه التقليدي.",
        cover: "https://images.unsplash.com/photo-1543002588-bfa7400217eef?auto=format&fit=crop&q=80&w=400",
        year: "2022",
        status: "available"
    }
];

export default function BooksPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow py-20 bg-background">
                <div className="container mx-auto px-4">
                    <SectionHeading title="المؤلفات العلمية" subtitle="مجموعة من الكتب والتحقيقات العلمية للشيخ في مختلف الفنون الشرعية" />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
                        {books.map((book, index) => (
                            <motion.div
                                key={book.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="group flex flex-col items-center text-center"
                            >
                                <div className="relative w-64 h-96 mb-8 perspective-1000">
                                    <div className="relative w-full h-full shadow-[20px_20px_50px_rgba(0,0,0,0.15)] rounded-r-lg rounded-l-[4px] overflow-hidden group-hover:rotate-y-[-10deg] transition-transform duration-500 origin-left border-l-4 border-primary">
                                        <img
                                            src={book.cover}
                                            alt={book.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent" />
                                    </div>
                                    {book.status === "soon" && (
                                        <div className="absolute top-4 right-4 bg-secondary text-secondary-foreground text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                            قريباً
                                        </div>
                                    )}
                                </div>

                                <h3 className="text-2xl font-serif font-bold text-primary mb-3 group-hover:text-secondary transition-colors">
                                    {book.title}
                                </h3>
                                <p className="text-muted-foreground mb-6 line-clamp-3 leading-relaxed px-4">
                                    {book.description}
                                </p>

                                <div className="flex gap-4 mt-auto">
                                    {book.status === "available" ? (
                                        <>
                                            <button className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all text-sm font-bold">
                                                <Download className="h-4 w-4" />
                                                تحميل PDF
                                            </button>
                                            <button className="flex items-center gap-2 px-6 py-2 border border-primary text-primary rounded-lg hover:bg-primary/5 transition-all text-sm font-bold">
                                                <ShoppingBag className="h-4 w-4" />
                                                شراء ورقي
                                            </button>
                                        </>
                                    ) : (
                                        <button className="px-10 py-2 bg-muted text-muted-foreground rounded-lg text-sm font-bold cursor-not-allowed">
                                            قيد الطباعة
                                        </button>
                                    )}
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
