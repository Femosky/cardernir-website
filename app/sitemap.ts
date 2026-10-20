import type { MetadataRoute } from 'next';
import { BRAND_IMAGE_URL, SITE_URL, SOCIAL_IMAGE_URL } from '@/lib/siteMetadata';
import { LOCALES, homePath } from '@/lib/i18n/locales';

export default function sitemap(): MetadataRoute.Sitemap {
    const languages: Record<string, string> = { 'x-default': SITE_URL + '/' };
    for (const l of LOCALES) languages[l.hreflang] = SITE_URL + homePath(l.code);
    const homes: MetadataRoute.Sitemap = LOCALES.map((l) => ({
        url: SITE_URL + homePath(l.code),
        changeFrequency: 'monthly',
        priority: l.code === 'en' ? 1 : 0.8,
        alternates: { languages },
        images: l.code === 'en' ? [BRAND_IMAGE_URL, SOCIAL_IMAGE_URL] : undefined,
    }));
    const pages: MetadataRoute.Sitemap = [
        { url: `${SITE_URL}/support`, changeFrequency: 'yearly', priority: 0.6 },
        { url: `${SITE_URL}/privacy`, changeFrequency: 'yearly', priority: 0.3 },
        { url: `${SITE_URL}/terms`, changeFrequency: 'yearly', priority: 0.3 },
    ];
    return [...homes, ...pages];
}
