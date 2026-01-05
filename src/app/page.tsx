import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { FeaturedContent } from "@/components/FeaturedContent";
import { Footer } from "@/components/Footer";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <FeaturedContent />

        {/* Additional sections like Biography Teaser can be added here */}
        <section className="py-32 bg-accent/30 relative overflow-hidden mt-12">
          <div className="container mx-auto px-4 relative z-10">
            <div className="glass ornament-border max-w-5xl mx-auto rounded-3xl p-16 text-center shadow-lg">
              <h2 className="font-serif text-5xl font-bold text-primary mb-10 leading-relaxed">رسالتنا العلمية</h2>
              <p className="text-2xl text-foreground/80 leading-loose mb-12 max-w-4xl mx-auto font-light">
                &quot;نسعى لنشر نور العلم والعمل بوسطية واعتدال، مرتكزين على تراثنا الأصيل، ومنفتحين على متطلبات العصر، لتنشئة جيل علمي يجمع بين عمق الفكر وطهارة الروح.&quot;
              </p>
              <div className="flex justify-center gap-6 items-center">
                <div className="h-0.5 w-16 bg-secondary/50 rounded-full" />
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 relative rounded-full overflow-hidden border-2 border-secondary/30 grayscale hover:grayscale-0 transition-all duration-500">
                    <Image
                      src="/assets/sheikh-youssef.png"
                      alt="الشيخ يوسف"
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <span className="font-serif text-3xl text-secondary">الشيخ يوسف أبو غزالة</span>
                </div>
                <div className="h-0.5 w-16 bg-secondary/50 rounded-full" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
