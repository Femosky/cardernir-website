'use client';

import { useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Kips, type KipsHandle } from './Kips';

const CARDS = [
    { fr: 'être', en: 'to be' },
    { fr: 'bonjour', en: 'hello' },
    { fr: 'merci', en: 'thank you' },
    { fr: 'pain', en: 'bread' },
    { fr: 'voyage', en: 'trip' },
    { fr: 'chat', en: 'cat' },
    { fr: 'demain', en: 'tomorrow' },
    { fr: 'pomme', en: 'apple' },
];

const RATINGS = [
    { key: 'again', label: 'Again', tone: 'again', correct: false },
    { key: 'hard', label: 'Hard', tone: 'hard', correct: false },
    { key: 'good', label: 'Good', tone: 'good', correct: true },
    { key: 'easy', label: 'Easy', tone: 'easy', correct: true },
] as const;

/** A playable Learn card: five correct answers in a row stack a combo and win Energy back, like the app. */
export function ComboDemo() {
    const reduced = Boolean(useReducedMotion());
    const kips = useRef<KipsHandle>(null);
    const seq = useRef(0);
    const [index, setIndex] = useState(0);
    const [revealed, setRevealed] = useState(false);
    const [combo, setCombo] = useState(0);
    const [energy, setEnergy] = useState(25);
    const [callout, setCallout] = useState<number | null>(null);
    const [tokens, setTokens] = useState<number[]>([]);
    const [stamp, setStamp] = useState<{ id: number; tone: string; label: string; forIndex: number } | null>(null);
    const card = CARDS[index % CARDS.length];

    function rate(r: (typeof RATINGS)[number]) {
        if (!revealed) return;
        const id = ++seq.current;
        setStamp({ id, tone: r.tone, label: r.label, forIndex: index });
        setEnergy((e) => Math.max(0, e - 1));
        if (r.correct) {
            const next = combo + 1;
            setCombo(next);
            if (next % 5 === 0) {
                const tier = Math.min(4, next / 5) as 1 | 2 | 3 | 4;
                kips.current?.combo(tier);
                setCallout(next);
                setTokens(Array.from({ length: tier }, (_, i) => id + i));
                setEnergy((e) => Math.min(25, e + tier));
                window.setTimeout(() => setCallout(null), 1600);
                window.setTimeout(() => setTokens([]), 1200);
            } else {
                kips.current?.correct();
            }
        } else {
            setCombo(0);
            kips.current?.wrong();
        }
        setRevealed(false);
        setIndex((i) => i + 1);
    }

    return (
        <section id="energy" className="combo" aria-labelledby="combo-title">
            <div className="page-shell combo__grid">
                <div className="combo__copy">
                    <p className="eyebrow">Energy and combos</p>
                    <h2 id="combo-title">Every deck is free. New words use Energy.</h2>
                    <p className="section-lede">
                        Energy refills on its own, or you can watch a short ad to top up. Answer five in a row and Kips
                        stacks up a combo: in Learn, combos win back the Energy you spent. Try it.
                    </p>
                    <ul className="combo__facts">
                        <li><strong>25</strong> Energy, refilling every hour</li>
                        <li><strong>×5</strong> in a row wins Energy back</li>
                        <li><strong>∞</strong> with Premium, no ads</li>
                    </ul>
                </div>

                <div className="combo__stage" role="group" aria-label="Interactive Learn card">
                    <div className="combo__hud">
                        <span className="chip chip--energy" aria-live="polite">
                            <span className="bolt" aria-hidden="true" /> {energy}
                            <AnimatePresence>
                                {tokens.map((t, i) => (
                                    <motion.span
                                        key={t}
                                        className="chip__token"
                                        aria-hidden="true"
                                        initial={{ opacity: 0, x: -40 - i * 18, y: 140 + i * 10, scale: 0.6 }}
                                        animate={{ opacity: [0, 1, 1, 0], x: 0, y: 0, scale: [0.6, 1, 1, 0.4] }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: reduced ? 0.01 : 0.9, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                                    />
                                ))}
                            </AnimatePresence>
                        </span>
                        <span className="chip chip--combo" aria-live="polite">
                            {combo > 0 ? `${combo} in a row` : 'Build a combo'}
                        </span>
                    </div>

                    <div className="combo__card-area">
                        <AnimatePresence initial={false}>
                            <motion.button
                                key={index}
                                type="button"
                                className="study-card"
                                data-revealed={revealed}
                                onClick={() => setRevealed(true)}
                                initial={{ opacity: 0, y: reduced ? 0 : 26, scale: reduced ? 1 : 0.96 }}
                                animate={{ opacity: 1, y: 0, scale: 1, x: 0, rotate: 0 }}
                                exit={{
                                    opacity: 0,
                                    x: reduced ? 0 : stamp?.tone === 'again' || stamp?.tone === 'hard' ? -160 : 160,
                                    rotate: reduced ? 0 : stamp?.tone === 'again' || stamp?.tone === 'hard' ? -8 : 8,
                                    transition: { duration: 0.32, ease: [0.4, 0, 1, 1] },
                                }}
                                transition={{ type: 'spring', stiffness: 260, damping: 26 }}
                                aria-label={revealed ? `${card.fr} means ${card.en}` : `${card.fr}. Tap to reveal`}
                            >
                                <span className="study-card__word">{card.fr}</span>
                                <AnimatePresence>
                                    {revealed && (
                                        <motion.span
                                            className="study-card__meaning"
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.22 }}
                                        >
                                            <small>Means</small>
                                            {card.en}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                                {!revealed && <span className="study-card__hint">Tap to reveal</span>}
                                {stamp && stamp.forIndex === index && (
                                    <span className={`study-card__stamp study-card__stamp--${stamp.tone}`} aria-hidden="true">
                                        {stamp.label}
                                    </span>
                                )}
                            </motion.button>
                        </AnimatePresence>

                        <AnimatePresence>
                            {callout && (
                                <motion.div
                                    className="combo__callout"
                                    role="status"
                                    initial={{ opacity: 0, scale: 0.6, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ type: 'spring', stiffness: 500, damping: 26 }}
                                >
                                    {callout} in a row!
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="combo__kips">
                        <Kips ref={kips} poster="neutral" size={150} />
                    </div>

                    <div className="rating-row" data-enabled={revealed}>
                        {RATINGS.map((r) => (
                            <button key={r.key} type="button" className={`rating rating--${r.tone}`} onClick={() => rate(r)} disabled={!revealed}>
                                {r.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
