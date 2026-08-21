import type { NextConfig } from 'next';

const cachedBrandAssets = [
    '/cardernir-preview.png',
    '/cardernirlogo.jpeg',
    '/favicon.ico',
    '/icon.png',
    '/apple-icon.png',
    '/web-app-manifest-192x192.png',
    '/web-app-manifest-512x512.png',
];

const sharedCacheHeaders = [
    {
        key: 'Cache-Control',
        value: 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=2592000',
    },
];

const nextConfig: NextConfig = {
    async headers() {
        return [
            ...cachedBrandAssets.map((source) => ({ source, headers: sharedCacheHeaders })),
            {
                source: '/cardernir-hero-video-web.mp4',
                headers: sharedCacheHeaders,
            },
            {
                source: '/cardernir-hero-video-poster.webp',
                headers: sharedCacheHeaders,
            },
        ];
    },
};

export default nextConfig;
