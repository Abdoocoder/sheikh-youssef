import type { Metadata } from "next";
import { Amiri, Noto_Sans_Arabic } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { AudioPlayerProvider } from "@/lib/AudioPlayerContext";
import { PersistentPlayer } from "@/components/PersistentPlayer";

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic"],
  weight: ["400", "700"],
});

const notoSansArabic = Noto_Sans_Arabic({
  variable: "--font-noto-sans-arabic",
  subsets: ["arabic"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "موقع الشيخ يوسف حازم أبو غزالة",
    template: "%s | موقع الشيخ يوسف أبو غزالة"
  },
  description: "الموقع التعليمي للشيخ يوسف حازم أبو غزالة - دروس، فتاوى، ومقالات. بإدارة وإشراف أحد طلاب الشيخ يوسف ابو غزالة",
  keywords: ["الشيخ يوسف أبو غزالة", "فقه حنفي", "تزكية", "طلبة العلم", "فتاوى شرعية"],
  authors: [{ name: "Sheikh Youssef Abu Ghazaleh" }],
  openGraph: {
    title: "الشيخ يوسف حازم أبو غزالة",
    description: "الموقع التعليمي والشرعي لفضيلة الشيخ يوسف حازم أبو غزالة",
    url: "https://sheikh-youssef.com", // Adjust if domain is known
    siteName: "الشيخ يوسف أبو غزالة",
    locale: "ar_SA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "الشيخ يوسف حازم أبو غزالة",
    description: "الموقع التعليمي والشرعي لفضيلة الشيخ يوسف حازم أبو غزالة",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="ar" dir="rtl">
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            amiri.variable,
            notoSansArabic.variable
          )}
        >
          <AudioPlayerProvider>
            {children}
            <PersistentPlayer />
          </AudioPlayerProvider>
          <Analytics />
          <SpeedInsights />
        </body>
      </html>
    </ClerkProvider>

  );
}
