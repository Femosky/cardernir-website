'use client';

import Image, { type ImageProps } from 'next/image';
import { useTheme } from 'next-themes';
import { useSyncExternalStore } from 'react';

type ThemedImageProps = Omit<ImageProps, 'src'> & {
    lightSrc: ImageProps['src'];
    darkSrc: ImageProps['src'];
};

const subscribe = () => () => {};

function useHydrated() {
    return useSyncExternalStore(subscribe, () => true, () => false);
}

export function ThemedImage({ lightSrc, darkSrc, alt, ...props }: ThemedImageProps) {
    const { resolvedTheme } = useTheme();
    const hydrated = useHydrated();
    const src = hydrated && resolvedTheme === 'dark' ? darkSrc : lightSrc;

    return <Image {...props} src={src} alt={alt} />;
}
