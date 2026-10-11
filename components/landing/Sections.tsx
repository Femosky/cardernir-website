'use client';

import { useRef, type ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { Kips, type KipsHandle } from './Kips';
import { APP_STORE_URL } from '@/lib/siteMetadata';

export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
    const reduced = Boolean(useReducedMotion());
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: reduced ? 0 : 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.2, once: true }}
            transition={{ type: 'spring', stiffness: 160, damping: 24, delay }}
        >
            {children}
        </motion.div>
    );
}

const NEW = [
    { k: 'Kips', t: 'Meet Kips', d: 'Your study companion. He cheers the right answers and keeps you going when a word won’t stick.' },
    { k: 'Free', t: 'Every deck, now free', d: 'Study any deck you like. New cards use Energy, which refills over time.' },
    { k: 'Modes', t: 'Learn and Focus', d: 'Spaced reviews when you want them to stick, a straight run when you want to cram.' },
    { k: 'Combos', t: 'Build combos', d: 'Five in a row stacks a combo and wins back the Energy you spent.' },
    { k: 'Candle', t: 'Keep the candle lit', d: 'Your streak burns down through the day. Study to keep it lit.' },
    { k: 'Widgets', t: 'Kips on your Home Screen', d: 'See your candle at a glance, with a nudge before it needs you.' },
];

export function WhatsNew() {
    return (
        <section className="whatsnew" aria-label="What’s new in 2.0">
            <div className="page-shell">
                <p className="eyebrow">New in 2.0</p>
                <ul className="whatsnew__row">
                    {NEW.map((n) => (
                        <li key={n.k} className="whatsnew__item">
                            <strong>{n.t}</strong>
                            <p>{n.d}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

const PACKS = [
    { name: 'French Core', sub: 'Essential words for a solid foundation', count: '1,000 cards', hue: 'core' },
    { name: 'Everyday French Phrases', sub: 'Practical language for real conversations', count: '550 cards', hue: 'phrases' },
    { name: 'French Verb Mastery', sub: 'High-value verbs, forms and usage', count: '800 cards', hue: 'verbs' },
    { name: 'French for Travel', sub: 'Useful vocabulary for life on the go', count: '700 cards', hue: 'travel' },
    { name: 'TEF / TCF Canada Prep', sub: 'Focused vocabulary for exam preparation', count: '800 cards', hue: 'exam' },
];

export function Collections() {
    return (
        <section id="decks" className="decks" aria-labelledby="decks-title">
            <div className="page-shell decks__grid">
                <div className="decks__intro">
                    <p className="eyebrow">3,850 cards, ready for you</p>
                    <h2 id="decks-title">Every deck, free to study.</h2>
                    <p className="section-lede">
                        Five collections, each with small practice decks for Focus and a complete spaced-repetition deck
                        for Learn. Meanings in English, French, Spanish, German, Italian, Portuguese, Indonesian,
                        Japanese, Korean and Chinese.
                    </p>
                </div>
                <ol className="deck-list">
                    {PACKS.map((p) => (
                        <li key={p.name} className={`deck-row deck-row--${p.hue}`}>
                            <span className="deck-row__swatch" aria-hidden="true" />
                            <div>
                                <h3>{p.name}</h3>
                                <p>{p.sub}</p>
                            </div>
                            <strong>{p.count}</strong>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}

export function Maker() {
    return (
        <section id="why" className="maker" aria-labelledby="maker-title">
            <div className="page-shell maker__grid">
                <div>
                    <p className="eyebrow">Built independently in Canada</p>
                    <h2 id="maker-title">A small app, built with care.</h2>
                </div>
                <p className="section-lede">
                    Cardernir is made by one developer who wanted a calmer way to keep French vocabulary from
                    disappearing between study sessions. No account. Nothing sold on. Your cards stay on your phone.
                </p>
            </div>
        </section>
    );
}

export function Closing() {
    const kips = useRef<KipsHandle>(null);
    return (
        <section className="closing" aria-labelledby="closing-title">
            <div className="page-shell closing__grid">
                <motion.div className="closing__kips" onViewportEnter={() => kips.current?.sessionComplete(true)} viewport={{ amount: 0.6, once: true }}>
                    <Kips ref={kips} poster="cheer_arms_up" size={320} />
                </motion.div>
                <div className="closing__copy">
                    <p className="eyebrow eyebrow--on-dark">Your next French word is waiting</p>
                    <h2 id="closing-title">
                        Learn a little.
                        <br />
                        Remember a lot.
                    </h2>
                    <p>Free on the App Store. Kips is waiting.</p>
                    <Link className="store-badge" href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" aria-label="Get Cardernir on the App Store">
                        <Image src="/download-on-app-store.png" alt="" width={496} height={172} sizes="188px" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
