import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";
import GameStoreProvider from "./StoreProvider";
import { AntdRegistry } from '@ant-design/nextjs-registry';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mini Chess 5x5 - Quick Strategic Chess Games",
  description: "Experience chess in a compact 5x5 format. Quick games, strategic depth. Play with friends, spectate matches, or practice your skills in this modern chess variant.",
  keywords: ["chess", "mini chess", "5x5 chess", "online chess", "multiplayer chess", "chess game"],
  authors: [{ name: "Mini Chess Team" }],
  creator: "Mini Chess",
  publisher: "Mini Chess",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    title: "Mini Chess 5x5 - Quick Strategic Chess Games",
    description: "Experience chess in a compact 5x5 format. Quick games, strategic depth.",
    type: "website",
    locale: "en_US",
    siteName: "Mini Chess",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mini Chess 5x5 - Quick Strategic Chess Games",
    description: "Experience chess in a compact 5x5 format. Quick games, strategic depth.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#0a0a0a" />
        <meta name="color-scheme" content="dark" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} font-sans antialiased bg-background text-foreground`}
      >
        <GameStoreProvider>
          <AntdRegistry>
            <div className="min-h-screen">
              {children}
            </div>
          </AntdRegistry>
        </GameStoreProvider>
      </body>
    </html>
  );
}
