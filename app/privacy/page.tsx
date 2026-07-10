import type { Metadata } from 'next';
import { privacyPolicy } from '@/content/legal';
import { LegalPage } from '@/components/LegalPage';

export const metadata: Metadata = {
    title: 'Privacy Policy',
    description: 'Our privacy policy explains how we collect, use, and protect your personal information.',
    alternates: { canonical: '/privacy' },
    openGraph: {
        type: 'website',
        locale: 'en_CA',
        siteName: 'Cardernir',
        title: 'Cardernir Privacy Policy',
        description: 'Learn how Cardernir collects, uses, and protects your personal information.',
        url: '/privacy',
        images: [
            {
                url: '/hero-image-soft.png',
                width: 1508,
                height: 1259,
                alt: 'Cardernir language deck and flashcard screens',
                type: 'image/png',
            },
        ],
    },
};

export default function Privacy() {
    return <LegalPage document={privacyPolicy} />;
}
