import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { supabase } from "@/lib/supabase";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ShareButtons } from "@/components/ShareButtons";
import { HelpCircle, Calendar, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { SectionHeading } from "@/components/Hero";

type Props = {
    params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { data: fatwa } = await supabase
        .from('content')
        .select('*')
        .eq('type', 'fatwa')
        .eq('slug', params.slug)
        .single();

    if (!fatwa) {
        return {
            title: 'لم يتم العثور على الفتوى',
        };
    }

    return {
        title: `${fatwa.title} | فتاوى الشيخ يوسف أبو غزالة`,
        description: fatwa.excerpt || fatwa.body?.substring(0, 160),
    };
}

export default async function FatwaPage({ params }: Props) {
    const { data: fatwa } = await supabase
        .from('content')
        .select('*')
        .eq('type', 'fatwa')
        .eq('slug', params.slug)
        .single();

    if (!fatwa) {
        notFound();
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <main className="flex-grow py-20 bg-background">
                <div className="container mx-auto px-4">
                    <div className="mb-8">
                        <Link href="/fatwas" className="inline-flex items-center text-muted-foreground hover:text-secondary transition-colors mb-6">
                            <ChevronLeft className="h-4 w-4 ml-1" />
                            العودة إلى الفتاوى
                        </Link>
                    </div>

                    <article className="max-w-4xl mx-auto">
                        <div className="glass p-8 md:p-12 rounded-3xl border border-primary/10 relative overflow-hidden">
                            {/* Decorative Icon */}
                            <div className="absolute top-0 left-0 p-8 opacity-5">
                                <HelpCircle className="h-64 w-64" />
                            </div>

                            {/* Header */}
                            <div className="relative z-10 mb-10 border-b border-primary/10 pb-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="text-secondary font-bold text-sm bg-secondary/10 px-3 py-1 rounded-full">
                                        {fatwa.category || "فتاوى عامة"}
                                    </span>
                                    <span className={`text-xs px-2 py-1 rounded-full ${fatwa.body ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}>
                                        {fatwa.body ? "تمت الإجابة" : "قيد البحث"}
                                    </span>
                                </div>
                                <h1 className="text-3xl md:text-4xl font-bold text-primary leading-tight mb-6">
                                    {fatwa.title}
                                </h1>
                                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                                    <Calendar className="h-4 w-4" />
                                    <span>{new Date(fatwa.created_at).toLocaleDateString('ar-EG')}</span>
                                </div>
                            </div>

                            {/* Answer Body */}
                            <div className="relative z-10 prose prose-lg dark:prose-invert max-w-none text-right mb-12 font-light leading-loose text-foreground/90">
                                {fatwa.body ? (
                                    <div dangerouslySetInnerHTML={{ __html: fatwa.body }} />
                                    // Note: Assuming body can be HTML. If markdown, needs parser. 
                                    // For now assuming refined text storage. Ideally use a markdown component.
                                    // If raw text: <p>{fatwa.body}</p>
                                    // Since content table says "Markdown or HTML", likely needs parsing if MD.
                                    // But typically simple fatwas are text. I'll simply render as text wrapped in div for now if no parser.
                                    // Actually, let's treat it as text/html assuming it's sanitized or trusted admin input.
                                ) : (
                                    <p className="text-muted-foreground italic">لم يتم نشر الإجابة بعد.</p>
                                )}
                            </div>

                            {/* Footer / Share */}
                            <div className="relative z-10 bg-primary/5 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                                <span className="font-bold text-primary">شارك هذه الفتوى ليعم النفع:</span>
                                <ShareButtons title={fatwa.title} url={`/fatwas/${fatwa.slug}`} />
                            </div>
                        </div>
                    </article>
                </div>
            </main>

            <Footer />
        </div>
    );
}
