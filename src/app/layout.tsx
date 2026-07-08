import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AWN Archive | Premium Photography & Creative Agency",
  description:
    "Stories Worth Remembering. Premium photography and creative direction for sports, music, fashion, events, and brands. Based in Massachusetts, available worldwide.",
  keywords: [
    "photography",
    "videography",
    "creative agency",
    "Massachusetts photographer",
    "sports photography",
    "music photography",
    "fashion photography",
    "event photography",
    "branding",
    "AWN Archive",
  ],
  openGraph: {
    title: "AWN Archive | Stories Worth Remembering",
    description:
      "Premium photography and creative direction built around emotion, movement, and moments that deserve to be remembered.",
    url: "https://awnarchive.com",
    siteName: "AWN Archive",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AWN Archive | Stories Worth Remembering",
    description:
      "Premium photography and creative direction built around emotion, movement, and moments that deserve to be remembered.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-[#0A0A0A] text-white antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}
