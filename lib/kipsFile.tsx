'use client';

import { createContext, useContext, useEffect, useState, type ReactNode, type RefObject } from 'react';
import { useRiveFile } from '@rive-app/react-canvas';
import { KIPS_RIV } from '@/lib/kips';

/* One copy of the mascot's Rive file for the whole page. Every player on the home page (hero, lesson, Kips chapter,
   streak candle, closing) used to fetch and parse its own 5 MB copy at once on the main thread, which stuttered the
   first seconds of the page. The provider loads it once; players outside a provider still load their own. */

type RiveFileT = ReturnType<typeof useRiveFile>['riveFile'];
const KipsFile = createContext<{ shared: boolean; file: RiveFileT }>({ shared: false, file: null });

export function KipsFileProvider({ children }: { children: ReactNode }) {
    // useRiveFile hands back the file object as soon as it starts loading: players wait for 'success'
    const { riveFile, status } = useRiveFile({ src: KIPS_RIV });
    return <KipsFile.Provider value={{ shared: true, file: status === 'success' ? riveFile : null }}>{children}</KipsFile.Provider>;
}

/** The player's source: the shared file once it has loaded (null until then), or its own copy outside a provider. */
export function useKipsSource(): { riveFile: NonNullable<RiveFileT> } | { src: string } | null {
    const { shared, file } = useContext(KipsFile);
    if (!shared) return { src: KIPS_RIV };
    return file ? { riveFile: file } : null;
}

/** True once the element comes within `margin` of the viewport (and stays true): players further down the page
 *  are only created when the reader gets near them. `eager` skips the wait (the hero). */
export function useNearViewport(ref: RefObject<HTMLElement | null>, eager = false, margin = '300px') {
    const [near, setNear] = useState(eager);
    useEffect(() => {
        if (near || !ref.current) return;
        const io = new IntersectionObserver((entries) => {
            if (entries.some((e) => e.isIntersecting)) { setNear(true); io.disconnect(); }
        }, { rootMargin: margin });
        io.observe(ref.current);
        return () => io.disconnect();
    }, [near, ref, margin]);
    return near;
}
