import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/layouts/Header';
import { Footer } from '@/layouts/Footer';
import { Analytics } from '@vercel/analytics/next';
import { ThemeProvider } from '@/components/theme-provider';
import { SiteMotion } from '@/components/SiteMotion';
import {
    APP_STORE_ID,
    SITE_DESCRIPTION,
    SITE_NAME,
    SITE_TITLE,
    SITE_URL,
    SOCIAL_TITLE,
    sharedOpenGraphImages,
    sharedTwitterImage,
} from '@/lib/siteMetadata';

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
});

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: SITE_TITLE,
        template: '%s | Cardernir',
    },
    description: SITE_DESCRIPTION,
    applicationName: SITE_NAME,
    referrer: 'strict-origin-when-cross-origin',
    manifest: '/manifest.webmanifest',
    alternates: { canonical: '/' },
    keywords: [
        'french flashcards',
        'learn french',
        'french vocabulary',
        'french vocab',
        'anki alternative',
        'language learning',
        'anki flashcards',
        'anki ios',
        'fsrs',
        'fsrs app',
        'fsrs flashcards',
        'cardernir',
        'cardernir flashcards',
        'cardernir app',
        'language flashcards',
        'vocabulary app',
        'spaced repetition',
        'language learning app',
        'learn vocabulary',
        'iPhone flashcard app',
    ],
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    category: 'education',
    openGraph: {
        type: 'website',
        locale: 'en_CA',
        siteName: SITE_NAME,
        title: SOCIAL_TITLE,
        description: SITE_DESCRIPTION,
        url: '/',
        images: sharedOpenGraphImages,
    },
    twitter: {
        card: 'summary_large_image',
        title: SOCIAL_TITLE,
        description: SITE_DESCRIPTION,
        images: [sharedTwitterImage],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
        },
    },
    itunes: {
        appId: APP_STORE_ID,
    },
    pinterest: { richPin: true },
    appleWebApp: {
        capable: true,
        title: SITE_NAME,
        statusBarStyle: 'default',
    },
    formatDetection: {
        address: false,
        email: false,
        telephone: false,
    },
};

export const viewport: Viewport = {
    colorScheme: 'light dark',
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#f5f7fb' },
        { media: '(prefers-color-scheme: dark)', color: '#111827' },
    ],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en-CA" suppressHydrationWarning className={`${inter.variable} h-full antialiased`}>
            <body className="min-h-full flex flex-col">
                <SiteMotion />
                <ThemeProvider>
                    <Header />
                    <div className="flex-1">
                        {children}
                        <Analytics />
                    </div>
                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    );
}
