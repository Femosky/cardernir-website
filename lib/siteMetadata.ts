import type { Metadata } from 'next';

export const SITE_URL = 'https://www.cardernir.app';
export const SITE_NAME = 'Cardernir';
export const SITE_TITLE = 'Cardernir | French Flashcards & Spaced Repetition';
export const SITE_DESCRIPTION =
    'Learn and remember French vocabulary with ready-made flashcard decks, focused reviews, and FSRS spaced repetition.';
export const SOCIAL_TITLE = 'Cardernir | French vocabulary that comes back before it fades';
export const APP_STORE_URL = 'https://apps.apple.com/app/cardernir/id6772876444';
export const APP_STORE_ID = '6772876444';

export const SOCIAL_IMAGE_URL = `${SITE_URL}/cardernir-preview.png`;
export const BRAND_IMAGE_URL = `${SITE_URL}/cardernirlogo.jpeg`;

export const sharedOpenGraphImages = [
    {
        url: SOCIAL_IMAGE_URL,
        secureUrl: SOCIAL_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: 'Cardernir — French, remembered.',
        type: 'image/png',
    },
    {
        url: BRAND_IMAGE_URL,
        secureUrl: BRAND_IMAGE_URL,
        width: 1024,
        height: 1024,
        alt: 'Cardernir elephant logo',
        type: 'image/jpeg',
    },
] satisfies NonNullable<NonNullable<Metadata['openGraph']>['images']>;

export const sharedTwitterImage = {
    url: SOCIAL_IMAGE_URL,
    secureUrl: SOCIAL_IMAGE_URL,
    width: 1200,
    height: 630,
    alt: 'Cardernir — French, remembered.',
    type: 'image/png',
};

type PageMetadataOptions = {
    title: string;
    socialTitle: string;
    description: string;
    path: `/${string}`;
};

export function createPageMetadata({
    title,
    socialTitle,
    description,
    path,
}: PageMetadataOptions): Metadata {
    return {
        title,
        description,
        alternates: { canonical: path },
        openGraph: {
            type: 'website',
            locale: 'en_CA',
            siteName: SITE_NAME,
            title: socialTitle,
            description,
            url: path,
            images: sharedOpenGraphImages,
        },
        twitter: {
            card: 'summary_large_image',
            title: socialTitle,
            description,
            images: [sharedTwitterImage],
        },
    };
}
