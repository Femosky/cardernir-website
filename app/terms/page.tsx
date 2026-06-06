import type { Metadata } from 'next';
import { termsOfService } from '@/content/legal';
import { LegalPage } from '@/components/LegalPage';

export const metadata: Metadata = {
    title: 'Terms of Service — Cardernir',
    description: 'Our terms of service outline the rules and guidelines for using the Cardernir app.',
};

export default function Terms() {
    return <LegalPage document={termsOfService} />;
}
