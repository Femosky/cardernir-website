'use client';

import { useRef } from 'react';
import { motion } from 'motion/react';
import { Kips, type KipsHandle } from '@/components/landing/Kips';

/** Kips on a marketing stage: idling, and reacting once when he scrolls into view. */
export function KipsLive({ celebrate = false, size = 360 }: { celebrate?: boolean; size?: number }) {
    const kips = useRef<KipsHandle>(null);
    return (
        <motion.div className="kips-live" onViewportEnter={() => (celebrate ? kips.current?.sessionComplete(true) : kips.current?.correct())} viewport={{ amount: 0.6, once: true }}>
            <Kips ref={kips} poster={celebrate ? 'cheer_arms_up' : 'neutral'} size={size} />
        </motion.div>
    );
}
