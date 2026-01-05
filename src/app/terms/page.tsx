import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function TermsPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold font-serif text-primary mb-8 text-center">
                        الشروط والأحكام
                    </h1>

                    <div className="space-y-8 text-lg text-foreground/80 leading-relaxed">
                        <section>
                            <h2 className="text-2xl font-bold text-secondary mb-4">المقدمة</h2>
                            <p>
                                مرحبًا بك في موقع الشيخ يوسف حازم أبو غزالة. باستخدامك لهذا الموقع، فإنك توافق على الامتثال لهذه الشروط والأحكام والالتزام بها. يرجى قراءتها بعناية.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-secondary mb-4">الاستخدام المقبول</h2>
                            <p>
                                توافق على استخدام الموقع لأغراض مشروعة فقط، وبطريقة لا تنتهك حقوق الآخرين أو تقيد أو تمنع استخدامهم واستمتاعهم بالموقع. يُمنع أي سلوك قد يلحق الضرر بالموقع أو يؤثر على أدائه.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-secondary mb-4">حقوق الملكية الفكرية</h2>
                            <p>
                                جميع المحتويات المنشورة على هذا الموقع، بما في ذلك النصوص، والمقالات، والدروس الصوتية والمرئية، هي ملكية لموقع الشيخ يوسف حازم أبو غزالة أو مرخصيها، ومحمية بموجب قوانين حقوق النشر.
                            </p>
                            <p className="mt-2">
                                يجوز لك مشاركة المحتوى لأغراض دعوية أو تعليمية غير تجارية، مع ضرورة ذكر المصدر وعدم التعديل على المحتوى الأصلي.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-secondary mb-4">إخلاء المسؤولية</h2>
                            <p>
                                يتم توفير المحتوى على هذا الموقع &quot;كما هو&quot; للأغراض العامة والإعلامية فقط. بينما نسعى جاهدين لضمان دقة المعلومات، فإننا لا نقدم أي ضمانات، صريحة أو ضمنية، بشأن اكتمال أو دقة أو موثوقية المحتوى.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-secondary mb-4">روابط لجهات خارجية</h2>
                            <p>
                                قد يحتوي موقعنا على روابط لمواقع خارجية ليس لها علاقة بنا. نحن لا نتحمل المسؤولية عن محتوى هذه المواقع الخارجية أو ممارسات الخصوصية الخاصة بها.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-secondary mb-4">التعديلات</h2>
                            <p>
                                نحتفظ بالحق في تعديل هذه الشروط والأحكام في أي وقت. يعتبر استمرارك في استخدام الموقع بعد نشر التعديلات بمثابة قبول منك لهذه التغييرات.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-secondary mb-4">اتصل بنا</h2>
                            <p>
                                إذا كان لديك أي استفسارات بخصوص هذه الشروط، يرجى التواصل معنا.
                            </p>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
