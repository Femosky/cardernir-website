import type { Metadata } from 'next';
import { termsOfService } from '@/content/legal';
import { LegalPage } from '@/components/LegalPage';

export const metadata: Metadata = {
    title: 'Terms of Service',
    description: 'Our terms of service outline the rules and guidelines for using the Cardernir app.',
    alternates: { canonical: '/terms' },
    openGraph: {
        type: 'website',
        locale: 'en_CA',
        siteName: 'Cardernir',
        title: 'Cardernir Terms of Service',
        description: 'Read the rules and guidelines for using the Cardernir app.',
        url: '/terms',
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

export default function Terms() {
    return <LegalPage document={termsOfService} />;
}
