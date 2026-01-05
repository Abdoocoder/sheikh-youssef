"use client";

import { Facebook, Twitter, MessageCircle, Share2, Link as LinkIcon, Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ShareButtonsProps {
    title: string;
    url: string; // Relative or absolute URL. If relative, window.location.origin will be prepended.
    className?: string; // Add className prop
}

export function ShareButtons({ title, url, className }: ShareButtonsProps) {
    const [copied, setCopied] = useState(false);

    const getFullUrl = () => {
        if (typeof window !== "undefined") {
            return url.startsWith("http") ? url : `${window.location.origin}${url}`;
        }
        return url;
    };

    const handleShare = (platform: "facebook" | "twitter" | "whatsapp" | "telegram") => {
        const fullUrl = getFullUrl();
        const text = encodeURIComponent(title);
        const encodedUrl = encodeURIComponent(fullUrl);

        let shareUrl = "";
        switch (platform) {
            case "facebook":
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
                break;
            case "twitter":
                shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${encodedUrl}`;
                break;
            case "whatsapp":
                shareUrl = `https://wa.me/?text=${text}%20${encodedUrl}`;
                break;
            case "telegram":
                shareUrl = `https://t.me/share/url?url=${encodedUrl}&text=${text}`;
                break;
        }

        window.open(shareUrl, "_blank", "width=600,height=400");
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(getFullUrl());
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy", err);
        }
    };

    return (
        <div className={cn("flex items-center gap-2", className)}>
            <span className="text-xs text-muted-foreground ml-2 font-medium hidden sm:inline-block">مشاركة:</span>

            <button
                onClick={() => handleShare("whatsapp")}
                className="p-2 rounded-full bg-green-500/10 text-green-600 hover:bg-green-500 hover:text-white transition-colors"
                title="مشاركة عبر واتساب"
            >
                <MessageCircle className="h-4 w-4" />
            </button>

            <button
                onClick={() => handleShare("facebook")}
                className="p-2 rounded-full bg-blue-600/10 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
                title="مشاركة عبر فيسبوك"
            >
                <Facebook className="h-4 w-4" />
            </button>

            <button
                onClick={() => handleShare("telegram")}
                className="p-2 rounded-full bg-sky-500/10 text-sky-500 hover:bg-sky-500 hover:text-white transition-colors"
                title="مشاركة عبر تيليجرام"
            >
                <Share2 className="h-4 w-4" />
            </button>

            <button
                onClick={handleCopy}
                className={cn(
                    "p-2 rounded-full transition-colors",
                    copied
                        ? "bg-green-500/10 text-green-600"
                        : "bg-primary/5 text-primary/60 hover:bg-primary/10 hover:text-primary"
                )}
                title="نسخ الرابط"
            >
                {copied ? <Check className="h-4 w-4" /> : <LinkIcon className="h-4 w-4" />}
            </button>
        </div>
    );
}
