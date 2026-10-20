'use client';

import { useRef } from 'react';
import { useInView, useReducedMotion } from 'motion/react';

/* Recall strength over time: it decays toward "forgotten", a review lifts it, and each descent takes longer.
   Drawn with CSS (stroke-dashoffset) so it animates everywhere, including iOS Safari. */
const CURVE = 'M20 50 C 90 130, 170 270, 232 310 C 238 190, 246 100, 262 80 C 350 150, 450 270, 530 310 C 536 180, 544 90, 562 68 C 660 130, 750 210, 820 258';
const DOTS = [232, 530];

type Labels = { remembered: string; forgotten: string; review: string };

export function ForgetCurve({ labels }: { labels: Labels }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, amount: 0.4 });
    const reduced = Boolean(useReducedMotion());
    const on = inView || reduced;
    return (
        <div ref={ref} className="curve" data-in={on || undefined} role="img" aria-label={`${labels.remembered} → ${labels.forgotten} → ${labels.review}`}>
            <svg viewBox="0 0 840 350" aria-hidden="true">
                <line className="curve__floor" x1="20" y1="310" x2="820" y2="310" />
                <path className="curve__line" d={CURVE} pathLength={1} />
                {DOTS.map((x, i) => <circle key={x} className="curve__dot" cx={x} cy={310} r="13" style={{ animationDelay: `${0.9 + i * 0.95}s` }} />)}
            </svg>
            <span className="curve__lab curve__lab--top" style={{ left: '2.4%', top: '2%' }}>{labels.remembered}</span>
            <span className="curve__lab" style={{ left: '2.4%', top: '78%' }}>{labels.forgotten}</span>
            {DOTS.map((x, i) => <span key={x} className="curve__lab curve__lab--review" style={{ left: `${(x / 840) * 100}%`, top: '92%', animationDelay: `${1.1 + i * 0.95}s` }}>{labels.review}</span>)}
        </div>
    );
}
