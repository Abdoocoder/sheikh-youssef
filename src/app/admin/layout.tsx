import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow bg-muted/30">
                <div className="container mx-auto px-4 py-12">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Admin Sidebar */}
                        <aside className="w-full md:w-64 space-y-2">
                            <h2 className="text-sm font-bold text-primary uppercase tracking-widest px-4 mb-4 opacity-70">لوحة التحكم</h2>
                            {[
                                { name: "الإحصائيات", href: "/admin" },
                                { name: "إدارة الدروس", href: "/admin/lessons" },
                                { name: "إدارة الفتاوى", href: "/admin/fatwas" },
                                { name: "إدارة الكتب", href: "/admin/books" },
                                { name: "الإعدادات", href: "/admin/settings" },
                            ].map(item => (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    className="block px-4 py-3 rounded-xl hover:bg-white/10 hover:shadow-sm transition-all text-primary font-bold border border-transparent hover:border-border"
                                >
                                    {item.name}
                                </a>
                            ))}
                        </aside>

                        {/* Admin Content */}
                        <main className="flex-grow bg-card rounded-3xl p-8 shadow-sm border border-border">
                            {children}
                        </main>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
