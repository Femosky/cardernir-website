import type { Metadata } from 'next';
import { privacyPolicy } from '@/content/legal';
import { LegalPage } from '@/components/LegalPage';

export const metadata: Metadata = {
    title: 'Privacy Policy — Cardernir',
    description: 'Our privacy policy explains how we collect, use, and protect your personal information.',
};

export default function Privacy() {
    return <LegalPage document={privacyPolicy} />;
}
