"use client";

import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react';

interface PlaylistItem {
    id: string;
    title: string;
    url: string;
    coverImage: string | null;
}

interface AudioPlayerState {
    currentTrack: PlaylistItem | null;
    playlist: PlaylistItem[];
    isPlaying: boolean;
    currentTime: number;
    duration: number;
    volume: number;
    isMinimized: boolean;
}

interface AudioPlayerContextType extends AudioPlayerState {
    play: (track: PlaylistItem, playlist?: PlaylistItem[]) => void;
    pause: () => void;
    resume: () => void;
    next: () => void;
    previous: () => void;
    seek: (time: number) => void;
    setVolume: (volume: number) => void;
    toggleMinimize: () => void;
    stop: () => void;
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined);

export function AudioPlayerProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<AudioPlayerState>(() => {
        // Try to load saved state from localStorage on initial render
        if (typeof window !== 'undefined') {
            const savedState = localStorage.getItem('audioPlayerState');
            if (savedState) {
                try {
                    const parsed = JSON.parse(savedState);
                    return {
                        currentTrack: parsed.currentTrack || null,
                        playlist: parsed.playlist || [],
                        isPlaying: false, // Never auto-play on load
                        currentTime: 0,
                        duration: 0,
                        volume: parsed.volume || 1,
                        isMinimized: parsed.isMinimized || false,
                    };
                } catch (e) {
                    console.error('Failed to load saved audio state', e);
                }
            }
        }

        // Default state
        return {
            currentTrack: null,
            playlist: [],
            isPlaying: false,
            currentTime: 0,
            duration: 0,
            volume: 1,
            isMinimized: false,
        };
    });

    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Define play function and other actions using useCallback
    const play = useCallback((track: PlaylistItem, playlist?: PlaylistItem[]) => {
        if (!audioRef.current) return;

        const audio = audioRef.current;

        // If it's a new track or the track URL has changed
        if (track.id !== state.currentTrack?.id || audio.src !== track.url) {
            audio.src = track.url;
            setState(prev => ({
                ...prev,
                currentTrack: track,
                playlist: playlist || [track],
                isPlaying: true,
                currentTime: 0,
            }));
        }

        audio.play().catch(err => {
            console.error('Failed to play audio:', err);
            setState(prev => ({ ...prev, isPlaying: false }));
        });

        setState(prev => ({ ...prev, isPlaying: true }));
    }, [state.currentTrack]);

    // Initialize audio element and attach event listeners
    useEffect(() => {
        audioRef.current = new Audio();
        audioRef.current.volume = state.volume;

        const audio = audioRef.current;

        const handleTimeUpdate = () => {
            setState(prev => ({ ...prev, currentTime: audio.currentTime }));
        };

        const handleDurationChange = () => {
            setState(prev => ({ ...prev, duration: audio.duration }));
        };

        const handleEnded = () => {
            // Auto-play next track if available
            const currentIndex = state.playlist.findIndex(t => t.id === state.currentTrack?.id);
            if (currentIndex !== -1 && currentIndex < state.playlist.length - 1) {
                play(state.playlist[currentIndex + 1]);
            } else {
                setState(prev => ({ ...prev, isPlaying: false }));
            }
        };

        const handleError = () => {
            console.error('Audio playback error');
            setState(prev => ({ ...prev, isPlaying: false }));
        };

        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('durationchange', handleDurationChange);
        audio.addEventListener('ended', handleEnded);
        audio.addEventListener('error', handleError);

        // Restore audio source if there was a saved track
        if (state.currentTrack) {
            audio.src = state.currentTrack.url;
        }

        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('durationchange', handleDurationChange);
            audio.removeEventListener('ended', handleEnded);
            audio.removeEventListener('error', handleError);
            audio.pause();
        };
    }, [play, state.currentTrack, state.playlist, state.volume]);

    // Save state to localStorage
    useEffect(() => {
        if (state.currentTrack) {
            localStorage.setItem('audioPlayerState', JSON.stringify({
                currentTrack: state.currentTrack,
                playlist: state.playlist,
                currentTime: state.currentTime,
                volume: state.volume,
                isMinimized: state.isMinimized,
            }));
        }
    }, [state.currentTrack, state.playlist, state.currentTime, state.volume, state.isMinimized]);


    const pause = useCallback(() => {
        if (!audioRef.current) return;
        audioRef.current.pause();
        setState(prev => ({ ...prev, isPlaying: false }));
    }, []);

    const resume = useCallback(() => {
        if (!audioRef.current || !state.currentTrack) return;
        audioRef.current.play().catch(err => {
            console.error('Failed to resume audio:', err);
        });
        setState(prev => ({ ...prev, isPlaying: true }));
    }, [state.currentTrack]);

    const next = useCallback(() => {
        const currentIndex = state.playlist.findIndex(t => t.id === state.currentTrack?.id);
        if (currentIndex !== -1 && currentIndex < state.playlist.length - 1) {
            play(state.playlist[currentIndex + 1]);
        }
    }, [state.playlist, state.currentTrack, play]);

    const previous = useCallback(() => {
        const currentIndex = state.playlist.findIndex(t => t.id === state.currentTrack?.id);
        if (currentIndex > 0) {
            play(state.playlist[currentIndex - 1]);
        }
    }, [state.playlist, state.currentTrack, play]);

    const seek = useCallback((time: number) => {
        if (!audioRef.current) return;
        audioRef.current.currentTime = time;
        setState(prev => ({ ...prev, currentTime: time }));
    }, []);

    const setVolume = useCallback((volume: number) => {
        if (!audioRef.current) return;
        const clampedVolume = Math.max(0, Math.min(1, volume));
        audioRef.current.volume = clampedVolume;
        setState(prev => ({ ...prev, volume: clampedVolume }));
    }, []);

    const toggleMinimize = useCallback(() => {
        setState(prev => ({ ...prev, isMinimized: !prev.isMinimized }));
    }, []);

    const stop = useCallback(() => {
        if (!audioRef.current) return;
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setState(prev => ({
            ...prev,
            currentTrack: null,
            playlist: [],
            isPlaying: false,
            currentTime: 0,
            duration: 0,
        }));
        localStorage.removeItem('audioPlayerState');
    }, []);

    const value: AudioPlayerContextType = {
        ...state,
        play,
        pause,
        resume,
        next,
        previous,
        seek,
        setVolume,
        toggleMinimize,
        stop,
    };

    return (
        <AudioPlayerContext.Provider value={value}>
            {children}
        </AudioPlayerContext.Provider>
    );
}

export function useAudioPlayer() {
    const context = useContext(AudioPlayerContext);
    if (context === undefined) {
        throw new Error('useAudioPlayer must be used within an AudioPlayerProvider');
    }
    return context;
}
