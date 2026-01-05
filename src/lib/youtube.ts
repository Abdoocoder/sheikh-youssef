/**
 * Robust YouTube URL parsing utility
 */

export function getYouTubeId(url: string): string | null {
    if (!url) return null;

    // Handle youtu.be/ID
    if (url.includes('youtu.be/')) {
        return url.split('youtu.be/')[1].split(/[?#&]/)[0];
    }

    // Handle youtube.com/watch?v=ID
    const videoParam = new URL(url).searchParams.get('v');
    if (videoParam) return videoParam;

    // Handle embed/ID
    if (url.includes('/embed/')) {
        return url.split('/embed/')[1].split(/[?#&]/)[0];
    }

    return null;
}

export function getYouTubePlaylistId(url: string): string | null {
    if (!url) return null;

    try {
        const urlObj = new URL(url);
        return urlObj.searchParams.get('list');
    } catch {
        // Fallback for malformed URLs
        if (url.includes('list=')) {
            return url.split('list=')[1].split(/[?#&]/)[0];
        }
    }

    return null;
}

export function getEmbedUrl(url: string, activeId?: string): string {
    const videoId = activeId || getYouTubeId(url);
    const playlistId = getYouTubePlaylistId(url);

    // If we have a specific video ID, use it with autoplay and modest branding
    if (videoId) {
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`;
    }

    // If we only have a playlist ID
    if (playlistId) {
        return `https://www.youtube.com/embed/videoseries?list=${playlistId}&autoplay=1&modestbranding=1&rel=0`;
    }

    return url; // Fallback
}
