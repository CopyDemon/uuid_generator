import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "mybittools",
  description: "A website focused on developer's tools",
  icons: {
    icon: [
      { url: '/siteicon/favicon.ico', type: 'image/x-icon' },
      { url: '/siteicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/siteicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/siteicon/apple-touch-icon.png',
  },
  manifest: '/siteicon/site.webmanifest'
};

export const viewport: Viewport = {
  themeColor: '#fff',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
