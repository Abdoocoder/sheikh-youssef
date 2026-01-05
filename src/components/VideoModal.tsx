"use client";

import { X, Loader2, ListVideo, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { getYouTubePlaylistId, getEmbedUrl } from "@/lib/youtube";
import { cn } from "@/lib/utils";

interface VideoModalProps {
    isOpen: boolean;
    onClose: () => void;
    videoUrl: string;
    title: string;
    lessonId?: string;
}

interface PlaylistItem {
    id: string;
    video_id: string;
    title: string;
    position: number;
}

export function VideoModal({ isOpen, onClose, videoUrl, title, lessonId }: VideoModalProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [playlistItems, setPlaylistItems] = useState<PlaylistItem[]>([]);
    const [activeVideoId, setActiveVideoId] = useState("");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar state

    useEffect(() => {
        if (isOpen && (lessonId || videoUrl.includes("list="))) {
            const fetchPlaylistItems = async () => {
                // 1. Try fetching from Supabase first
                if (lessonId) {
                    const { data } = await supabase
                        .from('playlist_items')
                        .select('*')
                        .eq('content_id', lessonId)
                        .order('position', { ascending: true });

                    if (data && data.length > 0) {
                        setPlaylistItems(data);
                        setActiveVideoId(data[0].video_id);
                        return;
                    }
                }

                // 2. If not in DB, fetch from YouTube API via our proxy
                const listId = getYouTubePlaylistId(videoUrl);
                if (listId) {
                    try {
                        const response = await fetch(`/api/youtube/playlist?playlistId=${listId}`);
                        const data = await response.json();
                        if (Array.isArray(data)) {
                            const validItems = (data as PlaylistItem[]).filter(item =>
                                item.title !== "Private video" &&
                                item.title !== "Deleted video"
                            );
                            setPlaylistItems(validItems);

                            if (validItems.length > 0) {
                                // Extract video ID if it's a specific video link with playlist
                                let initialVideoId = validItems[0].video_id;
                                try {
                                    const urlObj = new URL(videoUrl);
                                    const v = urlObj.searchParams.get('v');
                                    if (v) initialVideoId = v;
                                } catch {
                                    // Not a full URL or missing v param
                                }

                                setActiveVideoId(initialVideoId);
                            }
                        }
                    } catch {
                        console.error("Failed to fetch playlist from YouTube");
                    }
                }
            };
            fetchPlaylistItems();
        }
    }, [isOpen, lessonId, videoUrl]);

    const handleClose = useCallback(() => {
        setPlaylistItems([]);
        setActiveVideoId("");
        setIsLoading(true);
        setIsSidebarOpen(false);
        onClose();
    }, [onClose]);

    const embedUrl = isOpen && videoUrl ? getEmbedUrl(videoUrl, activeVideoId) : "";

    // Close on escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") handleClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [handleClose]);

    const activeItem = playlistItems.find(i => i.video_id === activeVideoId);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-8 bg-black/90 backdrop-blur-2xl"
                    onClick={handleClose}
                >
                    {/* Ambient Glow - Hidden on very small screens to save resources */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] bg-secondary/10 blur-[150px] pointer-events-none hidden md:block" />

                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        className="relative w-full max-w-6xl md:bg-card md:border md:border-primary/20 md:rounded-[2.5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)] flex flex-col lg:flex-row h-full md:h-[85vh] lg:h-auto lg:aspect-[16/9]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Main Player Area */}
                        <div className="flex-1 flex flex-col min-w-0 bg-black md:bg-transparent">
                            {/* Header */}
                            <div className="p-4 md:p-6 md:px-8 flex items-center justify-between border-b border-primary/10 bg-card/50 backdrop-blur-md">
                                <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                                    <div className="h-2 w-2 bg-secondary rounded-full animate-pulse shrink-0" />
                                    <h3 className="text-primary font-bold text-sm md:text-lg line-clamp-1">
                                        {activeItem?.title || title}
                                    </h3>
                                </div>
                                <div className="flex items-center gap-2">
                                    {playlistItems.length > 0 && (
                                        <button
                                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                            className="lg:hidden p-2 hover:bg-primary/5 text-secondary rounded-xl transition-all border border-secondary/20"
                                            title="قائمة الدروس"
                                        >
                                            <ListVideo className="h-5 w-5" />
                                        </button>
                                    )}
                                    <button
                                        onClick={handleClose}
                                        className="p-2 hover:bg-primary/5 text-primary/60 hover:text-secondary rounded-xl transition-all"
                                    >
                                        <X className="h-6 w-6" />
                                    </button>
                                </div>
                            </div>

                            {/* Player */}
                            <div className="relative flex-1 bg-black group overflow-hidden flex items-center justify-center">
                                {isLoading && (
                                    <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/60">
                                        <div className="text-center p-4">
                                            <Loader2 className="h-10 w-10 animate-spin text-secondary mx-auto mb-4" />
                                            <p className="text-muted-foreground text-sm font-serif">جاري تجهيز الدرس الشريف...</p>
                                        </div>
                                    </div>
                                )}

                                {embedUrl && (
                                    <iframe
                                        src={embedUrl}
                                        className="w-full h-full border-0 absolute inset-0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        onLoad={() => setIsLoading(false)}
                                    ></iframe>
                                )}
                            </div>

                            {/* Branding Footer */}
                            <div className="px-8 py-4 hidden lg:flex items-center justify-between bg-black/10 border-t border-primary/5">
                                <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">المحتوى العلمي - الشيخ يوسف أبو غزالة</span>
                                <div className="flex gap-1">
                                    <div className="h-1 w-4 bg-secondary/30 rounded-full" />
                                    <div className="h-1 w-1 bg-secondary/30 rounded-full" />
                                </div>
                            </div>
                        </div>

                        {/* Playlist Sidebar */}
                        <motion.div
                            className={cn(
                                "w-full lg:w-[350px] bg-card lg:bg-primary/[0.02] border-t lg:border-t-0 lg:border-l border-primary/10 flex flex-col overflow-hidden transition-all duration-300 ease-in-out",
                                playlistItems.length === 0 ? "hidden" : "flex",
                                "fixed lg:relative inset-x-0 bottom-0 z-50 lg:z-auto h-[60vh] lg:h-auto rounded-t-3xl lg:rounded-none",
                                !isSidebarOpen && "translate-y-full lg:translate-y-0 hidden lg:flex"
                            )}
                        >
                            <div className="p-4 md:p-6 border-b border-primary/10 flex items-center justify-between bg-card/80 backdrop-blur-md">
                                <span className="text-xs md:text-sm font-bold text-secondary uppercase tracking-widest">دروس السلسلة ({playlistItems.length})</span>
                                <button
                                    onClick={() => setIsSidebarOpen(false)}
                                    className="lg:hidden p-2 hover:bg-primary/5 text-primary/60 rounded-xl"
                                >
                                    <ChevronDown className="h-6 w-6" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar bg-card/40">
                                <div className="space-y-2 pb-20 lg:pb-0">
                                    {playlistItems.map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => {
                                                setActiveVideoId(item.video_id);
                                                setIsLoading(true);
                                                if (window.innerWidth < 1024) setIsSidebarOpen(false);
                                            }}
                                            className={cn(
                                                "w-full p-3 md:p-4 rounded-2xl text-right transition-all flex items-start gap-3 md:gap-4 group/item",
                                                activeVideoId === item.video_id
                                                    ? "bg-secondary text-secondary-foreground shadow-lg shadow-secondary/20"
                                                    : "hover:bg-primary/5 text-primary/70 hover:text-primary"
                                            )}
                                        >
                                            <div className={cn(
                                                "h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0",
                                                activeVideoId === item.video_id ? "bg-white/20" : "bg-primary/5"
                                            )}>
                                                {item.position}
                                            </div>
                                            <span className="text-xs md:text-sm font-bold leading-relaxed line-clamp-2">
                                                {item.title}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Mobile Overlay for Sidebar */}
                        {isSidebarOpen && (
                            <div
                                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[45] lg:hidden"
                                onClick={() => setIsSidebarOpen(false)}
                            />
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
