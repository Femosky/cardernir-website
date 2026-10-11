'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Phone } from './Phone';

const MODES = {
    learn: {
        label: 'Learn',
        title: 'Learn: a few new words a day, back before you forget.',
        body: 'Kips picks new words for you every day and schedules each one with FSRS, so difficult words return sooner and strong memories get more room.',
        points: ['New words paced to your daily goal', 'Again · Hard · Good · Easy', 'Reviews scheduled by FSRS'],
        screen: '/app/learn_lesson.webp',
        alt: 'A Learn session in Cardernir showing a French card and the four recall buttons',
    },
    focus: {
        label: 'Focus',
        title: 'Focus: pick a topic and go through it, card by card.',
        body: 'Cramming for a trip or a test? Choose a deck like Survival Basics or Food, and run straight through it. Focus never changes your Learn schedule.',
        points: ['Any deck, whenever you like', 'Know · Don’t know', 'Missed cards come back at the end'],
        screen: '/app/focus_lesson.webp',
        alt: 'A Focus session in Cardernir showing a French card with Know and Don’t know buttons',
    },
} as const;

type ModeKey = keyof typeof MODES;

export function Modes() {
    const [mode, setMode] = useState<ModeKey>('learn');
    const reduced = Boolean(useReducedMotion());
    const current = MODES[mode];

    return (
        <section id="modes" className="modes" aria-labelledby="modes-title">
            <div className="page-shell">
                <div className="section-head">
                    <p className="eyebrow">Two ways to study</p>
                    <h2 id="modes-title">Learn and Focus.</h2>
                </div>

                <div className="modes__grid">
                    <div className="modes__copy">
                        <div className="segmented" role="tablist" aria-label="Study mode">
                            {(Object.keys(MODES) as ModeKey[]).map((key) => (
                                <button
                                    key={key}
                                    role="tab"
                                    type="button"
                                    aria-selected={mode === key}
                                    className="segmented__tab"
                                    onClick={() => setMode(key)}
                                >
                                    {mode === key && (
                                        <motion.span
                                            layoutId="segmented-pill"
                                            className="segmented__pill"
                                            transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 36 }}
                                        />
                                    )}
                                    <span className="segmented__label">{MODES[key].label}</span>
                                </button>
                            ))}
                        </div>

                        <AnimatePresence mode="wait" initial={false}>
                            <motion.div
                                key={mode}
                                initial={{ opacity: 0, y: reduced ? 0 : 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: reduced ? 0 : -8 }}
                                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <h3 className="modes__title">{current.title}</h3>
                                <p className="modes__body">{current.body}</p>
                                <ul className="modes__points">
                                    {current.points.map((p) => (
                                        <li key={p}>{p}</li>
                                    ))}
                                </ul>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="modes__stage">
                        <AnimatePresence mode="popLayout" initial={false}>
                            <motion.div
                                key={mode}
                                className="modes__phone"
                                initial={{ opacity: 0, x: reduced ? 0 : mode === 'learn' ? -24 : 24, rotate: reduced ? 0 : mode === 'learn' ? -2 : 2 }}
                                animate={{ opacity: 1, x: 0, rotate: 0 }}
                                exit={{ opacity: 0, x: reduced ? 0 : mode === 'learn' ? 24 : -24 }}
                                transition={{ type: 'spring', stiffness: 220, damping: 28 }}
                            >
                                <Phone src={current.screen} alt={current.alt} />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
