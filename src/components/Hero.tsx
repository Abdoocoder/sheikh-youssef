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

            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-black/40 blur-[120px]" />

            <div className="container mx-auto px-4 relative z-10 h-full flex flex-col md:flex-row items-center justify-center md:justify-between gap-12">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center md:text-right max-w-2xl"
                >
                    <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium tracking-wider text-secondary uppercase bg-secondary/10 border border-secondary/20 rounded-full">
                        بإدارة وإشراف أحد طلاب الشيخ يوسف ابو غزالة
                    </span>
                    <h2 className="text-secondary/80 font-serif text-xl md:text-2xl mb-4 font-medium">موقع الشيخ</h2>
                    <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold mb-8 text-white leading-tight">
                        <span className="text-shadow-gold">يوسف حازم أبو غزالة</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-primary-foreground/80 mb-10 leading-relaxed font-light">
                        خادم العلم الشريف، المدرس بقسم الفقه الحنفي بجامعة العلوم الإسلامية العالمية، والباحث في العلوم الشرعية والتزكية.
                    </p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-4">
                        <Link
                            href="/lessons"
                            className="bg-secondary text-secondary-foreground px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-lg shadow-secondary/20"
                        >
                            شاهد الدروس العلمية
                        </Link>
                        <Link
                            href="/bio"
                            className="px-8 py-4 rounded-xl font-bold text-lg border border-white/20 text-white hover:bg-white/5 transition-colors backdrop-blur-sm"
                        >
                            السيرة الذاتية
                        </Link>
                    </div>
                </motion.div>

                {/* Golden Medallion Portrait */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative shrink-0"
                >
                    {/* Decorative Rings */}
                    <div className="absolute inset-0 border border-secondary/20 rounded-full scale-110 animate-pulse" />
                    <div className="absolute inset-0 border border-secondary/10 rounded-full scale-125" />

                    {/* Main Image Container */}
                    <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-secondary/30 shadow-[0_0_50px_rgba(217,119,6,0.3)] overflow-hidden bg-gradient-to-b from-secondary/10 to-primary">
                        <Image
                            src="/assets/sheikh-youssef.png"
                            alt="الشيخ يوسف حازم أبو غزالة"
                            fill
                            className="object-cover object-top hover:scale-110 transition-transform duration-700"
                            priority
                        />
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
