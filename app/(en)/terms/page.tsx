import type { Metadata } from 'next';
import { termsOfService } from '@/content/legal';
import { LegalPage } from '@/components/LegalPage';
import { createPageMetadata } from '@/lib/siteMetadata';

export const metadata: Metadata = createPageMetadata({
    title: 'Terms of Service',
    socialTitle: 'Cardernir Terms of Service',
    description: 'Our terms of service outline the rules and guidelines for using the Cardernir app.',
    path: '/terms',
});

export default function Terms() {
    return <LegalPage document={termsOfService} />;
}
