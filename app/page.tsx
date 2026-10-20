import { Lesson } from '@/components/lesson/Lesson';
import {
    APP_STORE_URL,
    BRAND_IMAGE_URL,
    SITE_DESCRIPTION,
    SITE_NAME,
    SITE_TITLE,
    SITE_URL,
    SOCIAL_IMAGE_URL,
} from '@/lib/siteMetadata';
import './lesson.css';

const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'ImageObject',
            '@id': `${SITE_URL}/#brand-image`,
            url: BRAND_IMAGE_URL,
            contentUrl: BRAND_IMAGE_URL,
            width: 1024,
            height: 1024,
            caption: 'Cardernir elephant logo',
        },
        {
            '@type': 'Organization',
            '@id': `${SITE_URL}/#organization`,
            name: SITE_NAME,
            url: SITE_URL,
            logo: { '@id': `${SITE_URL}/#brand-image` },
            image: { '@id': `${SITE_URL}/#brand-image` },
            email: 'support@cardernir.app',
        },
        {
            '@type': 'WebSite',
            '@id': `${SITE_URL}/#website`,
            url: SITE_URL,
            name: SITE_NAME,
            alternateName: ['Cardernir App', 'cardernir.app'],
            description: SITE_DESCRIPTION,
            inLanguage: 'en-CA',
            publisher: { '@id': `${SITE_URL}/#organization` },
        },
        {
            '@type': 'WebPage',
            '@id': `${SITE_URL}/#webpage`,
            url: SITE_URL,
            name: SITE_TITLE,
            description: SITE_DESCRIPTION,
            isPartOf: { '@id': `${SITE_URL}/#website` },
            about: { '@id': `${SITE_URL}/#app` },
            primaryImageOfPage: { '@id': `${SITE_URL}/#brand-image` },
            inLanguage: 'en-CA',
        },
        {
            '@type': ['SoftwareApplication', 'MobileApplication'],
            '@id': `${SITE_URL}/#app`,
            name: SITE_NAME,
            description: SITE_DESCRIPTION,
            applicationCategory: 'EducationalApplication',
            operatingSystem: 'iOS',
            url: SITE_URL,
            downloadUrl: APP_STORE_URL,
            installUrl: APP_STORE_URL,
            sameAs: [APP_STORE_URL],
            image: { '@id': `${SITE_URL}/#brand-image` },
            screenshot: SOCIAL_IMAGE_URL,
            publisher: { '@id': `${SITE_URL}/#organization` },
            mainEntityOfPage: { '@id': `${SITE_URL}/#webpage` },
            inLanguage: 'en-CA',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'CAD' },
        },
    ],
};

export default function Home() {
    return (
        <main className="landing landing--lesson">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
            />
            <Lesson />
        </main>
    );
}
