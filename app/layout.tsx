import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/layouts/Header';
import { Analytics } from '@vercel/analytics/next';
import { ThemeProvider } from '@/components/theme-provider';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Cardernir',
    description: 'Language-learning flashcard app',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-screen antialiased`}>
            <body className="h-full flex flex-col">
                <ThemeProvider>
                    <Header />
                    <main className="flex-1">
                        {children}
                        <Analytics />
                    </main>
                </ThemeProvider>
            </body>
        </html>
    );
}
