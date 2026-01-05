"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Hero() {
    return (
        <section className="relative w-full py-20 lg:py-32 overflow-hidden bg-primary">
            {/* Background Decorative Image */}
            <div className="absolute inset-0 opacity-20 mix-blend-overlay">
                <Image
                    src="/hero-bg.png" // I will need to move the generated image to public/hero-bg.png
                    alt="Islamic Pattern"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Decorative Gradients */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-secondary/10 blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-black/40 blur-[120px]" />

            <div className="container relative mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto"
                >
                    <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium tracking-wider text-secondary uppercase bg-secondary/10 border border-secondary/20 rounded-full">
                        بإدارة وإشراف أحد طلاب الشيخ يوسف ابو غزالة
                    </span>
                    <h2 className="text-secondary/80 font-serif text-xl md:text-2xl mb-4 font-medium">موقع الشيخ</h2>
                    <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold mb-8 text-white leading-tight">
                        <span className="text-shadow-gold">يوسف حازم أبو غزالة</span>
                    </h1>
                    <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto leading-relaxed">
                        خادم العلم الشريف، المدرس بقسم الفقه الحنفي بجامعة العلوم الإسلامية العالمية، والباحث في العلوم الشرعية والتزكية.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/lessons"
                            className="px-8 py-4 bg-secondary text-secondary-foreground font-bold rounded-xl hover:scale-105 transition-transform shadow-xl shadow-secondary/20"
                        >
                            شاهد الدروس العلمية
                        </Link>
                        <Link
                            href="/bio"
                            className="px-8 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors border border-white/20"
                        >
                            السيرة الذاتية
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export function SectionHeading({
    title,
    subtitle,
    centered = true,
}: {
    title: string;
    subtitle?: string;
    centered?: boolean;
}) {
    return (
        <div className={cn("mb-12", centered ? "text-center" : "text-right")}>
            <h2 className="font-serif text-3xl md:text-5xl font-bold mb-4 text-primary">
                {title}
            </h2>
            {subtitle && (
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    {subtitle}
                </p>
            )}
            <div className={cn("mt-4 flex", centered ? "justify-center" : "justify-start")}>
                <div className="h-1 w-20 bg-secondary rounded-full" />
            </div>
        </div>
    );
}
