'use client';

import { useRef } from 'react';
import { motion } from 'motion/react';
import { Kips, type KipsHandle } from '@/components/landing/Kips';

type Props = { celebrate?: boolean; size?: number; interactive?: boolean; quiet?: boolean; idle?: string; poster?: 'hello_wave' | 'happy_joy' | 'excited_open' | 'neutral' | 'cheer_arms_up' };

/** Kips on a marketing stage: idling, reacting once when he scrolls into view, and, when interactive, on every tap. */
export function KipsLive({ celebrate = false, size = 360, interactive = false, quiet = false, idle, poster }: Props) {
    const kips = useRef<KipsHandle>(null);
    const taps = useRef(0);
    const lastTap = useRef(0);
    const poke = () => {
        const k = kips.current; if (!k) return;
        const now = Date.now(); if (now - lastTap.current < 2600) return; lastTap.current = now;
        const seq = [() => k.correct(), () => k.wrong(), () => k.hard(), () => k.sessionComplete(false)];
        seq[taps.current++ % seq.length]();
    };
    return (
        <motion.div
            className="kips-live"
            data-interactive={interactive || undefined}
            onViewportEnter={() => { if (quiet) return; window.setTimeout(() => (celebrate ? kips.current?.sessionComplete(true) : kips.current?.correct()), 400); }}
            viewport={{ amount: 0.6, once: true }}
            onClick={interactive ? poke : undefined}
            whileTap={interactive ? { scale: 0.96 } : undefined}
            role={interactive ? 'button' : undefined}
            tabIndex={interactive ? 0 : undefined}
            onKeyDown={interactive ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); poke(); } } : undefined}
        >
            <Kips ref={kips} poster={poster ?? (celebrate ? 'cheer_arms_up' : 'neutral')} size={size} idle={idle} />
        </motion.div>
    );
}
