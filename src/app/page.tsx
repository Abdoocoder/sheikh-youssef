import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { FeaturedContent } from "@/components/FeaturedContent";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <FeaturedContent />

        {/* Additional sections like Biography Teaser can be added here */}
        <section className="py-24 bg-accent/30 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="glass ornament-border max-w-5xl mx-auto rounded-3xl p-12 text-center">
              <h2 className="font-serif text-4xl font-bold text-primary mb-6">رسالتنا العلمية</h2>
              <p className="text-xl text-foreground/80 leading-relaxed mb-8 max-w-3xl mx-auto">
                &quot;نسعى لنشر نور العلم والعمل بوسطية واعتدال، مرتكزين على تراثنا الأصيل، ومنفتحين على متطلبات العصر، لتنشئة جيل علمي يجمع بين عمق الفكر وطهارة الروح.&quot;
              </p>
              <div className="flex justify-center gap-4">
                <div className="h-0.5 w-12 bg-secondary/50 rounded-full my-auto" />
                <span className="font-serif text-2xl text-secondary">الشيخ يوسف أبو غزالة</span>
                <div className="h-0.5 w-12 bg-secondary/50 rounded-full my-auto" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
