import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/layouts/Header';
import { Footer } from '@/layouts/Footer';
import { Analytics } from '@vercel/analytics/next';
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
    title: 'Cardernir — Remember more of the language you learn',
    description: 'A focused flashcard app with ready-made language decks and spaced repetition.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
            className="h-full antialiased"
        >
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
