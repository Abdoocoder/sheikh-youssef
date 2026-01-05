import Link from "next/link";
import { Facebook, Mail, Youtube, Send, Phone } from "lucide-react"; // Added Send for Telegram
import { supabase } from "@/lib/supabase";

export async function Footer() {
    // Fetch site settings
    const { data: settings } = await supabase
        .from('site_settings')
        .select('*')
        .eq('id', 1)
        .single();

    return (
        <footer className="bg-primary text-primary-foreground py-16 border-t border-white/5">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand Section */}
                    <div className="md:col-span-2">
                        <h3 className="font-serif text-3xl font-bold mb-6 text-secondary">
                            {settings?.site_title || "موقع فضيلة الشيخ يوسف حازم أبو غزالة"}
                        </h3>
                        <p className="text-primary-foreground/70 text-lg mb-8 max-w-md leading-relaxed">
                            {settings?.site_description || "منصة علمية تهدف إلى نشر العلم الشرعي الصحيح المتصل بالسند، متبعين منهج أهل السنة والجماعة في العلم والعمل والسلوك."}
                        </p>
                        <div className="flex gap-4">
                            {settings?.facebook_url && (
                                <Link href={settings.facebook_url} target="_blank" className="p-3 bg-white/5 rounded-full hover:bg-secondary/20 hover:text-secondary transition-all">
                                    <Facebook className="h-6 w-6" />
                                </Link>
                            )}
                            {settings?.youtube_url && (
                                <Link href={settings.youtube_url} target="_blank" className="p-3 bg-white/5 rounded-full hover:bg-secondary/20 hover:text-secondary transition-all">
                                    <Youtube className="h-6 w-6" />
                                </Link>
                            )}
                            {settings?.telegram_url && (
                                <Link href={settings.telegram_url} target="_blank" className="p-3 bg-white/5 rounded-full hover:bg-secondary/20 hover:text-secondary transition-all">
                                    <Send className="h-6 w-6" />
                                </Link>
                            )}
                            {settings?.contact_email && (
                                <Link href={`mailto:${settings.contact_email}`} className="p-3 bg-white/5 rounded-full hover:bg-secondary/20 hover:text-secondary transition-all">
                                    <Mail className="h-6 w-6" />
                                </Link>
                            )}
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
                            {settings?.contact_email && (
                                <li className="flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-secondary shrink-0" />
                                    <span>{settings.contact_email}</span>
                                </li>
                            )}
                            {settings?.whatsapp_number && (
                                <li className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-secondary shrink-0" />
                                    <span dir="ltr">{settings.whatsapp_number}</span>
                                </li>
                            )}
                            <li className="flex items-center gap-2">
                                <span className="font-medium text-white">الجامعة:</span>
                                جامعة العلوم الإسلامية العالمية
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-primary-foreground/40 text-sm">
                    <p>© {new Date().getFullYear()} جميع الحقوق محفوظة لأسرة الشيخ يوسف أبو غزالة. بإدارة وإشراف أحد طلاب الشيخ يوسف ابو غزالة</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-white">سياسة الخصوصية</Link>
                        <Link href="/terms" className="hover:text-white">شروط الاستخدام</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
