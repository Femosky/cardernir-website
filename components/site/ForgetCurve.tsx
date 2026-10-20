'use client';

import { motion, useReducedMotion } from 'motion/react';

/* Recall strength over time: it decays toward the threshold, a review lifts it, and each descent takes longer.
   No words, so it reads the same in every locale. */
const CURVE = 'M20 50 C 90 130, 170 270, 232 310 C 238 190, 246 100, 262 80 C 350 150, 450 270, 530 310 C 536 180, 544 90, 562 68 C 660 130, 750 210, 820 258';
const DOTS = [[232, 310], [530, 310]] as const;

export function ForgetCurve() {
    const reduced = Boolean(useReducedMotion());
    return (
        <svg className="curve" viewBox="0 0 840 350" role="img" aria-hidden="true">
            <line className="curve__floor" x1="20" y1="310" x2="820" y2="310" />
            <motion.path className="curve__line" d={CURVE} initial={{ pathLength: reduced ? 1 : 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 2.4, ease: 'easeInOut' }} />
            {DOTS.map(([x, y], i) => (
                <motion.circle key={x} className="curve__dot" cx={x} cy={y} r="13" initial={{ scale: reduced ? 1 : 0, opacity: reduced ? 1 : 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true, amount: 0.5 }} transition={{ delay: reduced ? 0 : 0.7 + i * 0.95, type: 'spring', stiffness: 420, damping: 18 }} style={{ transformOrigin: `${x}px ${y}px` }} />
            ))}
        </svg>
    );
}
