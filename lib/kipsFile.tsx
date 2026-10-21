'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
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

/** When this player may be created. The hero (`eager`) starts at once; every other player starts in the browser's
 *  idle time shortly after load, one per idle slot. Never on scroll: creating a player blocks the main thread for
 *  a moment, and doing that as a section scrolls in delayed its fade-up (the page's appear animation). */
export function useDeferredStart(eager = false) {
    const [start, setStart] = useState(eager);
    useEffect(() => {
        if (start) return;
        const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void };
        let idle = 0;
        const t = window.setTimeout(() => {
            if (w.requestIdleCallback) idle = w.requestIdleCallback(() => setStart(true), { timeout: 3000 });
            else setStart(true);
        }, 900);
        return () => { window.clearTimeout(t); if (idle && w.cancelIdleCallback) w.cancelIdleCallback(idle); };
    }, [start]);
    return start;
}
