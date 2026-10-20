'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Kips, type KipsHandle } from '@/components/landing/Kips';
import { APP_STORE_URL } from '@/lib/siteMetadata';

/* The home page is one Learn session, built to the app's own card spec (Card.swift / FrontCardView / BackCardView /
 * SpacedDeckCardStack): 0.68 aspect, 10 pt radius, 1 pt primary-20% stroke, the card background's soft gradient,
 * a 0.45 s ease-in-out flip with the face swapped at the midpoint, Again/Hard/Good/Easy as capsules in the system
 * red/orange/green/blue, a swipe stamp in the corner, the stack peeking behind at 0.93 / 0.86 with a seeded tilt. */

type Rating = 'again' | 'hard' | 'good' | 'easy';
type Dir = 'left' | 'up' | 'down' | 'right';

const RATINGS: { key: Rating; label: string; dir: Dir; correct: boolean }[] = [
    { key: 'again', label: 'Again', dir: 'left', correct: false },
    { key: 'hard', label: 'Hard', dir: 'up', correct: false },
    { key: 'good', label: 'Good', dir: 'down', correct: true },
    { key: 'easy', label: 'Easy', dir: 'right', correct: true },
];

type LessonCard = {
    id: string;
    word: string;
    meaning: string;
    descriptions: string[];
    examples: string[];
    /** The 2.0 feature this card introduces; shown on the back under the meaning, in the app's "Description" voice. */
    feature: string;
};

const CARDS: LessonCard[] = [
    { id: 'bonjour', word: 'bonjour', meaning: 'hello', feature: 'Meet Kips, your study companion. He learns beside you, cheers your right answers, and keeps you going when a word won’t stick.', descriptions: ['The everyday greeting, used until the evening.'], examples: ['Bonjour, Kips !'] },
    { id: 'apprendre', word: 'apprendre', meaning: 'to learn', feature: 'Learn mode: a few new words a day. FSRS brings each one back right before you would forget it.', descriptions: ['To gain knowledge or a skill; also “to learn of” news.'], examples: ['J’apprends dix mots par jour.'] },
    { id: 'concentrer', word: 'se concentrer', meaning: 'to focus', feature: 'Focus mode: pick a topic and go through it card by card. Focus never touches your Learn schedule.', descriptions: ['Reflexive: to concentrate on something.'], examples: ['Je me concentre sur la cuisine.'] },
    { id: 'energie', word: 'l’énergie', meaning: 'energy', feature: 'Every deck is free. New words use Energy, which refills on its own. Five right in a row wins it back.', descriptions: ['Physical or mental vigour; also power, as in electricity.'], examples: ['J’ai encore de l’énergie.'] },
    { id: 'bougie', word: 'la bougie', meaning: 'the candle', feature: 'Your streak is a candle that burns down through the day. A short session keeps it lit, and widgets keep it in sight.', descriptions: ['A wax candle; by extension, a spark plug.'], examples: ['La bougie brûle toujours.'] },
    { id: 'ensemble', word: 'ensemble', meaning: 'together', feature: 'Kips nudges, cheers and celebrates with you, on 3,850 French cards with meanings in 12 languages.', descriptions: ['At the same time or in the same place; as a noun, a set or outfit.'], examples: ['On apprend ensemble.'] },
];

/** SpacedDeckCardStack's seeded layout: direction, horizontal and vertical jitter, rotation jitter. */
function seed(id: string) {
    let h = 0;
    for (const ch of id) h = (Math.imul(h, 31) + (ch.codePointAt(0) ?? 0)) >>> 0;
    const dir = h % 2 === 0 ? -1 : 1;
    return { dir, hx: h % 5, vy: (Math.floor(h / 5) % 5) - 2, rot: ((Math.floor(h / 25) % 5) - 2) * 0.35 };
}
function stackStyle(id: string, depth: number) {
    if (depth === 0) return { scale: 1, x: 0, y: 0, rotate: 0 };
    const s = seed(id); const d = Math.min(depth, 3);
    return { scale: Math.max(1 - Math.min(depth, 5) * 0.07, 0.65), x: s.dir * (d * 8 + 6 + s.hx), y: -(d * 11) + s.vy, rotate: s.dir * d * 0.9 + s.rot };
}

const FLIP_MS = 450;

