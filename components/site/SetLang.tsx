'use client';

import { useEffect } from 'react';

/** The root layout renders `<html lang="en">`; localized routes correct it on the client. */
export function SetLang({ lang }: { lang: string }) {
    useEffect(() => {
        const previous = document.documentElement.lang;
        document.documentElement.lang = lang;
        return () => { document.documentElement.lang = previous; };
    }, [lang]);
    return null;
}
