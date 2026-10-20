import type { Metadata } from 'next';
import { Header } from '@/layouts/Header';
import { Footer } from '@/layouts/Footer';
import { en } from '@/lib/i18n/dictionaries/en';
import { homeMetadata } from '@/lib/siteMetadata';

export const metadata: Metadata = homeMetadata('en', en);

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header locale="en" t={en} />
            <div className="flex-1">{children}</div>
            <Footer locale="en" t={en} />
        </>
    );
}
