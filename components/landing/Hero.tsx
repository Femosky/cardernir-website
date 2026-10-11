'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { Kips, type KipsHandle } from './Kips';
import { Phone } from './Phone';
import { APP_STORE_URL } from '@/lib/siteMetadata';

const spring = { type: 'spring', stiffness: 170, damping: 24, mass: 0.9 } as const;

function enter(delay: number, reduced: boolean) {
    return {
        initial: { opacity: 0, y: reduced ? 0 : 22 },
        animate: { opacity: 1, y: 0 },
        transition: { ...spring, delay },
    };
}

/** The white card fan behind the hero: five cards drifting on their own slow, deterministic cycles. */
function CardFan({ reduced }: { reduced: boolean }) {
    const cards = [
        { x: -46, y: 8, r: -18, d: 11 },
        { x: -24, y: -6, r: -9, d: 13 },
        { x: 0, y: -12, r: 0, d: 12 },
        { x: 24, y: -6, r: 9, d: 14 },
        { x: 46, y: 8, r: 18, d: 10 },
    ];
    return (
        <div className="hero__fan" aria-hidden="true">
            {cards.map((c, i) => (
                <span
                    key={i}
                    className="hero__fan-card"
                    style={{
                        ['--x' as string]: `${c.x}%`,
                        ['--y' as string]: `${c.y}%`,
                        ['--r' as string]: `${c.r}deg`,
                        ['--d' as string]: reduced ? '0s' : `${c.d}s`,
                        ['--i' as string]: `${i * -2.3}s`,
                    }}
                />
            ))}
        </div>
    );
}

export function Hero() {
    const reduced = Boolean(useReducedMotion());
    const kips = useRef<KipsHandle>(null);

    return (
        <section className="hero" aria-labelledby="hero-title">
            <CardFan reduced={reduced} />
            <div className="page-shell hero__grid">
                <div className="hero__copy">
                    <motion.p className="eyebrow" {...enter(0.05, reduced)}>
                        Cardernir 2.0 · Meet Kips
                    </motion.p>
                    <motion.h1 id="hero-title" className="hero__title" {...enter(0.14, reduced)}>
                        French words.
                        <br />
                        Yours to keep.
                    </motion.h1>
                    <motion.p className="hero__lede" {...enter(0.24, reduced)}>
                        Ready-made flashcards and reviews that adapt to you. Kips learns beside you, brings each word
                        back before you forget it, and keeps your candle lit.
                    </motion.p>
                    <motion.div className="hero__actions" {...enter(0.34, reduced)}>
                        <Link className="store-badge" href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" aria-label="Download Cardernir on the App Store">
                            <Image src="/download-on-app-store.png" alt="" width={496} height={172} priority sizes="188px" />
                        </Link>
                        <Link className="text-link" href="#modes">
                            See what&rsquo;s new <span aria-hidden="true">↓</span>
                        </Link>
                    </motion.div>
                    <motion.p className="hero__note" {...enter(0.42, reduced)}>
                        Every deck free · No account · iPhone
                    </motion.p>
                </div>

                <motion.div className="hero__stage" initial={{ opacity: 0, y: reduced ? 0 : 30 }} animate={{ opacity: 1, y: 0 }} transition={{ ...spring, delay: 0.3 }}>
                    <Phone src="/app/home.webp" alt="Cardernir Home: Learn and Focus modes, a 47-day candle and 25 Energy" className="hero__phone" priority />
                    <motion.div
                        className="hero__kips"
                        initial={{ opacity: 0, y: reduced ? 0 : 40, scale: reduced ? 1 : 0.94 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ ...spring, delay: 0.75 }}
                        onHoverStart={() => kips.current?.correct()}
                        onTap={() => kips.current?.sessionComplete(true)}
                    >
                        <Kips ref={kips} poster="hello_wave" size={300} priority />
                    </motion.div>
                    <motion.div className="hero__chip hero__chip--candle" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ ...spring, delay: 0.9 }}>
                        <span className="flame" aria-hidden="true" /> 47
                    </motion.div>
                    <motion.div className="hero__chip hero__chip--energy" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ ...spring, delay: 1.0 }}>
                        <span className="bolt" aria-hidden="true" /> 25
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
