'use client';

import { useCallback, useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, animate, motion, useMotionValue, usePresence, useReducedMotion, useTransform } from 'motion/react';
import { Kips, type KipsHandle } from '@/components/landing/Kips';
import { APP_STORE_URL } from '@/lib/siteMetadata';
import type { Dictionary } from '@/lib/i18n';

/* One Learn session, to the app's card spec (Card.swift, FrontCardView, BackCardView, SpacedDeckCardStack):
 * 0.68 aspect, 10 pt radius, 1 pt primary-20% stroke, the card background's soft gradient, a 0.45 s flip with
 * the face swapped at the midpoint, Again/Hard/Good/Easy capsules in the system colours, drag-to-swipe in four
 * directions with the card tinting and a corner stamp past the cutoff, the stack peeking behind with a seeded tilt.
 *
 * Gestures follow Card.swift: on the front the card follows the finger at once. On the back the description
 * scrolls; a touch has to hold for 0.3 s (the card grows to 1.045) before the card lets go of the scroll and can be
 * swiped, and a horizontal swipe is taken straight away since it can't be a scroll. With a mouse the card always
 * drags (the wheel scrolls). */

type Rating = 'again' | 'hard' | 'good' | 'easy';
type Dir = 'left' | 'up' | 'down' | 'right';
type Point = { x: number; y: number };
type Exit = { dir: Dir; to: Point };
type CardData = Dictionary['cards'][number] & { id: string };

const fmt = (s: string, n: number) => s.replace('{n}', String(n));
const DIR: Record<Rating, Dir> = { again: 'left', hard: 'up', good: 'down', easy: 'right' };
const RATING: Record<Dir, Rating> = { left: 'again', up: 'hard', down: 'good', right: 'easy' };
const FLIP_MS = 450;
const FLY_S = 0.4;
const LONG_PRESS_MS = 300;
const SLOP = 6;

function seed(id: string) {
    let h = 0;
    for (const ch of id) h = (Math.imul(h, 31) + (ch.codePointAt(0) ?? 0)) >>> 0;
    const dir = h % 2 === 0 ? -1 : 1;
    return { dir, hx: h % 5, vy: (Math.floor(h / 5) % 5) - 2, rot: ((Math.floor(h / 25) % 5) - 2) * 0.35 };
}
/** Where a card sits in the stack (SpacedDeckCardStack): smaller and offset to one side per depth, tilted a touch. */
function stackStyle(id: string, depth: number) {
    if (depth === 0) return { scale: 1, x: 0, y: 0, rotate: 0 };
    const s = seed(id); const d = Math.min(depth, 3);
    return { scale: Math.max(1 - Math.min(depth, 5) * 0.07, 0.65), x: s.dir * (d * 8 + 6 + s.hx), y: -(d * 11) + s.vy, rotate: s.dir * d * 0.9 + s.rot };
}
function directionOf(x: number, y: number) {
    const horizontal = Math.abs(x) > Math.abs(y);
    return { dir: (horizontal ? (x < 0 ? 'left' : 'right') : y < 0 ? 'up' : 'down') as Dir, dist: horizontal ? Math.abs(x) : Math.abs(y) };
}
const windowWidth = () => (typeof window === 'undefined' ? 1280 : window.innerWidth);

type Gesture = {
    id: number; touch: boolean; mode: 'pending' | 'drag' | 'scroll';
    startX: number; startY: number; ox: number; oy: number;
    samples: { t: number; x: number; y: number }[]; timer?: number;
};

type CardProps = {
    card: CardData; depth: number; flipped: boolean; showBack: boolean; reduced: boolean;
    labels: Dictionary['demo']; exitFor: (id: string) => Exit | undefined;
    onFlip: () => void; onRate: (dir: Dir, from: Point) => void;
};

