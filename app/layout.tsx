import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import './site.css';
import { Analytics } from '@vercel/analytics/next';
import { ThemeProvider } from '@/components/theme-provider';
import { SiteMotion } from '@/components/SiteMotion';
import { APP_STORE_ID, SITE_NAME, SITE_URL } from '@/lib/siteMetadata';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    applicationName: SITE_NAME,
    referrer: 'strict-origin-when-cross-origin',
    manifest: '/manifest.webmanifest',
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    category: 'education',
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
    itunes: { appId: APP_STORE_ID },
    appleWebApp: { capable: true, title: SITE_NAME, statusBarStyle: 'default' },
    formatDetection: { address: false, email: false, telephone: false },
};

export const viewport: Viewport = {
    colorScheme: 'light dark',
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#fff8ef' },
        { media: '(prefers-color-scheme: dark)', color: '#121212' },
    ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" suppressHydrationWarning className={`${inter.variable} h-full antialiased`}>
            <body className="min-h-full flex flex-col">
                <SiteMotion />
                <ThemeProvider>
                    {children}
                    <Analytics />
                </ThemeProvider>
            </body>
        </html>
    );
}
