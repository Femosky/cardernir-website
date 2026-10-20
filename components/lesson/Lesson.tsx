'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useTransform, type PanInfo } from 'motion/react';
import { Kips, type KipsHandle } from '@/components/landing/Kips';
import { APP_STORE_URL } from '@/lib/siteMetadata';
import type { Dictionary } from '@/lib/i18n';

/* One Learn session, to the app's card spec (Card.swift, FrontCardView, BackCardView, SpacedDeckCardStack):
 * 0.68 aspect, 10 pt radius, 1 pt primary-20% stroke, the card background's soft gradient, a 0.45 s flip with
 * the face swapped at the midpoint, Again/Hard/Good/Easy capsules in the system colours, drag-to-swipe in four
 * directions with the card tinting and a corner stamp past the cutoff, the stack peeking behind with a seeded tilt. */

type Rating = 'again' | 'hard' | 'good' | 'easy';
type Dir = 'left' | 'up' | 'down' | 'right';
const fmt = (s: string, n: number) => s.replace('{n}', String(n));
const DIR: Record<Rating, Dir> = { again: 'left', hard: 'up', good: 'down', easy: 'right' };
const RATING: Record<Dir, Rating> = { left: 'again', up: 'hard', down: 'good', right: 'easy' };
const FLIP_MS = 450;

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

type Props = { t: Dictionary; compact?: boolean };