function StackCard({ card, depth, flipped, showBack, reduced, labels: r, exitFor, onFlip, onRate }: CardProps) {
    const [isPresent, safeToRemove] = usePresence();
    const isFront = depth === 0 && isPresent;
    const root = useRef<HTMLDivElement>(null);
    // this card's own drag offset: a card that leaves keeps flying from where it is, whatever the next card does
    const x = useMotionValue(0); const y = useMotionValue(0);
    // rotation follows the horizontal offset as in the app: dx / (window width - 50) * 8°
    const rotate = useTransform(x, (v) => (v / Math.max(windowWidth() - 50, 1)) * 8);
    const [preview, setPreview] = useState<Dir | null>(null);
    const [armed, setArmed] = useState(false);
    const gesture = useRef<Gesture | null>(null);
    const previewRef = useRef<Dir | null>(null);
    const suppressClick = useRef(false);

    const exit = isPresent ? undefined : exitFor(card.id);
    const tint = exit?.dir ?? preview;

    // leaving the stack: fly past the edge of the viewport from wherever the card is, then go
    useEffect(() => {
        if (isPresent) return;
        const target = exitFor(card.id);
        if (!target) { safeToRemove?.(); return; }
        const options = reduced ? { duration: 0 } : { duration: FLY_S, ease: [0.2, 0.75, 0.3, 1] as [number, number, number, number] };
        const ax = animate(x, target.to.x, options); const ay = animate(y, target.to.y, options);
        let alive = true;
        Promise.all([ax.finished, ay.finished]).then(() => { if (alive) safeToRemove?.(); });
        return () => { alive = false; ax.stop(); ay.stop(); };
    }, [isPresent, card.id, exitFor, reduced, safeToRemove, x, y]);

    // once the card has the gesture, a touch must not scroll the page or the back's description
    useEffect(() => {
        const el = root.current;
        if (!el || !isFront) return;
        const block = (e: TouchEvent) => { if (gesture.current?.mode === 'drag') e.preventDefault(); };
        el.addEventListener('touchmove', block, { passive: false });
        return () => el.removeEventListener('touchmove', block);
    }, [isFront]);

    const setTint = (dir: Dir | null) => { if (previewRef.current !== dir) { previewRef.current = dir; setPreview(dir); } };
    const cutoff = () => {
        const w = root.current?.offsetWidth ?? 300;
        const stage = root.current?.closest('.ls-stage')?.clientWidth ?? w;
        return Math.min(w * 0.36, stage * 0.22);
    };
    const claim = (g: Gesture) => {
        if (g.timer) window.clearTimeout(g.timer);
        g.mode = 'drag'; suppressClick.current = true;
        try { root.current?.setPointerCapture(g.id); } catch { /* the pointer may already be gone */ }
    };

    const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
        if (!isFront || gesture.current || (e.pointerType === 'mouse' && e.button !== 0)) return;
        x.stop(); y.stop();
        const g: Gesture = {
            id: e.pointerId, touch: e.pointerType !== 'mouse', mode: 'pending',
            startX: e.clientX, startY: e.clientY, ox: x.get(), oy: y.get(),
            samples: [{ t: e.timeStamp, x: e.clientX, y: e.clientY }],
        };
        if (showBack && g.touch) {
            g.timer = window.setTimeout(() => {
                if (gesture.current !== g || g.mode !== 'pending') return;
                claim(g); setArmed(true);
                navigator.vibrate?.(8);
            }, LONG_PRESS_MS);
        }
        gesture.current = g;
    };

    const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
        const g = gesture.current;
        if (!g || e.pointerId !== g.id || g.mode === 'scroll') return;
        g.samples.push({ t: e.timeStamp, x: e.clientX, y: e.clientY });
        if (g.samples.length > 8) g.samples.shift();
        const mx = e.clientX - g.startX; const my = e.clientY - g.startY;
        if (g.mode === 'pending') {
            if (Math.hypot(mx, my) < SLOP) return;
            // on the back, an unarmed vertical touch is the description scrolling: let the browser have it
            if (showBack && g.touch && Math.abs(my) >= Math.abs(mx)) {
                if (g.timer) window.clearTimeout(g.timer);
                g.mode = 'scroll';
                return;
            }
            claim(g);
        }
        x.set(g.ox + mx); y.set(g.oy + my);
        const { dir, dist } = directionOf(g.ox + mx, g.oy + my);
        setTint(dist > cutoff() ? dir : null);
    };

    const finish = (e: ReactPointerEvent<HTMLDivElement>, cancelled: boolean) => {
        const g = gesture.current;
        if (!g || e.pointerId !== g.id) return;
        if (g.timer) window.clearTimeout(g.timer);
        gesture.current = null;
        setArmed(false);
        // the click that follows a drag or a long press must not flip the card (Card.swift's suppressFlipUntil)
        window.setTimeout(() => { suppressClick.current = false; }, 80);
        if (g.mode !== 'drag') return;
        const ox = x.get(); const oy = y.get();
        // a flick counts as far as it was heading (the app's predictedEndTranslation)
        const recent = g.samples.filter((s) => e.timeStamp - s.t < 120);
        const first = recent[0] ?? g.samples[0];
        const dt = Math.max((e.timeStamp - first.t) / 1000, 0.001);
        const vx = (e.clientX - first.x) / dt; const vy = (e.clientY - first.y) / dt;
        // ... but only once the card has really travelled, so a jittery tap or a nudge never rates it
        const c = cutoff(); const travelled = directionOf(ox, oy).dist >= Math.max(24, c * 0.35);
        const px = travelled && Math.abs(vx) > 400 ? ox + vx * 0.15 : ox; const py = travelled && Math.abs(vy) > 400 ? oy + vy * 0.15 : oy;
        const { dir, dist } = directionOf(px, py);
        if (!cancelled && dist > c) {
            setTint(dir);
            onRate(dir, { x: ox, y: oy });
            return;
        }
        setTint(null);
        const spring = { type: 'spring' as const, stiffness: 420, damping: 34 };
        animate(x, 0, spring); animate(y, 0, spring);
    };

    const st = stackStyle(card.id, depth);
    return (
        <motion.div
            ref={root}
            className="ls-card"
            data-front={isFront}
            data-back={isFront && showBack ? 'true' : undefined}
            data-tint={tint ?? undefined}
            style={{ zIndex: isPresent ? 10 - depth : 20 }}
            initial={{ ...stackStyle(card.id, depth + 1), opacity: 0 }}
            animate={{ ...st, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={(e) => finish(e, false)}
            onPointerCancel={(e) => finish(e, true)}
        >
            <motion.div className="ls-card__drag" style={{ x, y, rotate }} animate={{ scale: armed ? 1.045 : 1 }} transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}>
                <button
                    type="button"
                    className="ls-card__hit"
                    tabIndex={isFront ? 0 : -1}
                    onClick={() => { if (!isFront) return; if (suppressClick.current) { suppressClick.current = false; return; } onFlip(); }}
                    aria-label={isFront ? (showBack ? `${card.word}: ${card.meaning}` : `${card.word}. ${r.tapToReveal}`) : undefined}
                >
                    <motion.div className="ls-card__flip" initial={false} animate={{ rotateY: flipped ? 180 : 0 }} transition={{ duration: reduced ? 0 : FLIP_MS / 1000, ease: 'easeInOut' }}>
                        <div className="ls-face" data-hidden={showBack}>
                            <span className="ls-face__word">{card.word}</span>
                            {isFront && !showBack && <span className="ls-face__reveal">{r.tapToReveal}</span>}
                        </div>
                        <div className="ls-face ls-face--back" data-hidden={!showBack}>
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
                        <motion.span key={tint} className={`ls-stamp ls-stamp--${tint}`} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.16 }}>
                            {r[RATING[tint]].toUpperCase()}
                        </motion.span>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
}

