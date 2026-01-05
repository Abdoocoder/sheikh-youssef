import { NextResponse } from 'next/server';

interface YouTubePlaylistItem {
    id: string;
    snippet: {
        title: string;
        resourceId: {
            videoId: string;
        };
    };
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const playlistId = searchParams.get('playlistId');
    const apiKey = process.env.YOUTUBE_API_KEY;

    if (!playlistId) {
        return NextResponse.json({ error: 'Playlist ID is required' }, { status: 400 });
    }

    if (!apiKey) {
        console.error('YOUTUBE_API_KEY is not set in environment variables');
        return NextResponse.json({ error: 'YouTube API configuration error' }, { status: 500 });
    }

    try {
        const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${apiKey}`;
        const response = await fetch(url, {
            headers: {
                'Referer': request.headers.get('referer') || 'http://localhost:3000'
            }
        });
        const data = await response.json();

        if (data.error) {
            return NextResponse.json({ error: data.error.message }, { status: data.error.code });
        }

        const items = data.items.map((item: YouTubePlaylistItem, index: number) => ({
            id: item.id,
            title: item.snippet.title,
            video_id: item.snippet.resourceId.videoId,
            position: index + 1
        }));

        return NextResponse.json(items);
    } catch {
        return NextResponse.json({ error: 'Failed to fetch playlist' }, { status: 500 });
    }
}
