"use client";

import { useAudioPlayer } from '@/lib/AudioPlayerContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, ChevronDown, ChevronUp, X, ListMusic } from 'lucide-react';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export function PersistentPlayer() {
    const {
        currentTrack,
        playlist,
        isPlaying,
        currentTime,
        duration,
        volume,
        isMinimized,
        play,
        pause,
        resume,
        next,
        previous,
        seek,
        setVolume,
        toggleMinimize,
        stop,
    } = useAudioPlayer();

    const [isDragging, setIsDragging] = useState(false);
    const [showVolumeSlider, setShowVolumeSlider] = useState(false);
    const [showPlaylist, setShowPlaylist] = useState(false);
    const progressBarRef = useRef<HTMLDivElement>(null);

    // Don't render if no track is loaded
    if (!currentTrack) return null;

    const formatTime = (seconds: number) => {
        if (isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!progressBarRef.current) return;
        const rect = progressBarRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = x / rect.width;
        seek(percentage * duration);
    };

    const handleProgressDrag = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isDragging || !progressBarRef.current) return;
        const rect = progressBarRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
        const percentage = x / rect.width;
        seek(percentage * duration);
    };

    const currentIndex = playlist.findIndex(t => t.id === currentTrack.id);
    const hasNext = currentIndex < playlist.length - 1;
    const hasPrevious = currentIndex > 0;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                className={cn(
                    "fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-2xl border-t border-primary/20 shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.3)] transition-all duration-300",
                    isMinimized ? "h-16" : "h-auto"
                )}
            >
                {/* Playlist Dropdown */}
                <AnimatePresence>
                    {showPlaylist && playlist.length > 1 && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="border-b border-primary/10 bg-card/80 backdrop-blur-md overflow-hidden"
                        >
                            <div className="max-h-64 overflow-y-auto custom-scrollbar p-4">
                                <div className="space-y-2">
                                    {playlist.map((track, index) => (
                                        <button
                                            key={track.id}
                                            onClick={() => play(track, playlist)}
                                            className={cn(
                                                "w-full p-3 rounded-xl text-right transition-all flex items-center gap-3 group",
                                                currentTrack.id === track.id
                                                    ? "bg-secondary text-secondary-foreground shadow-md"
                                                    : "hover:bg-primary/5 text-primary/70 hover:text-primary"
                                            )}
                                        >
                                            <div className={cn(
                                                "h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0",
                                                currentTrack.id === track.id ? "bg-white/20" : "bg-primary/5"
                                            )}>
                                                {index + 1}
                                            </div>
                                            <span className="text-sm font-bold line-clamp-1 flex-1">
                                                {track.title}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Main Player */}
                <div className="container mx-auto px-4">
                    {!isMinimized && (
                        <div className="py-4">
                            {/* Progress Bar */}
                            <div className="mb-4">
                                <div
                                    ref={progressBarRef}
                                    className="relative h-1.5 bg-primary/10 rounded-full cursor-pointer group"
                                    onClick={handleProgressClick}
                                    onMouseDown={() => setIsDragging(true)}
                                    onMouseUp={() => setIsDragging(false)}
                                    onMouseMove={handleProgressDrag}
                                    onMouseLeave={() => setIsDragging(false)}
                                >
                                    <div
                                        className="absolute top-0 right-0 h-full bg-gradient-to-l from-secondary to-secondary/70 rounded-full transition-all"
                                        style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
                                    />
                                    <div
                                        className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-secondary rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                        style={{ right: `calc(${(currentTime / duration) * 100 || 0}% - 8px)` }}
                                    />
                                </div>
                                <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground font-medium">
                                    <span>{formatTime(duration - currentTime)}</span>
                                    <span>{formatTime(currentTime)}</span>
                                </div>
                            </div>

                            {/* Controls & Info */}
                            <div className="flex items-center gap-4">
                                {/* Track Info */}
                                <div className="flex items-center gap-4 flex-1 min-w-0">
                                    {currentTrack.coverImage && (
                                        <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 shadow-lg">
                                            <Image
                                                src={currentTrack.coverImage}
                                                alt={currentTrack.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    )}
                                    <div className="flex-1 min-w-0 text-right">
                                        <h4 className="font-bold text-primary line-clamp-1 text-sm md:text-base">
                                            {currentTrack.title}
                                        </h4>
                                        <p className="text-xs text-muted-foreground mt-0.5">
                                            الشيخ يوسف أبو غزالة
                                        </p>
                                    </div>
                                </div>

                                {/* Playback Controls */}
                                <div className="flex items-center gap-2 md:gap-3">
                                    <button
                                        onClick={previous}
                                        disabled={!hasPrevious}
                                        className="p-2 hover:bg-primary/5 rounded-full transition-all disabled:opacity-30 disabled:cursor-not-allowed text-primary"
                                        title="السابق"
                                    >
                                        <SkipForward className="h-5 w-5" />
                                    </button>

                                    <button
                                        onClick={isPlaying ? pause : resume}
                                        className="p-3 md:p-4 bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full transition-all shadow-lg hover:shadow-xl hover:scale-105"
                                        title={isPlaying ? "إيقاف" : "تشغيل"}
                                    >
                                        {isPlaying ? (
                                            <Pause className="h-5 w-5 md:h-6 md:w-6 fill-current" />
                                        ) : (
                                            <Play className="h-5 w-5 md:h-6 md:w-6 fill-current" />
                                        )}
                                    </button>

                                    <button
                                        onClick={next}
                                        disabled={!hasNext}
                                        className="p-2 hover:bg-primary/5 rounded-full transition-all disabled:opacity-30 disabled:cursor-not-allowed text-primary"
                                        title="التالي"
                                    >
                                        <SkipBack className="h-5 w-5" />
                                    </button>
                                </div>

                                {/* Volume & Actions */}
                                <div className="hidden md:flex items-center gap-2">
                                    {/* Volume Control */}
                                    <div className="relative">
                                        <button
                                            onClick={() => setShowVolumeSlider(!showVolumeSlider)}
                                            className="p-2 hover:bg-primary/5 rounded-full transition-all text-primary"
                                            title="مستوى الصوت"
                                        >
                                            {volume === 0 ? (
                                                <VolumeX className="h-5 w-5" />
                                            ) : (
                                                <Volume2 className="h-5 w-5" />
                                            )}
                                        </button>
                                        <AnimatePresence>
                                            {showVolumeSlider && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 10 }}
                                                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-3 bg-card border border-primary/20 rounded-xl shadow-xl"
                                                >
                                                    <input
                                                        type="range"
                                                        min="0"
                                                        max="100"
                                                        value={volume * 100}
                                                        onChange={(e) => setVolume(parseInt(e.target.value) / 100)}
                                                        className="w-24 h-1 accent-secondary [writing-mode:vertical-lr] rotate-180"
                                                    />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {/* Playlist Toggle */}
                                    {playlist.length > 1 && (
                                        <button
                                            onClick={() => setShowPlaylist(!showPlaylist)}
                                            className={cn(
                                                "p-2 rounded-full transition-all",
                                                showPlaylist ? "bg-secondary text-secondary-foreground" : "hover:bg-primary/5 text-primary"
                                            )}
                                            title="قائمة التشغيل"
                                        >
                                            <ListMusic className="h-5 w-5" />
                                        </button>
                                    )}

                                    {/* Close */}
                                    <button
                                        onClick={stop}
                                        className="p-2 hover:bg-primary/5 rounded-full transition-all text-primary/60 hover:text-destructive"
                                        title="إغلاق"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>

                                {/* Minimize Toggle */}
                                <button
                                    onClick={toggleMinimize}
                                    className="p-2 hover:bg-primary/5 rounded-full transition-all text-primary md:hidden"
                                    title={isMinimized ? "توسيع" : "تصغير"}
                                >
                                    {isMinimized ? (
                                        <ChevronUp className="h-5 w-5" />
                                    ) : (
                                        <ChevronDown className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Minimized View */}
                    {isMinimized && (
                        <div className="h-16 flex items-center gap-3">
                            {currentTrack.coverImage && (
                                <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0">
                                    <Image
                                        src={currentTrack.coverImage}
                                        alt={currentTrack.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )}
                            <div className="flex-1 min-w-0 text-right">
                                <h4 className="font-bold text-primary line-clamp-1 text-sm">
                                    {currentTrack.title}
                                </h4>
                            </div>
                            <button
                                onClick={isPlaying ? pause : resume}
                                className="p-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full transition-all"
                            >
                                {isPlaying ? (
                                    <Pause className="h-4 w-4 fill-current" />
                                ) : (
                                    <Play className="h-4 w-4 fill-current" />
                                )}
                            </button>
                            <button
                                onClick={toggleMinimize}
                                className="p-2 hover:bg-primary/5 rounded-full transition-all text-primary"
                            >
                                <ChevronUp className="h-5 w-5" />
                            </button>
                        </div>
                    )}
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