export function Lesson({ t, compact = false }: Props) {
    const reduced = Boolean(useReducedMotion());
    const kips = useRef<KipsHandle>(null);
    const cards = useMemo(() => t.cards.map((c, i) => ({ ...c, id: `c${i}` })), [t]);
    const [index, setIndex] = useState(0);
    const [flipped, setFlipped] = useState(false);
    const [showBack, setShowBack] = useState(false);
    const [flipping, setFlipping] = useState(false);
    const [leaving, setLeaving] = useState<{ id: string; dir: Dir } | null>(null);
    const [preview, setPreview] = useState<Dir | null>(null);
    const [energy, setEnergy] = useState(25);
    const [run, setRun] = useState(0);
    const [grant, setGrant] = useState<number | null>(null);
    const [combo, setCombo] = useState<number | null>(null);
    const [missed, setMissed] = useState<string[]>([]);
    const [done, setDone] = useState(false);
    const stageRef = useRef<HTMLDivElement>(null);

    const current = cards[index];
    const visible = cards.slice(index, index + 3);
    const remaining = cards.length - index;

    // drag (the front card only): rotation follows the horizontal offset as in the app (dx / (width - 50) * 8°)
    const dx = useMotionValue(0); const dy = useMotionValue(0);
    const dragRotate = useTransform(dx, (v) => (v / Math.max((stageRef.current?.clientWidth ?? 400) - 50, 1)) * 8);

    const cutoff = useCallback(() => {
        const w = stageRef.current?.clientWidth ?? 300; const stage = stageRef.current?.parentElement?.clientWidth ?? w;
        return Math.min(w * 0.36, stage * 0.22);
    }, []);

    const reset = useCallback(() => {
        setLeaving(null); setPreview(null); setFlipped(false); setShowBack(false); dx.set(0); dy.set(0);
    }, [dx, dy]);

    const flip = useCallback(() => {
        if (flipping || leaving || !current) return;
        setFlipping(true);
        const next = !flipped; setFlipped(next);
        window.setTimeout(() => setShowBack(next), reduced ? 0 : FLIP_MS / 2);
        window.setTimeout(() => setFlipping(false), reduced ? 0 : FLIP_MS);
    }, [flipping, leaving, current, flipped, reduced]);

    const rate = useCallback((r: Rating) => {
        if (!current || leaving || flipping) return;
        const dir = DIR[r];
        setLeaving({ id: current.id, dir }); setPreview(dir);
        setEnergy((e) => Math.max(0, e - 1));
        const strong = r === 'good' || r === 'easy';
        const nextRun = strong ? run + 1 : 0; setRun(nextRun);
        if (!strong) setMissed((m) => [...m, current.word]);
        if (strong && nextRun % 5 === 0) {
            const tier = Math.min(4, nextRun / 5) as 1 | 2 | 3 | 4;
            // the fifth card lands, then he throws the stack (the app waits a beat too)
            window.setTimeout(() => kips.current?.combo(tier), 320);
            setCombo(nextRun); setEnergy((e) => Math.min(25, e + tier)); setGrant(tier);
            window.setTimeout(() => { setCombo(null); setGrant(null); }, 1500);
        } else if (strong) kips.current?.correct();
        else if (r === 'hard') kips.current?.hard();
        else kips.current?.wrong();
        window.setTimeout(() => {
            reset();
            if (index + 1 >= cards.length) { setDone(true); window.setTimeout(() => kips.current?.sessionComplete(missed.length === 0 && strong), 200); }
            else setIndex((i) => i + 1);
        }, reduced ? 0 : 440);
    }, [current, leaving, flipping, run, index, cards.length, reduced, reset, missed.length]);

    const onDrag = (_: unknown, info: PanInfo) => {
        const c = cutoff(); const { x, y } = info.offset;
        const horizontal = Math.abs(x) > Math.abs(y); const dist = horizontal ? Math.abs(x) : Math.abs(y);
        setPreview(dist > c ? (horizontal ? (x < 0 ? 'left' : 'right') : y < 0 ? 'up' : 'down') : null);
    };
    const onDragEnd = (_: unknown, info: PanInfo) => {
        const c = cutoff(); const o = info.offset; const p = info.velocity;
        const x = Math.abs(p.x) > 400 ? o.x + p.x * 0.15 : o.x; const y = Math.abs(p.y) > 400 ? o.y + p.y * 0.15 : o.y;
        const horizontal = Math.abs(x) > Math.abs(y); const dist = horizontal ? Math.abs(x) : Math.abs(y);
        if (dist > c) rate(RATING[horizontal ? (x < 0 ? 'left' : 'right') : y < 0 ? 'up' : 'down']);
        else setPreview(null);
    };

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (done || (e.target as HTMLElement)?.tagName === 'INPUT') return;
            if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); flip(); return; }
            const map: Record<string, Rating> = { '1': 'again', '2': 'hard', '3': 'good', '4': 'easy', ArrowLeft: 'again', ArrowUp: 'hard', ArrowDown: 'good', ArrowRight: 'easy' };
            if (map[e.key]) { e.preventDefault(); rate(map[e.key]); }
        };
        window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey);
    }, [flip, rate, done]);

    const restart = () => { setIndex(0); setEnergy(25); setRun(0); setMissed([]); setDone(false); reset(); };
    const fly = (dir: Dir) => ({ left: { x: '-160%' }, right: { x: '160%' }, up: { y: '-140%' }, down: { y: '140%' } }[dir]);
    const r = t.demo;

    if (done) {
        const perfect = missed.length === 0;
        return (
            <div className={`lesson lesson--done${compact ? ' lesson--compact' : ''}`}>
                <motion.div className="ls-results" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 220, damping: 26 }}>
                    <div className="ls-results__kips"><Kips ref={kips} poster="cheer_arms_up" size={180} /></div>
                    <span className={`ls-results__score ${perfect ? 'is-perfect' : ''}`} aria-hidden="true">{perfect ? '✓' : '↻'}</span>
                    <h3 className="ls-results__title">{r.results.title}</h3>
                    <p className="ls-results__msg">{perfect ? r.results.perfect : fmt(r.results.good, missed.length)}</p>
                    <div className="ls-results__metrics">
                        <span className="ls-metric ls-metric--red"><strong>{missed.length}</strong>{r.results.missed}</span>
                        <span className="ls-metric ls-metric--green"><strong>{cards.length - missed.length}</strong>{r.results.remembered}</span>
                        <span className="ls-metric ls-metric--accent"><strong>{cards.length}</strong>{r.results.total}</span>
                    </div>
                    <p className="ls-results__learned">{r.results.learned}</p>
                    <div className="ls-results__actions">
                        <button type="button" className="ls-secondary" onClick={restart}>{r.results.again}</button>
                        <Link className="ls-primary" href={APP_STORE_URL} target="_blank" rel="noopener noreferrer">{r.results.cta}</Link>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className={`lesson${compact ? ' lesson--compact' : ''}`} role="group" aria-label={t.hero.tryHint}>
            <div className="ls-status-row">
                <span className="ls-energy" data-glow={grant !== null} aria-label={`${r.energy} ${energy}`}>
                    <Image src="/ui/energy-full.png" alt="" width={166} height={300} className="ls-energy__card" />
                    <span className="ls-energy__n">{energy}</span>
                    <AnimatePresence>{grant !== null && <motion.span className="ls-energy__grant" initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }}>+{grant}</motion.span>}</AnimatePresence>
                </span>
                <span className="ls-pill ls-pill--status">{r.newCard}</span>
                <span className="ls-pill">{fmt(r.counts, remaining)}</span>
            </div>

            <div className="ls-stage">
                <div className="ls-stack" ref={stageRef} style={{ perspective: 1400 }}>
                    <AnimatePresence initial={false}>
                        {visible.map((card, depth) => {
                            const isFront = depth === 0; const st = stackStyle(card.id, depth);
                            const isLeaving = leaving?.id === card.id;
                            const tint = isFront ? preview : null;
                            return (
                                <motion.div
                                    key={card.id}
                                    className="ls-card"
                                    data-front={isFront}
                                    data-tint={tint ?? undefined}
                                    style={{ zIndex: 10 - depth, x: isFront ? dx : undefined, y: isFront ? dy : undefined, rotate: isFront && !isLeaving ? dragRotate : undefined }}
                                    drag={isFront && !isLeaving && !flipping}
                                    dragSnapToOrigin
                                    dragElastic={1}
                                    dragMomentum={false}
                                    onDrag={onDrag}
                                    onDragEnd={onDragEnd}
                                    whileDrag={{ cursor: 'grabbing' }}
                                    initial={{ scale: st.scale, x: st.x, y: st.y, rotate: st.rotate }}
                                    animate={isLeaving
                                        ? { ...fly(leaving!.dir), rotate: leaving!.dir === 'left' ? -8 : leaving!.dir === 'right' ? 8 : 0, transition: { duration: reduced ? 0 : 0.42, ease: [0.3, 0.7, 0.4, 1] } }
                                        : isFront ? { scale: 1, transition: { type: 'spring', stiffness: 320, damping: 30 } }
                                        : { scale: st.scale, x: st.x, y: st.y, rotate: st.rotate, transition: { type: 'spring', stiffness: 320, damping: 30 } }}
                                    exit={{ opacity: 0, transition: { duration: 0 } }}
                                >
                                    <button type="button" className="ls-card__hit" onClick={isFront ? flip : undefined} tabIndex={isFront ? 0 : -1}
                                        aria-label={isFront ? (showBack ? `${card.word}: ${card.meaning}` : `${card.word}. ${r.tapToReveal}`) : undefined}>
                                        <motion.div className="ls-card__flip" animate={{ rotateY: isFront && flipped ? 180 : 0 }} transition={{ duration: reduced ? 0 : FLIP_MS / 1000, ease: 'easeInOut' }}>
                                            <div className="ls-face" data-hidden={isFront && showBack}>
                                                <span className="ls-face__word">{card.word}</span>
                                                {isFront && !showBack && !isLeaving && <span className="ls-face__reveal">{r.tapToReveal}</span>}
                                            </div>
                                            <div className="ls-face ls-face--back" data-hidden={!(isFront && showBack)}>
                                                <div className="ls-back__scroll">
                                                    <span className="ls-back__word">{card.word}</span>
                                                    <span className="ls-back__means">{r.means}</span>
                                                    <div className="ls-back__row"><span className="ls-back__idx">1.</span><span className="ls-back__meaning">{card.meaning}</span><span className="ls-back__idx ls-back__idx--ghost">1.</span></div>
                                                    <span className="ls-back__label">{r.description}</span>
                                                    <span className="ls-back__desc">‣ {card.feature}</span>
                                                    <span className="ls-back__desc">‣ {card.description}</span>
                                                    <span className="ls-back__label">{r.example}</span>
                                                    <span className="ls-back__ex">• {card.example}</span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </button>
                                    <AnimatePresence>
                                        {tint && (
                                            <motion.span className={`ls-stamp ls-stamp--${tint}`} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.16 }}>
                                                {r[RATING[tint]].toUpperCase()}
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
                <AnimatePresence>
                    {combo && <motion.div className="ls-combo" role="status" initial={{ opacity: 0, scale: 0.6, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ type: 'spring', stiffness: 520, damping: 26 }}>{fmt(r.inARow, combo)}</motion.div>}
                </AnimatePresence>
            </div>

            <div className="ls-controls">
                <div className="ls-kips"><Kips ref={kips} poster="neutral" size={124} priority /></div>
                {(['again', 'hard', 'good', 'easy'] as Rating[]).map((k) => (
                    <button key={k} type="button" className={`ls-btn ls-btn--${k}`} onClick={() => rate(k)} disabled={Boolean(leaving)}>{r[k]}</button>
                ))}
            </div>
            <p className="ls-hint">{r.keys}</p>
        </div>
    );
}
