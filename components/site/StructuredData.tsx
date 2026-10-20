import { APP_STORE_URL, BRAND_IMAGE_URL, SITE_NAME, SITE_URL, SOCIAL_IMAGE_URL } from '@/lib/siteMetadata';
import { homePath, localeInfo, type LocaleCode } from '@/lib/i18n/locales';
import type { Dictionary } from '@/lib/i18n';

export function StructuredData({ locale, t }: { locale: LocaleCode; t: Dictionary }) {
    const url = `${SITE_URL}${homePath(locale)}`; const lang = localeInfo(locale).hreflang;
    const data = {
        '@context': 'https://schema.org',
        '@graph': [
            { '@type': 'ImageObject', '@id': `${SITE_URL}/#brand-image`, url: BRAND_IMAGE_URL, contentUrl: BRAND_IMAGE_URL, width: 1024, height: 1024, caption: 'Cardernir elephant logo' },
            { '@type': 'Organization', '@id': `${SITE_URL}/#organization`, name: SITE_NAME, url: SITE_URL, logo: { '@id': `${SITE_URL}/#brand-image` }, email: 'support@cardernir.app' },
            { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: SITE_URL, name: SITE_NAME, alternateName: ['Cardernir App', 'cardernir.app'], description: t.meta.description, inLanguage: lang, publisher: { '@id': `${SITE_URL}/#organization` } },
            { '@type': 'WebPage', '@id': `${url}#webpage`, url, name: t.meta.title, description: t.meta.description, isPartOf: { '@id': `${SITE_URL}/#website` }, about: { '@id': `${SITE_URL}/#app` }, inLanguage: lang },
            { '@type': 'FAQPage', '@id': `${url}#faq`, mainEntity: t.faq.items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
            { '@type': ['SoftwareApplication', 'MobileApplication'], '@id': `${SITE_URL}/#app`, name: SITE_NAME, description: t.meta.description, applicationCategory: 'EducationalApplication', operatingSystem: 'iOS', url: SITE_URL, downloadUrl: APP_STORE_URL, installUrl: APP_STORE_URL, sameAs: [APP_STORE_URL], image: { '@id': `${SITE_URL}/#brand-image` }, screenshot: SOCIAL_IMAGE_URL, publisher: { '@id': `${SITE_URL}/#organization` }, offers: { '@type': 'Offer', price: '0', priceCurrency: 'CAD' }, inLanguage: lang },
        ],
    };
    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}
