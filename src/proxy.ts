import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define which routes are admin-only
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isDebugRoute = createRouteMatcher(["/admin/debug(.*)"]);

export const proxy = clerkMiddleware(async (auth, req) => {
    // If the route is an admin route
    if (isAdminRoute(req)) {
        // Exempt debug route from redirection so user can troubleshoot
        if (isDebugRoute(req)) {
            return;
        }

        const session = await auth();

        // 1. Check if user is signed in
        if (!session.userId) {
            return (await auth()).redirectToSignIn();
        }

        // 2. Check for 'admin' role in publicMetadata
        const claims = session.sessionClaims;
        const role = (claims?.metadata as { role?: string })?.role;

        if (role !== "admin") {
            // Redirect to debug page if they are logged in but not admin
            // This helps them see why they are not authorized
            const url = new URL("/admin/debug", req.url);
            return NextResponse.redirect(url);
        }
    }
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};
