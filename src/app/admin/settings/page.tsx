"use client";

import { Save, Globe, Mail, Phone, Share2, ShieldCheck } from "lucide-react";

export default function AdminSettings() {
    return (
        <div className="space-y-10">
            <div>
                <h1 className="text-2xl font-bold text-primary mb-1">إعدادات الموقع</h1>
                <p className="text-muted-foreground text-sm">تخصيص المعلومات العامة وبيانات التواصل والروابط الاجتماعية.</p>
            </div>

            <div className="grid grid-cols-1 gap-8">
                {/* General Info */}
                <section className="bg-white p-6 rounded-2xl border border-border shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="bg-primary/5 p-2 rounded-lg text-primary">
                            <Globe className="h-5 w-5" />
                        </div>
                        <h2 className="text-lg font-bold text-primary">المعلومات العامة</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-muted-foreground">عنوان الموقع</label>
                            <input
                                type="text"
                                defaultValue="فضيلة الشيخ يوسف حازم أبو غزالة"
                                className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all font-serif"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-muted-foreground">الوصف المختصر (Meta Description)</label>
                            <input
                                type="text"
                                defaultValue="الموقع الرسمي للشيخ يوسف حازم أبو غزالة - علوم شرعية، فتاوى، وتزكية"
                                className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all font-serif"
                            />
                        </div>
                    </div>
                </section>

                {/* Contact Info */}
                <section className="bg-white p-6 rounded-2xl border border-border shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="bg-primary/5 p-2 rounded-lg text-primary">
                            <Mail className="h-5 w-5" />
                        </div>
                        <h2 className="text-lg font-bold text-primary">بيانات التواصل</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-muted-foreground">البريد الإلكتروني</label>
                            <input
                                type="email"
                                defaultValue="contact@sheikhyoussef.com"
                                className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all font-serif text-left ltr"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-muted-foreground">رقم الواتساب</label>
                            <input
                                type="text"
                                defaultValue="+962 7XXXXXXXX"
                                className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all font-serif text-left ltr"
                            />
                        </div>
                    </div>
                </section>

                {/* Social Media */}
                <section className="bg-white p-6 rounded-2xl border border-border shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="bg-primary/5 p-2 rounded-lg text-primary">
                            <Share2 className="h-5 w-5" />
                        </div>
                        <h2 className="text-lg font-bold text-primary">روابط التواصل الاجتماعي</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-muted-foreground">فيسبوك</label>
                            <input
                                type="text"
                                defaultValue="https://facebook.com/..."
                                className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all font-serif text-left ltr text-xs"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-muted-foreground">يوتيوب</label>
                            <input
                                type="text"
                                defaultValue="https://youtube.com/..."
                                className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all font-serif text-left ltr text-xs"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-muted-foreground">تليجرام</label>
                            <input
                                type="text"
                                defaultValue="https://t.me/..."
                                className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all font-serif text-left ltr text-xs"
                            />
                        </div>
                    </div>
                </section>
            </div>

            <div className="flex justify-end gap-3">
                <button className="px-8 py-3 bg-muted text-muted-foreground rounded-xl font-bold hover:bg-muted/80 transition-all">
                    إلغاء التعديلات
                </button>
                <button className="flex items-center gap-2 px-10 py-3 bg-secondary text-secondary-foreground rounded-xl font-bold shadow-lg shadow-secondary/20 hover:scale-105 transition-all">
                    <Save className="h-5 w-5" />
                    حفظ كافة الإعدادات
                </button>
            </div>
        </div>
    );
}
