import { NextResponse } from "next/server";

// Change host to the one provided in your DSN
const SENTRY_HOST = "o4510657422426112.ingest.us.sentry.io";
const SENTRY_PROJECT_ID = "4510657426423808";

export async function POST(req: Request) {
    try {
        const envelope = await req.text();
        const pieces = envelope.split("\n");
        const header = JSON.parse(pieces[0]);

        if (!header.dsn) {
            return NextResponse.json({ error: "Missing DSN" }, { status: 400 });
        }

        const dsn = new URL(header.dsn);
        if (dsn.hostname !== SENTRY_HOST) {
            return NextResponse.json({ error: "Invalid DSN" }, { status: 400 });
        }

        if (dsn.pathname?.replace("/", "") !== SENTRY_PROJECT_ID) {
            return NextResponse.json({ error: "Invalid Project ID" }, { status: 400 });
        }

        const sentryUrl = `https://${SENTRY_HOST}/api/${SENTRY_PROJECT_ID}/envelope/`;

        const response = await fetch(sentryUrl, {
            method: "POST",
            body: envelope,
            headers: {
                "Content-Type": "application/x-sentry-envelope",
            },
        });

        return NextResponse.json({ status: "ok" }, { status: response.status });
    } catch (e) {
        console.error("Sentry tunnel error:", e);
        return NextResponse.json({ error: "Tunnel error" }, { status: 500 });
    }
}