type Props = { t: Dictionary; compact?: boolean };

export function Lesson({ t, compact = false }: Props) {
    const reduced = Boolean(useReducedMotion());
    const kips = useRef<KipsHandle>(null);
    const cards = useMemo<CardData[]>(() => t.cards.map((c, i) => ({ ...c, id: `c${i}` })), [t]);
    const [index, setIndex] = useState(0);
    const [flipped, setFlipped] = useState(false);
    const [showBack, setShowBack] = useState(false);
    const [flipping, setFlipping] = useState(false);
    const [energy, setEnergy] = useState(25);
    const [run, setRun] = useState(0);
    const [grant, setGrant] = useState<number | null>(null);
    const [combo, setCombo] = useState<number | null>(null);
    const [missed, setMissed] = useState<string[]>([]);
    const [done, setDone] = useState(false);
    const stackRef = useRef<HTMLDivElement>(null);
    const exits = useRef(new Map<string, Exit>());
    const lockedUntil = useRef(0);

    const current = cards[index];
    const visible = cards.slice(index, index + 3);
    const remaining = Math.max(cards.length - index, 0);
    const exitFor = useCallback((id: string) => exits.current.get(id), []);

    const flip = useCallback(() => {
        if (flipping || !current) return;
        setFlipping(true);
        const next = !flipped; setFlipped(next);
        window.setTimeout(() => setShowBack(next), reduced ? 0 : FLIP_MS / 2);
        window.setTimeout(() => setFlipping(false), reduced ? 0 : FLIP_MS);
    }, [flipping, current, flipped, reduced]);

    // where the leaving card goes: past the edge of the viewport in its direction, as the app's cards leave the screen
    const flyTarget = useCallback((dir: Dir, from: Point): Point => {
        const box = stackRef.current?.getBoundingClientRect();
        const vw = window.innerWidth; const vh = window.innerHeight;
        const w = box?.width ?? 320; const h = box?.height ?? w / 0.68;
        const left = box?.left ?? (vw - w) / 2; const top = box?.top ?? (vh - h) / 2;
        if (dir === 'left') return { x: -(left + w + 60), y: from.y };
        if (dir === 'right') return { x: vw - left + 60, y: from.y };
        if (dir === 'up') return { x: from.x, y: -(top + h + 60) };
        return { x: from.x, y: vh - top + 60 };
    }, []);

    const rate = useCallback((r: Rating, from: Point = { x: 0, y: 0 }) => {
        const now = performance.now();
        if (!current || flipping || now < lockedUntil.current) return;
        lockedUntil.current = now + 260;
        const dir = DIR[r];
        exits.current.set(current.id, { dir, to: flyTarget(dir, from) });
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
        // the next card takes the front at once; the rated one flies off on its own
        setFlipped(false); setShowBack(false);
        setIndex(index + 1);
        if (index + 1 >= cards.length) {
            const perfect = missed.length === 0 && strong;
            window.setTimeout(() => { setDone(true); window.setTimeout(() => kips.current?.sessionComplete(perfect), 200); }, reduced ? 0 : FLY_S * 1000 + 60);
        }
    }, [current, flipping, run, index, cards.length, reduced, missed.length, flyTarget]);

    const rateDir = useCallback((dir: Dir, from: Point) => rate(RATING[dir], from), [rate]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (done || (e.target as HTMLElement)?.tagName === 'INPUT') return;
            if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); flip(); return; }
            const map: Record<string, Rating> = { '1': 'again', '2': 'hard', '3': 'good', '4': 'easy', ArrowLeft: 'again', ArrowUp: 'hard', ArrowDown: 'good', ArrowRight: 'easy' };
            if (map[e.key]) { e.preventDefault(); rate(map[e.key]); }
        };
        window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey);
    }, [flip, rate, done]);

    const restart = () => {
        exits.current.clear();
        setIndex(0); setEnergy(25); setRun(0); setMissed([]); setFlipped(false); setShowBack(false); setDone(false);
    };
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
                <div className="ls-stack" ref={stackRef} style={{ perspective: 1400 }}>
                    <AnimatePresence initial={false}>
                        {visible.map((card, depth) => (
                            <StackCard
                                key={card.id}
                                card={card}
                                depth={depth}
                                flipped={depth === 0 && flipped}
                                showBack={depth === 0 && showBack}
                                reduced={reduced}
                                labels={r}
                                exitFor={exitFor}
                                onFlip={flip}
                                onRate={rateDir}
                            />
                        ))}
                    </AnimatePresence>
                </div>
                <AnimatePresence>
                    {combo && <motion.div className="ls-combo" role="status" initial={{ opacity: 0, scale: 0.6, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ type: 'spring', stiffness: 520, damping: 26 }}>{fmt(r.inARow, combo)}</motion.div>}
                </AnimatePresence>
            </div>

            <div className="ls-controls">
                <div className="ls-kips"><Kips ref={kips} poster="neutral" size={124} priority /></div>
                {(['again', 'hard', 'good', 'easy'] as Rating[]).map((k) => (
                    <button key={k} type="button" className={`ls-btn ls-btn--${k}`} onClick={() => rate(k)} disabled={!current}>{r[k]}</button>
                ))}
            </div>
            <p className="ls-hint">{r.keys}</p>
        </div>
    );
}
