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

export function Hero() {
    const reduced = Boolean(useReducedMotion());
    const kips = useRef<KipsHandle>(null);

    return (
        <section className="hero" aria-labelledby="hero-title">
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
                        initial={{ opacity: 0, y: reduced ? 0 : 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ ...spring, delay: 0.6 }}
                    >
                        <Kips ref={kips} poster="neutral" size={300} priority />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
