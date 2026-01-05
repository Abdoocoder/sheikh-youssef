import type { Metadata } from "next";
import { Amiri, Noto_Sans_Arabic } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { cn } from "@/lib/utils";

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
  title: "الشيخ يوسف حازم أبو غزالة",
  description: "الموقع الرسمي للشيخ يوسف حازم أبو غزالة - دروس، فتاوى، ومقالات.",
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
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
