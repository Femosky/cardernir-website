import type { MetadataRoute } from 'next';
import { BRAND_IMAGE_URL, SITE_URL, SOCIAL_IMAGE_URL } from '@/lib/siteMetadata';

const routes = [
    { path: '', changeFrequency: 'monthly', priority: 1 },
    { path: '/support', changeFrequency: 'yearly', priority: 0.6 },
    { path: '/privacy', changeFrequency: 'yearly', priority: 0.3 },
    { path: '/terms', changeFrequency: 'yearly', priority: 0.3 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
    return routes.map(({ path, ...metadata }) => ({
        url: `${SITE_URL}${path}`,
        ...(path === ''
            ? {
                  images: [
                      BRAND_IMAGE_URL,
                      SOCIAL_IMAGE_URL,
                      `${SITE_URL}/hero-image-soft.png`,
                      `${SITE_URL}/cardernir-choose-goal.jpeg`,
                      `${SITE_URL}/cardernir-focused-sessions.jpeg`,
                      `${SITE_URL}/cardernir-review-due.jpeg`,
                  ],
              }
            : {}),
        ...metadata,
    }));
}
