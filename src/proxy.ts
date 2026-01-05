import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define which routes are admin-only
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
// Define public routes that should redirect to admin if the user is an admin
const isPublicRoute = createRouteMatcher(["/"]);

export const proxy = clerkMiddleware(async (auth, req) => {
    const session = await auth();
    const claims = session.sessionClaims;
    const role = (claims?.metadata as { role?: string })?.role;

    // 1. Redirect admins from home page to admin dashboard
    if (isPublicRoute(req) && role === "admin") {
        const url = new URL("/admin/lessons", req.url);
        return NextResponse.redirect(url);
    }

    // 2. Protect admin routes from non-admins
    if (isAdminRoute(req)) {
        // Check if user is signed in
        if (!session.userId) {
            return (await auth()).redirectToSignIn();
        }

        if (role !== "admin") {
            // Redirect to home if not admin
            const url = new URL("/", req.url);
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
