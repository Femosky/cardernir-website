import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/layouts/Header';
import { Footer } from '@/layouts/Footer';
import { Analytics } from '@vercel/analytics/next';
import { ThemeProvider } from '@/components/theme-provider';

const SITE_URL = 'https://www.cardernir.app';
const SITE_DESCRIPTION =
    'Learn and remember vocabulary with ready-made language flashcard decks, focused reviews, and spaced repetition.';

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: 'Cardernir — Language Flashcards & Spaced Repetition',
        template: '%s | Cardernir',
    },
    description: SITE_DESCRIPTION,
    applicationName: 'Cardernir',
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
    authors: [{ name: 'Cardernir', url: SITE_URL }],
    creator: 'Cardernir',
    publisher: 'Cardernir',
    category: 'education',
    openGraph: {
        type: 'website',
        locale: 'en_CA',
        siteName: 'Cardernir',
        title: 'Cardernir — Remember more of the language you learn',
        description: SITE_DESCRIPTION,
        images: [
            {
                url: '/cardernir-preview.png',
                width: 1200,
                height: 630,
                alt: 'Cardernir — French, remembered.',
                type: 'image/png',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Cardernir — Remember more of the language you learn',
        description: SITE_DESCRIPTION,
        images: {
            url: `${SITE_URL}/cardernir-preview.png`,
            alt: 'Cardernir — French, remembered.',
        },
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
        appId: '6772876444',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning className="h-full antialiased">
            <body className="min-h-full flex flex-col">
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
