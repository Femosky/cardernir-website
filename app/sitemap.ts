import type { MetadataRoute } from 'next';

const SITE_URL = 'https://www.cardernir.app';

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: SITE_URL,
            changeFrequency: 'monthly',
            priority: 1,
            images: [`${SITE_URL}/hero-image-soft.png`],
        },
        {
            url: `${SITE_URL}/support`,
            changeFrequency: 'yearly',
            priority: 0.6,
        },
        {
            url: `${SITE_URL}/privacy`,
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: `${SITE_URL}/terms`,
            changeFrequency: 'yearly',
            priority: 0.3,
        },
    ];
}
