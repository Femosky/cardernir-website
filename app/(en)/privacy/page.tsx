import type { Metadata } from 'next';
import { privacyPolicy } from '@/content/legal';
import { LegalPage } from '@/components/LegalPage';
import { createPageMetadata } from '@/lib/siteMetadata';

export const metadata: Metadata = createPageMetadata({
    title: 'Privacy Policy',
    socialTitle: 'Cardernir Privacy Policy',
    description: 'Our privacy policy explains how we collect, use, and protect your personal information.',
    path: '/privacy',
});

export default function Privacy() {
    return <LegalPage document={privacyPolicy} />;
}
