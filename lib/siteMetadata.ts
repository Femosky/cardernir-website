import type { Metadata } from 'next';

export const SITE_URL = 'https://www.cardernir.app';
export const SITE_NAME = 'Cardernir';
export const SITE_TITLE = 'Cardernir 2.0 | French Flashcards with Kips';
export const SITE_DESCRIPTION =
    'French words, yours to keep. Ready-made flashcard decks, Learn and Focus modes, FSRS spaced repetition, and Kips, the study companion who brings each word back before you forget it. Every deck free.';
export const SOCIAL_TITLE = 'Cardernir 2.0 | French words. Yours to keep.';
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
