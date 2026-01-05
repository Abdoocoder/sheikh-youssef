import Link from "next/link";
import { Facebook, Mail, Youtube } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-primary text-primary-foreground py-16 border-t border-white/5">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand Section */}
                    <div className="md:col-span-2">
                        <h3 className="font-serif text-3xl font-bold mb-6 text-secondary">الشيخ يوسف حازم أبو غزالة</h3>
                        <p className="text-primary-foreground/70 text-lg mb-8 max-w-md leading-relaxed">
                            منصة علمية تهدف إلى نشر العلم الشرعي الصحيح المتصل بالسند، متبعين منهج أهل السنة والجماعة في العلم والعمل والسلوك.
                        </p>
                        <div className="flex gap-4">
                            <Link href="https://www.facebook.com/profile.php?id=100063018020030" target="_blank" className="p-3 bg-white/5 rounded-full hover:bg-secondary/20 hover:text-secondary transition-all">
                                <Facebook className="h-6 w-6" />
                            </Link>
                            <Link href="#" className="p-3 bg-white/5 rounded-full hover:bg-secondary/20 hover:text-secondary transition-all">
                                <Youtube className="h-6 w-6" />
                            </Link>
                            <Link href="mailto:Yusif.Hazem@wise.edu.jo" className="p-3 bg-white/5 rounded-full hover:bg-secondary/20 hover:text-secondary transition-all">
                                <Mail className="h-6 w-6" />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-xl font-bold mb-6 text-white">روابط سريعة</h4>
                        <ul className="space-y-4">
                            <li><Link href="/bio" className="text-primary-foreground/60 hover:text-secondary transition-colors">السيرة الذاتية</Link></li>
                            <li><Link href="/lessons" className="text-primary-foreground/60 hover:text-secondary transition-colors">الدروس العلمية</Link></li>
                            <li><Link href="/fatwas" className="text-primary-foreground/60 hover:text-secondary transition-colors">الفتاوى الشرعية</Link></li>
                            <li><Link href="/books" className="text-primary-foreground/60 hover:text-secondary transition-colors">المؤلفات</Link></li>
                        </ul>
                    </div>

                    {/* Contact info */}
                    <div>
                        <h4 className="text-xl font-bold mb-6 text-white">تواصل معنا</h4>
                        <ul className="space-y-4 text-primary-foreground/60">
                            <li className="flex items-center gap-2">
                                <span className="font-medium text-white">البريد:</span>
                                Yusif.Hazem@wise.edu.jo
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="font-medium text-white">الجامعة:</span>
                                جامعة العلوم الإسلامية العالمية
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-primary-foreground/40 text-sm">
                    <p>© {new Date().getFullYear()} جميع الحقوق محفوظة لأسرة الشيخ يوسف أبو غزالة</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-white">سياسة الخصوصية</Link>
                        <Link href="/terms" className="hover:text-white">شروط الاستخدام</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
