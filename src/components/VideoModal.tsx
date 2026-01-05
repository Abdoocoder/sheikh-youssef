"use client";

import { X, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface VideoModalProps {
    isOpen: boolean;
    onClose: () => void;
    videoUrl: string;
    title: string;
}

export function VideoModal({ isOpen, onClose, videoUrl, title }: VideoModalProps) {
    const [embedUrl, setEmbedUrl] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (isOpen && videoUrl) {
            setIsLoading(true);
            // Handle YouTube URLs (watch and playlist)
            let id = "";
            if (videoUrl.includes("v=")) {
                id = videoUrl.split("v=")[1].split("&")[0];
                setEmbedUrl(`https://www.youtube.com/embed/${id}?autoplay=1&modestbranding=1&rel=0`);
            } else if (videoUrl.includes("playlist?list=")) {
                id = videoUrl.split("list=")[1].split("&")[0];
                setEmbedUrl(`https://www.youtube.com/embed/videoseries?list=${id}&autoplay=1&modestbranding=1&rel=0`);
            } else if (videoUrl.includes("youtu.be/")) {
                id = videoUrl.split("youtu.be/")[1].split("?")[0];
                setEmbedUrl(`https://www.youtube.com/embed/${id}?autoplay=1&modestbranding=1&rel=0`);
            } else {
                setEmbedUrl(videoUrl); // Fallback
            }
        } else {
            setEmbedUrl("");
            setIsLoading(true);
        }
    }, [isOpen, videoUrl]);

    // Close on escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="relative w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all"
                        >
                            <X className="h-6 w-6" />
                        </button>

                        <div className="absolute top-4 left-4 z-10 hidden md:block">
                            <h3 className="text-white font-bold text-lg bg-black/40 px-4 py-2 rounded-xl backdrop-blur-md">
                                {title}
                            </h3>
                        </div>

                        {isLoading && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Loader2 className="h-10 w-10 animate-spin text-secondary" />
                            </div>
                        )}

                        {embedUrl && (
                            <iframe
                                src={embedUrl}
                                className="w-full h-full border-0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                onLoad={() => setIsLoading(false)}
                            ></iframe>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