export function Lesson() {
    const reduced = Boolean(useReducedMotion());
    const kips = useRef<KipsHandle>(null);
    const [index, setIndex] = useState(0);
    const [flipped, setFlipped] = useState(false);
    const [showBack, setShowBack] = useState(false);
    const [flipping, setFlipping] = useState(false);
    const [leaving, setLeaving] = useState<{ id: string; dir: Dir; rating: Rating } | null>(null);
    const [energy, setEnergy] = useState(25);
    const [streak, setStreak] = useState(0);
    const [grant, setGrant] = useState<number | null>(null);
    const [combo, setCombo] = useState<number | null>(null);
    const [done, setDone] = useState(false);
    const [startedAt] = useState(() => Date.now());
    const [minutes, setMinutes] = useState(1);

    const remaining = CARDS.length - index;
    const visible = useMemo(() => CARDS.slice(index, index + 3), [index]);
    const current = CARDS[index];

    const flip = useCallback(() => {
        if (flipping || leaving || !current) return;
        setFlipping(true);
        const next = !flipped;
        setFlipped(next);
        window.setTimeout(() => setShowBack(next), reduced ? 0 : FLIP_MS / 2);
        window.setTimeout(() => setFlipping(false), reduced ? 0 : FLIP_MS);
    }, [flipping, leaving, current, flipped, reduced]);

    const rate = useCallback((r: Rating) => {
        if (!current || leaving || flipping) return;
        const spec = RATINGS.find((x) => x.key === r)!;
        setLeaving({ id: current.id, dir: spec.dir, rating: r });
        setEnergy((e) => Math.max(0, e - 1));
        if (spec.correct) {
            const n = streak + 1; setStreak(n);
            if (n === 5) {
                kips.current?.combo(1); setCombo(5); setEnergy((e) => Math.min(25, e + 1)); setGrant(1);
                window.setTimeout(() => { setCombo(null); setGrant(null); }, 1400);
            } else kips.current?.correct();
        } else { setStreak(0); kips.current?.wrong(); }
        const ms = reduced ? 0 : 420;
        window.setTimeout(() => {
            setLeaving(null); setFlipped(false); setShowBack(false);
            if (index + 1 >= CARDS.length) { setMinutes(Math.max(1, Math.round((Date.now() - startedAt) / 60000))); setDone(true); kips.current?.sessionComplete(streak + (spec.correct ? 1 : 0) >= CARDS.length); }
            else setIndex((i) => i + 1);
        }, ms);
    }, [current, leaving, flipping, streak, index, reduced, startedAt]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (done) return;
            if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); flip(); }
            if (!flipped) return;
            const map: Record<string, Rating> = { '1': 'again', '2': 'hard', '3': 'good', '4': 'easy', ArrowLeft: 'again', ArrowUp: 'hard', ArrowDown: 'good', ArrowRight: 'easy' };
            if (map[e.key]) { e.preventDefault(); rate(map[e.key]); }
        };
        window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey);
    }, [flip, rate, flipped, done]);

    const fly = (dir: Dir) => ({ left: { x: '-150vw' }, right: { x: '150vw' }, up: { y: '-120vh' }, down: { y: '120vh' } }[dir]);

    return (
        <div className="lesson" data-done={done}>
            <div className="lesson__screen">
                {/* header, as the app's SpacedDeck header */}
                <header className="ls-head">
                    <Link className="ls-back" href="#" onClick={(e) => e.preventDefault()} aria-label="Decks"><span aria-hidden="true">‹</span> Decks</Link>
                    <div className="ls-head__right">
                        <span className="ls-energy" data-glow={grant !== null}>
                            <Image src="/ui/energy-full.png" alt="" width={166} height={300} className="ls-energy__card" />
                            <span className="ls-energy__n">{energy}</span>
                            <AnimatePresence>{grant !== null && <motion.span className="ls-energy__grant" initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }}>+{grant}</motion.span>}</AnimatePresence>
                        </span>
                        <span className="ls-counts">0 due • {remaining} new</span>
                        <span className="ls-more" aria-hidden="true">•••</span>
                    </div>
                </header>
                <p className="ls-title">Cardernir 2.0 · Meet Kips</p>

                {/* stack */}
                <div className="ls-stage">
                    <AnimatePresence>
                        {!done && (
                            <motion.span key="status" className="ls-status" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>New card</motion.span>
                        )}
                    </AnimatePresence>
                    <div className="ls-stack" style={{ perspective: 1400 }}>
                        <AnimatePresence initial={false}>
                            {!done && visible.map((card, depth) => {
                                const isFront = depth === 0; const st = stackStyle(card.id, depth);
                                const isLeaving = leaving?.id === card.id;
                                return (
                                    <motion.button
                                        key={card.id}
                                        type="button"
                                        className="ls-card"
                                        data-front={isFront}
                                        aria-label={isFront ? (showBack ? `${card.word} means ${card.meaning}` : `${card.word}. Tap to reveal`) : undefined}
                                        tabIndex={isFront ? 0 : -1}
                                        onClick={isFront ? flip : undefined}
                                        style={{ zIndex: 10 - depth }}
                                        initial={{ scale: st.scale, x: st.x, y: st.y, rotate: st.rotate }}
                                        animate={isLeaving ? { ...fly(leaving!.dir), rotate: leaving!.dir === 'left' ? -8 : leaving!.dir === 'right' ? 8 : 0, transition: { duration: reduced ? 0 : 0.42, ease: [0.3, 0.7, 0.4, 1] } }
                                                          : { scale: st.scale, x: st.x, y: st.y, rotate: st.rotate, transition: { type: 'spring', stiffness: 320, damping: 30 } }}
                                        exit={{ opacity: 0, transition: { duration: 0 } }}
                                    >
                                        <motion.div className="ls-card__flip" animate={{ rotateY: isFront && flipped ? 180 : 0 }} transition={{ duration: reduced ? 0 : FLIP_MS / 1000, ease: 'easeInOut' }}>
                                            <div className="ls-face" data-hidden={isFront && showBack}>
                                                <span className="ls-face__word">{card.word}</span>
                                                {isFront && !showBack && !isLeaving && <span className="ls-face__reveal">Tap to reveal</span>}
                                            </div>
                                            <div className="ls-face ls-face--back" data-hidden={!(isFront && showBack)}>
                                                <div className="ls-back__scroll">
                                                    <span className="ls-back__word">{card.word}</span>
                                                    <span className="ls-back__means">Means</span>
                                                    <div className="ls-back__row"><span className="ls-back__idx">1.</span><span className="ls-back__meaning">{card.meaning}</span><span className="ls-back__idx ls-back__idx--ghost">1.</span></div>
                                                    <span className="ls-back__label">Description</span>
                                                    <span className="ls-back__desc">‣ {card.feature}</span>
                                                    <span className="ls-back__desc">‣ {card.descriptions[0]}</span>
                                                    <span className="ls-back__label">Example</span>
                                                    {card.examples.map((s) => <span key={s} className="ls-back__ex">• {s}</span>)}
                                                </div>
                                            </div>
                                        </motion.div>
                                        <AnimatePresence>
                                            {isLeaving && (
                                                <motion.span className={`ls-stamp ls-stamp--${leaving!.dir}`} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.16 }}>
                                                    {RATINGS.find((x) => x.key === leaving!.rating)!.label.toUpperCase()}
                                                </motion.span>
                                            )}
                                        </AnimatePresence>
                                    </motion.button>
                                );
                            })}
                        </AnimatePresence>

                        <AnimatePresence>
                            {done && (
                                <motion.div key="done" className="ls-done" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 220, damping: 26 }}>
                                    <p className="ls-done__k">Session complete</p>
                                    <h1>You just learned<br />six French words.</h1>
                                    <p className="ls-done__p">3,844 to go. Kips will bring these six back before you forget them.</p>
                                    <div className="ls-done__stats">
                                        <span><strong>{CARDS.length}</strong>cards</span>
                                        <span><strong>{minutes}</strong>min</span>
                                        <span><strong>{energy}</strong>Energy</span>
                                    </div>
                                    <Link className="ls-cta" href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" aria-label="Get Cardernir on the App Store">
                                        <Image src="/download-on-app-store.png" alt="" width={496} height={172} sizes="188px" />
                                    </Link>
                                    <p className="ls-done__fine">Free · iPhone · No account</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <AnimatePresence>
                        {combo && <motion.div className="ls-combo" role="status" initial={{ opacity: 0, scale: 0.6, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ type: 'spring', stiffness: 520, damping: 26 }}>{combo} in a row!</motion.div>}
                    </AnimatePresence>
                </div>

                {/* controls, with Kips standing on the first button as in the app */}
                <div className="ls-controls" data-done={done}>
                    <div className="ls-kips"><Kips ref={kips} poster="neutral" size={132} priority /></div>
                    {RATINGS.map((r) => (
                        <button key={r.key} type="button" className={`ls-btn ls-btn--${r.key}`} onClick={() => rate(r.key)} disabled={done || !flipped || Boolean(leaving)} aria-label={r.label}>
                            {r.label}
                        </button>
                    ))}
                </div>
                <p className="ls-hint" aria-hidden="true">{done ? '' : flipped ? 'Rate it: 1 · 2 · 3 · 4' : 'Space to reveal'}</p>
            </div>
        </div>
    );
}
