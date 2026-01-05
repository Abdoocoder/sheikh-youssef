import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionHeading } from "@/components/Hero";
import { GraduationCap, Award, Book, MapPin, Calendar, Mail } from "lucide-react";

export default function BioPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow py-20 bg-background">
                <div className="container mx-auto px-4">
                    <SectionHeading title="السيرة الذاتية" subtitle="مسيرة علمية وأكاديمية في خدمة الشريعة واللغة" />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
                        {/* Profile Info Sidebar */}
                        <div className="lg:col-span-1 space-y-8">
                            <div className="glass p-8 rounded-3xl text-center relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/10 rounded-bl-full" />
                                <div className="w-32 h-32 bg-primary/10 rounded-full mx-auto mb-6 flex items-center justify-center border-2 border-secondary/20">
                                    <span className="font-serif text-3xl font-bold text-primary">ي</span>
                                </div>
                                <h2 className="text-2xl font-serif font-bold text-primary mb-2">يوسف حازم أبو غزالة</h2>
                                <p className="text-muted-foreground mb-6">مدرس الفقه الحنفي</p>
                                <div className="space-y-4 text-right">
                                    <div className="flex items-center gap-3 text-sm">
                                        <MapPin className="h-4 w-4 text-secondary shrink-0" />
                                        <span>عمان، المملكة الأردنية الهاشمية</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <Calendar className="h-4 w-4 text-secondary shrink-0" />
                                        <span>مواليد 1986م</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm group">
                                        <Mail className="h-4 w-4 text-secondary shrink-0" />
                                        <a href="mailto:Yusif.Hazem@wise.edu.jo" className="hover:text-secondary truncate">Yusif.Hazem@wise.edu.jo</a>
                                    </div>
                                </div>
                            </div>

                            <div className="glass p-8 rounded-3xl">
                                <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
                                    <Book className="h-5 w-5 text-secondary" />
                                    مجالات التخصص
                                </h3>
                                <ul className="space-y-3">
                                    {["الفقه الحنفي", "أصول الفقه", "التزكية والسلوك", "المصارف الإسلامية", "تحقيق التراث"].map((specialty) => (
                                        <li key={specialty} className="flex items-center gap-2 before:content-['•'] before:text-secondary before:font-bold">
                                            {specialty}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Main Content Areas */}
                        <div className="lg:col-span-2 space-y-12">
                            {/* Education */}
                            <section>
                                <h3 className="text-2xl font-serif font-bold text-primary mb-8 flex items-center gap-3">
                                    <GraduationCap className="h-8 w-8 text-secondary" />
                                    المسيرة التعليمية
                                </h3>
                                <div className="space-y-8">
                                    <div className="relative pr-8 border-r-2 border-secondary/20">
                                        <div className="absolute top-0 -right-[9px] w-4 h-4 rounded-full bg-secondary shadow-[0_0_10px_rgba(217,119,6,0.5)]" />
                                        <span className="text-secondary font-bold text-sm mb-1 block">2021 - 2022</span>
                                        <h4 className="text-xl font-bold text-primary">ماجستير في الفقه الحنفي</h4>
                                        <p className="text-muted-foreground mt-1 text-lg">جامعة العلوم الإسلامية العالمية - عمان</p>
                                    </div>
                                    <div className="relative pr-8 border-r-2 border-secondary/20">
                                        <div className="absolute top-0 -right-[9px] w-4 h-4 rounded-full bg-secondary/50" />
                                        <span className="text-secondary font-bold text-sm mb-1 block">2020 - 2021</span>
                                        <h4 className="text-xl font-bold text-primary">الدبلوم العالي في الفقه الحنفي</h4>
                                        <p className="text-muted-foreground mt-1 text-lg">جامعة العلوم الإسلامية العالمية - عمان</p>
                                    </div>
                                    <div className="relative pr-8 border-r-2 border-secondary/20">
                                        <div className="absolute top-0 -right-[9px] w-4 h-4 rounded-full bg-secondary/30" />
                                        <span className="text-secondary font-bold text-sm mb-1 block">2013 - 2014</span>
                                        <h4 className="text-xl font-bold text-primary">بكالوريوس المصارف الإسلامية</h4>
                                        <p className="text-muted-foreground mt-1 text-lg">الجامعة الأردنية - عمان</p>
                                    </div>
                                </div>
                            </section>

                            {/* Career */}
                            <section>
                                <h3 className="text-2xl font-serif font-bold text-primary mb-8 flex items-center gap-3">
                                    <Award className="h-8 w-8 text-secondary" />
                                    الخبرة العملية
                                </h3>
                                <div className="glass p-8 rounded-3xl border-r-4 border-secondary">
                                    <h4 className="text-xl font-bold text-primary mb-2">عضو هيئة تدريس</h4>
                                    <p className="text-secondary font-medium mb-4">جامعة العلوم الإسلامية العالمية | 2021 - حتى الآن</p>
                                    <ul className="space-y-3 text-lg text-foreground/80 list-disc list-inside">
                                        <li>تدريس مواد الفقه الحنفي في كلية المذاهب الأربعة.</li>
                                        <li>المساهمة في الأنشطة البحثية والعلمية للجامعة.</li>
                                        <li>الإشراف العلمي والتربوي على طلبة العلم.</li>
                                    </ul>
                                </div>
                            </section>

                            {/* Message */}
                            <section className="bg-primary p-12 rounded-3xl text-white relative overflow-hidden">
                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-tr-full" />
                                <p className="text-2xl font-serif leading-relaxed italic relative z-10">
                                    &quot;إن العلم ليس مجرد نصوص تحفظ، بل هو نور يقذفه الله في القلب يُترجم إلى عمل وأخلاق، ومنهجنا هو الجمع بين صرامة الفقه ونقاء التزكية.&quot;
                                </p>
                            </section>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
