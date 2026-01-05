"use client";

import { Save, Globe, Mail, Share2, Loader2, RotateCcw } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminSettings() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [settings, setSettings] = useState({
        site_title: "",
        site_description: "",
        contact_email: "",
        whatsapp_number: "",
        facebook_url: "",
        youtube_url: "",
        telegram_url: ""
    });

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('site_settings')
            .select('*')
            .eq('id', 1)
            .single();

        if (error) {
            console.error('Error fetching settings:', error);
            // If table doesn't exist yet, we still show the UI but warn
            if (error.code === '42P01') {
                alert('تنبيه: جدول الإعدادات غير موجود في قاعدة البيانات بعد. يرجى تشغيل ملف schema.sql');
            }
        } else if (data) {
            setSettings(data);
        }
        setLoading(false);
    };

    const handleSave = async () => {
        setSaving(true);
        const { error } = await supabase
            .from('site_settings')
            .upsert({ id: 1, ...settings, updated_at: new Date().toISOString() });

        if (error) {
            alert('خطأ في حفظ الإعدادات: ' + error.message);
        } else {
            alert('تم حفظ الإعدادات بنجاح');
        }
        setSaving(false);
    };

    if (loading) {
        return (
            <div className="py-20 text-center">
                <Loader2 className="h-10 w-10 animate-spin text-secondary mx-auto mb-4" />
                <p className="text-muted-foreground font-serif">جاري تحميل إعدادات الموقع...</p>
            </div>
        );
    }

    return (
        <div className="space-y-10 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
                <div>
                    <h1 className="text-2xl font-bold text-primary mb-1">إعدادات الموقع</h1>
                    <p className="text-muted-foreground text-sm font-serif">تخصيص المعلومات العامة وبيانات التواصل والروابط الاجتماعية للموقع الرسمي.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={fetchSettings}
                        className="flex items-center gap-2 px-6 py-2.5 bg-muted text-muted-foreground rounded-xl font-bold hover:bg-muted/80 transition-all text-sm"
                    >
                        <RotateCcw className="h-4 w-4" />
                        إعادة تحميل
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 px-8 py-2.5 bg-secondary text-secondary-foreground rounded-xl font-bold shadow-lg shadow-secondary/20 hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100 text-sm"
                    >
                        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                        حفظ التغييرات
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8">
                {/* General Info */}
                <section className="bg-white overflow-hidden rounded-2xl border border-border shadow-sm">
                    <div className="bg-muted/30 px-6 py-4 border-b border-border flex items-center gap-3">
                        <Globe className="h-5 w-5 text-secondary" />
                        <h2 className="font-bold text-primary">المعلومات العامة</h2>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-muted-foreground block px-1">عنوان الموقع الإفتراضي</label>
                            <input
                                type="text"
                                placeholder="مثال: فضيلة الشيخ يوسف حازم..."
                                className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all font-serif"
                                value={settings.site_title}
                                onChange={(e) => setSettings({ ...settings, site_title: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-muted-foreground block px-1">وصف الموقع للبحث (SEO Meta)</label>
                            <input
                                type="text"
                                placeholder="وصف يظهر في محركات البحث..."
                                className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all font-serif"
                                value={settings.site_description}
                                onChange={(e) => setSettings({ ...settings, site_description: e.target.value })}
                            />
                        </div>
                    </div>
                </section>

                {/* Contact Info */}
                <section className="bg-white overflow-hidden rounded-2xl border border-border shadow-sm">
                    <div className="bg-muted/30 px-6 py-4 border-b border-border flex items-center gap-3">
                        <Mail className="h-5 w-5 text-secondary" />
                        <h2 className="font-bold text-primary">بيانات التواصل المباشر</h2>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-muted-foreground block px-1">البريد الإلكتروني للإدارة</label>
                            <input
                                type="email"
                                placeholder="admin@example.com"
                                className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all font-serif text-left ltr"
                                value={settings.contact_email}
                                onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-muted-foreground block px-1">رقم الواتساب (مع رمز الدولة)</label>
                            <input
                                type="text"
                                placeholder="+9627XXXXXXXX"
                                className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all font-serif text-left ltr"
                                value={settings.whatsapp_number}
                                onChange={(e) => setSettings({ ...settings, whatsapp_number: e.target.value })}
                            />
                        </div>
                    </div>
                </section>

                {/* Social Media */}
                <section className="bg-white overflow-hidden rounded-2xl border border-border shadow-sm">
                    <div className="bg-muted/30 px-6 py-4 border-b border-border flex items-center gap-3">
                        <Share2 className="h-5 w-5 text-secondary" />
                        <h2 className="font-bold text-primary">حسابات التواصل الاجتماعي</h2>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-muted-foreground block px-1">صفحة الفيسبوك</label>
                            <input
                                type="text"
                                placeholder="URL..."
                                className="w-full px-3 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all font-serif text-left ltr text-sm"
                                value={settings.facebook_url}
                                onChange={(e) => setSettings({ ...settings, facebook_url: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-muted-foreground block px-1">قناة اليوتيوب</label>
                            <input
                                type="text"
                                placeholder="URL..."
                                className="w-full px-3 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all font-serif text-left ltr text-sm"
                                value={settings.youtube_url}
                                onChange={(e) => setSettings({ ...settings, youtube_url: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-muted-foreground block px-1">قناة التيليجرام</label>
                            <input
                                type="text"
                                placeholder="URL..."
                                className="w-full px-3 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all font-serif text-left ltr text-sm"
                                value={settings.telegram_url}
                                onChange={(e) => setSettings({ ...settings, telegram_url: e.target.value })}
                            />
                        </div>
                    </div>
                </section>
            </div>

            <div className="mt-8 p-4 bg-orange-50 border border-orange-100 rounded-xl text-orange-800 text-xs text-center font-serif">
                تنبيه: التغييرات هنا تؤثر بشكل مباشر على معلومات الموقع والروابط المعروضة للجمهور.
            </div>
        </div>
    );
}
