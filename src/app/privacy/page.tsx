import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold font-serif text-primary mb-8 text-center">
            سياسة الخصوصية
          </h1>
          
          <div className="space-y-8 text-lg text-foreground/80 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-secondary mb-4">مقدمة</h2>
              <p>
                نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية. توضح سياسة الخصوصية هذه كيفية جمعنا واستخدامنا وحمايتنا لمعلوماتك عند زيارتك لموقع الشيخ يوسف حازم أبو غزالة.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-secondary mb-4">المعلومات التي نجمعها</h2>
              <p>
                قد نجمع المعلومات التي تقدمها لنا مباشرة، مثل عند التسجيل للحصول على التحديثات، أو التواصل معنا عبر نماذج الاتصال. قد تشمل هذه المعلومات الاسم، وعنوان البريد الإلكتروني، والرسائل التي ترسلها.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-secondary mb-4">كيفية استخدام المعلومات</h2>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>لتحسين تجربتك على الموقع.</li>
                <li>للرد على استفساراتك ورسائلك.</li>
                <li>لإرسال تحديثات أو إشعارات هامة (في حالة الاشتراك).</li>
                <li>لتحليل أداء الموقع وتحسين محتواه.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-secondary mb-4">حماية البيانات</h2>
              <p>
                نحن نتخذ تدابير أمنية مناسبة لحماية معلوماتك من الوصول غير المصرح به أو التغيير أو الإفشاء أو الإتلاف.
              </p>
            </section>

             <section>
              <h2 className="text-2xl font-bold text-secondary mb-4">ملفات تعريف الارتباط (Cookies)</h2>
              <p>
                 قد يستخدم موقعنا ملفات تعريف الارتباط لتحسين تجربة المستخدم. يمكنك ضبط متصفحك لرفض جميع ملفات تعريف الارتباط أو لتنبيهك عند إرسال ملف تعريف ارتباط.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-secondary mb-4">التغييرات على سياسة الخصوصية</h2>
              <p>
                قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. سيتم نشر أي تغييرات على هذه الصفحة، لذا يرجى مراجعتها بانتظام.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-secondary mb-4">اتصل بنا</h2>
              <p>
                إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى التواصل معنا عبر نموذج الاتصال في الموقع.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
