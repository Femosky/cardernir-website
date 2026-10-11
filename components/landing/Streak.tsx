'use client';

import { useEffect, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { useRef } from 'react';
import { Phone } from './Phone';

/** The streak candle: the real app's idea, drawn in SVG. The number rolls 46 → 47 as it scrolls in. */
function Candle({ lit }: { lit: boolean }) {
    const reduced = Boolean(useReducedMotion());
    const [n, setN] = useState(46);
    useEffect(() => {
        if (!lit) return;
        const t = window.setTimeout(() => setN(47), reduced ? 0 : 900);
        return () => window.clearTimeout(t);
    }, [lit, reduced]);

    return (
        <div className="candle" data-lit={lit} aria-hidden="true">
            <div className="candle__glow" />
            <svg className="candle__flame" viewBox="0 0 60 90">
                <path className="candle__flame-outer" d="M30 2 C40 24 54 36 54 56 A24 24 0 0 1 6 56 C6 36 20 24 30 2 Z" />
                <path className="candle__flame-inner" d="M30 30 C35 42 42 48 42 60 A12 12 0 0 1 18 60 C18 48 25 42 30 30 Z" />
            </svg>
            <div className="candle__wick" />
            <div className="candle__wax">
                <motion.span key={n} className="candle__number" initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 22 }}>
                    {n}
                </motion.span>
            </div>
        </div>
    );
}

export function Streak() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { amount: 0.5, once: true });

    return (
        <section id="streak" className="streak" aria-labelledby="streak-title">
            <div className="page-shell streak__grid">
                <div className="streak__stage" ref={ref}>
                    <Candle lit={inView} />
                    <Phone src="/app/streak_sep.webp" alt="The streak screen: a candle reading 47, the day count and the month calendar" className="streak__phone" />
                </div>
                <div className="streak__copy">
                    <p className="eyebrow eyebrow--warm">Streaks</p>
                    <h2 id="streak-title">Keep the candle lit.</h2>
                    <p className="section-lede">
                        Your streak is a candle that burns down through the day. A short session keeps it lit, and Kips
                        celebrates every milestone with you. Miss a day and the candle goes out, but your cards are still
                        there waiting.
                    </p>
                    <ul className="streak__points">
                        <li>
                            <strong>Widgets</strong> show your candle on the Home Screen, with a gentle nudge before it
                            burns out.
                        </li>
                        <li>
                            <strong>Reminders you control:</strong> pick your practice time or keep things quiet.
                        </li>
                        <li>
                            <strong>Milestones</strong> at 7, 30, 100 and 365 days, with Kips in full celebration.
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}
