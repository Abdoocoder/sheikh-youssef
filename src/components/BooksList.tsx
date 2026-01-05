"use client";

import { SectionHeading } from "@/components/Hero";
import { Download, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { BookSkeleton } from "./Skeleton";

interface Book {
    id: string | number;
    title: string;
    description: string;
    cover: string;
    year: string;
    status: "available" | "soon";
}

export function BooksList() {
    const [bookItems, setBookItems] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBooks = async () => {
            const { data, error } = await supabase
                .from('books')
                .select('*')
                .order('published_year', { ascending: false });

            if (error) {
                console.error('Error fetching books:', error);
            } else if (data && data.length > 0) {
                setBookItems((data as { id: string, title: string, description: string, cover_url: string | null, published_year: number, pdf_url: string | null }[]).map(book => ({
                    id: book.id,
                    title: book.title,
                    description: book.description,
                    cover: book.cover_url || "/assets/book-fiqh.png",
                    year: book.published_year.toString(),
                    status: book.pdf_url ? "available" : "soon"
                })));
            }
            setLoading(false);
        };

        fetchBooks();
    }, []);

    if (loading) {
        return (
            <main className="flex-grow py-20 bg-background">
                <div className="container mx-auto px-4">
                    <div className="mb-12">
                        <SectionHeading title="المؤلفات العلمية" subtitle="مجموعة من الكتب والتحقيقات العلمية للشيخ في مختلف الفنون الشرعية" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
                        {[1, 2, 3].map(i => <BookSkeleton key={i} />)}
                    </div>
                </div>
            </main>
        );
    }
    return (
        <main className="flex-grow py-20 bg-background">
            <div className="container mx-auto px-4">
                <div className="mb-12">
                    <SectionHeading title="المؤلفات العلمية" subtitle="مجموعة من الكتب والتحقيقات العلمية للشيخ في مختلف الفنون الشرعية" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
                    {bookItems.map((book, index) => (
                        <motion.div
                            key={book.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group flex flex-col items-center text-center"
                        >
                            <div className="relative w-64 h-96 mb-8 perspective-1000">
                                <div className="relative w-full h-full shadow-[20px_20px_50px_rgba(0,0,0,0.15)] rounded-r-lg rounded-l-[4px] overflow-hidden group-hover:rotate-y-[-10deg] transition-transform duration-500 origin-left border-l-4 border-primary">
                                    <Image
                                        src={book.cover}
                                        alt={book.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="object-cover"
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
    )
}
