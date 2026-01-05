"use client";

import { X, Loader2, Send, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";

interface FatwaRequestFormProps {
    isOpen: boolean;
    onClose: () => void;
}

export function FatwaRequestForm({ isOpen, onClose }: FatwaRequestFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        question: "",
        details: "",
        asker_name: "",
        asker_email: "",
        is_private: false
    });

    const resetForm = useCallback(() => {
        setFormData({
            question: "",
            details: "",
            asker_name: "",
            asker_email: "",
            is_private: false
        });
        setIsSuccess(false);
        setError("");
    }, []);

    const handleClose = useCallback(() => {
        resetForm();
        onClose();
    }, [onClose, resetForm]);

    // Close on escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") handleClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [handleClose]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            if (!formData.question.trim()) {
                throw new Error("الرجاء كتابة السؤال");
            }

            const { error: insertError } = await supabase
                .from('fatwa_questions')
                .insert([{
                    question: formData.question,
                    details: formData.details,
                    asker_name: formData.asker_name,
                    asker_email: formData.asker_email,
                    is_private: formData.is_private,
                    status: 'pending'
                }]);

            if (insertError) throw insertError;

            setIsSuccess(true);
            setTimeout(() => {
                handleClose();
            }, 3000);

        } catch (err: any) {
            console.error(err);
            setError(err.message || "حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={handleClose}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-card border border-primary/20 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-primary/5 p-6 border-b border-primary/10 flex items-center justify-between">
                            <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                                <HelpCircle className="h-6 w-6" />
                                استفتِ الشيخ
                            </h3>
                            <button onClick={handleClose} className="p-2 hover:bg-primary/10 rounded-full transition-colors text-muted-foreground hover:text-primary">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            {isSuccess ? (
                                <div className="text-center py-10">
                                    <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Send className="h-8 w-8" />
                                    </div>
                                    <h4 className="text-xl font-bold text-primary mb-2">تم استلام سؤالك بنجاح!</h4>
                                    <p className="text-muted-foreground">سيتم مراجعة السؤال والإجابة عليه في أقرب وقت ممكن إن شاء الله.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {error && (
                                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm">
                                            {error}
                                        </div>
                                    )}

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-primary/80">نص السؤال <span className="text-red-500">*</span></label>
                                        <textarea
                                            value={formData.question}
                                            onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                                            className="w-full h-32 p-3 rounded-xl bg-background border border-border focus:border-secondary focus:ring-1 focus:ring-secondary/50 transition-all resize-none"
                                            placeholder="اكتب سؤالك هنا بوضوح..."
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-primary/80">تفاصيل إضافية (اختياري)</label>
                                        <textarea
                                            value={formData.details}
                                            onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                                            className="w-full h-20 p-3 rounded-xl bg-background border border-border focus:border-secondary focus:ring-1 focus:ring-secondary/50 transition-all resize-none"
                                            placeholder="أي تفاصيل أخرى توضح المسألة..."
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-primary/80">الاسم (اختياري)</label>
                                            <input
                                                type="text"
                                                value={formData.asker_name}
                                                onChange={(e) => setFormData({ ...formData, asker_name: e.target.value })}
                                                className="w-full p-3 rounded-xl bg-background border border-border focus:border-secondary focus:ring-1 focus:ring-secondary/50 transition-all"
                                                placeholder="الاسم الكريم"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-primary/80">البريد الإلكتروني (اختياري)</label>
                                            <input
                                                type="email"
                                                value={formData.asker_email}
                                                onChange={(e) => setFormData({ ...formData, asker_email: e.target.value })}
                                                className="w-full p-3 rounded-xl bg-background border border-border focus:border-secondary focus:ring-1 focus:ring-secondary/50 transition-all"
                                                placeholder="لتلقي الإشعار بالإجابة"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-xl border border-primary/10">
                                        <input
                                            type="checkbox"
                                            id="private-check"
                                            checked={formData.is_private}
                                            onChange={(e) => setFormData({ ...formData, is_private: e.target.checked })}
                                            className="w-5 h-5 rounded border-gray-300 text-secondary focus:ring-secondary"
                                        />
                                        <label htmlFor="private-check" className="text-sm font-medium text-foreground/80 cursor-pointer select-none">
                                            سؤال خاص (لا يُنشر علناً)
                                        </label>
                                    </div>

                                    <div className="pt-4">
                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="w-full py-4 bg-secondary text-secondary-foreground font-bold rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isLoading ? (
                                                <>
                                                    <Loader2 className="h-5 w-5 animate-spin" />
                                                    جاري الإرسال...
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="h-5 w-5" />
                                                    إرسال السؤال
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
