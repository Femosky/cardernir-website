'use client';

import { useRef, type ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { Kips, type KipsHandle } from './Kips';
import { Phone } from './Phone';
import { APP_STORE_URL } from '@/lib/siteMetadata';

/* ------------------------------------------------------------------ scroll helpers
 * A Chapter is a tall section with a pinned, viewport-high stage. Its `progress` runs 0 → 1 as the chapter
 * scrolls through, and everything inside is a pure function of it (deterministic: the same scroll position
 * always draws the same frame). */
function Chapter({
    id,
    height,
    className,
    children,
}: {
    id?: string;
    height: number; // in viewport heights
    className?: string;
    children: (progress: MotionValue<number>) => ReactNode;
}) {
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
    return (
        <section id={id} ref={ref} className={['chapter', className].filter(Boolean).join(' ')} style={{ height: `${height}vh` }}>
            <div className="chapter__stage">{children(scrollYProgress)}</div>
        </section>
    );
}

/** Fades in over [a, b] and out over [c, d] of the chapter's progress, with a small rise on entry. */
function Caption({
    p,
    at,
    children,
    className,
}: {
    p: MotionValue<number>;
    at: [number, number, number, number];
    children: ReactNode;
    className?: string;
}) {
    const [a, b, c, d] = at;
    const opacity = useTransform(p, [a, b, c, d], [0, 1, 1, 0]);
    const y = useTransform(p, [a, b, c, d], [28, 0, 0, -20]);
    return (
        <motion.div className={['caption', className].filter(Boolean).join(' ')} style={{ opacity, y }}>
            {children}
        </motion.div>
    );
}

/* ------------------------------------------------------------------ chapters */

function Intro() {
    const kips = useRef<KipsHandle>(null);
    return (
        <Chapter height={280} className="chapter--intro">
            {(p) => <IntroStage p={p} kipsRef={kips} />}
        </Chapter>
    );
}

function IntroStage({ p, kipsRef }: { p: MotionValue<number>; kipsRef: React.RefObject<KipsHandle | null> }) {
    const scale = useTransform(p, [0, 0.6, 1], [1, 1, 0.86]);
    const y = useTransform(p, [0.6, 1], ['0vh', '4vh']);
    const cueOpacity = useTransform(p, [0, 0.06], [1, 0]);
    useMotionValueEvent(p, 'change', (v) => {
        if (v > 0.34 && v < 0.36) kipsRef.current?.correct();
    });
    return (
        <>
            <motion.div className="intro__kips" style={{ scale, y }}>
                <Kips ref={kipsRef} poster="neutral" size={520} priority />
            </motion.div>
            <Caption p={p} at={[0, 0.08, 0.26, 0.34]} className="caption--xl">
                <h1>Meet Kips.</h1>
            </Caption>
            <Caption p={p} at={[0.36, 0.44, 0.64, 0.72]} className="caption--l">
                <p>Your new study companion.</p>
                <p className="caption__sub">He learns beside you, cheers your right answers, and keeps you going when a word won&rsquo;t stick.</p>
            </Caption>
            <Caption p={p} at={[0.76, 0.84, 1, 1]} className="caption--l">
                <p>He lives in Cardernir 2.0.</p>
            </Caption>
            <motion.div className="scroll-cue" style={{ opacity: cueOpacity }} aria-hidden="true">
                Scroll
            </motion.div>
        </>
    );
}

function Home() {
    return (
        <Chapter height={260} className="chapter--home">
            {(p) => <HomeStage p={p} />}
        </Chapter>
    );
}

function HomeStage({ p }: { p: MotionValue<number> }) {
    const phoneY = useTransform(p, [0.08, 0.42], ['70vh', '0vh']);
    const phoneScale = useTransform(p, [0.42, 1], [1, 0.94]);
    const phoneOpacity = useTransform(p, [0.9, 1], [1, 0]);
    return (
        <>
            <Caption p={p} at={[0.04, 0.12, 0.5, 0.58]} className="caption--xl caption--top">
                <h2>French words.<br />Yours to keep.</h2>
            </Caption>
            <Caption p={p} at={[0.62, 0.7, 0.92, 1]} className="caption--l caption--top">
                <p>Ready-made flashcards.<br />Reviews that adapt to you.</p>
            </Caption>
            <motion.div className="home__phone" style={{ y: phoneY, scale: phoneScale, opacity: phoneOpacity }}>
                <Phone src="/app/home.webp" alt="Cardernir Home: Learn and Focus, a 47-day candle and 25 Energy" priority />
            </motion.div>
        </>
    );
}

function Learn() {
    return (
        <Chapter id="learn" height={380} className="chapter--learn chapter--dark">
            {(p) => <LearnStage p={p} />}
        </Chapter>
    );
}

function LearnStage({ p }: { p: MotionValue<number> }) {
    const rotateY = useTransform(p, [0.3, 0.46], [0, 180]);
    const cardX = useTransform(p, [0.8, 0.92], ['0%', '140%']);
    const cardRotate = useTransform(p, [0.8, 0.92], [0, 10]);
    const nextX = useTransform(p, [0.84, 0.96], ['-140%', '0%']);
    const nextOpacity = useTransform(p, [0.84, 0.9], [0, 1]);
    const goodScale = useTransform(p, [0.6, 0.66, 0.72], [1, 1.12, 1]);
    const goodGlow = useTransform(p, [0.6, 0.66, 0.8], [0, 1, 0]);
    const stampOpacity = useTransform(p, [0.66, 0.7], [0, 1]);
    const frontOpacity = useTransform(rotateY, [0, 89, 91, 180], [1, 1, 0, 0]);
    const backOpacity = useTransform(rotateY, [0, 89, 91, 180], [0, 0, 1, 1]);
    return (
        <>
            <Caption p={p} at={[0.02, 0.1, 0.24, 0.3]} className="caption--xl caption--top">
                <h2>Learn.</h2>
                <p className="caption__sub">A few new words a day.</p>
            </Caption>
            <Caption p={p} at={[0.32, 0.4, 0.54, 0.6]} className="caption--l caption--top">
                <p>Tap to reveal.</p>
            </Caption>
            <Caption p={p} at={[0.6, 0.68, 0.78, 0.84]} className="caption--l caption--top">
                <p>Rate it. FSRS does the timing.</p>
            </Caption>
            <Caption p={p} at={[0.86, 0.94, 1, 1]} className="caption--l caption--top">
                <p>Back before you forget it.</p>
            </Caption>

            <div className="learn__stage">
                <motion.div className="learn__card learn__card--next" style={{ x: nextX, opacity: nextOpacity }}>
                    <span className="learn__word">bonjour</span>
                    <span className="learn__hint">Tap to reveal</span>
                </motion.div>
                <motion.div className="learn__card-wrap" style={{ x: cardX, rotate: cardRotate }}>
                    <motion.div className="learn__card learn__card--flip" style={{ rotateY }}>
                        <motion.div className="learn__face" style={{ opacity: frontOpacity }}>
                            <span className="learn__word">être</span>
                            <span className="learn__hint">Tap to reveal</span>
                        </motion.div>
                        <motion.div className="learn__face learn__face--back" style={{ opacity: backOpacity }}>
                            <span className="learn__word learn__word--i">être</span>
                            <span className="learn__meaning"><small>Means</small>to be</span>
                        </motion.div>
                    </motion.div>
                    <motion.span className="learn__stamp" style={{ opacity: stampOpacity }} aria-hidden="true">Good</motion.span>
                </motion.div>
                <div className="learn__ratings" aria-hidden="true">
                    <span className="rating rating--again">Again</span>
                    <span className="rating rating--hard">Hard</span>
                    <motion.span className="rating rating--good" style={{ scale: goodScale, ['--glow' as string]: goodGlow }}>Good</motion.span>
                    <span className="rating rating--easy">Easy</span>
                </div>
            </div>
        </>
    );
}

const FOCUS_DECKS = [
    ['Survival Basics', '50 cards'], ['Articles, People, Objects', '50 cards'], ['Daily Verbs', '50 cards'],
    ['Questions, Time, Food', '50 cards'], ['Body, Family, Feelings', '50 cards'], ['At the Café', '50 cards'],
    ['Getting Around', '50 cards'], ['Shopping', '50 cards'],
];

function Focus() {
    return (
        <Chapter id="focus" height={260} className="chapter--focus">
            {(p) => <FocusStage p={p} />}
        </Chapter>
    );
}

function FocusStage({ p }: { p: MotionValue<number> }) {
    const x = useTransform(p, [0.15, 1], ['12vw', '-55vw']);
    return (
        <>
            <Caption p={p} at={[0.02, 0.1, 0.3, 0.38]} className="caption--xl caption--top">
                <h2>Focus.</h2>
                <p className="caption__sub">Pick a topic and go through it, card by card.</p>
            </Caption>
            <Caption p={p} at={[0.42, 0.5, 0.92, 1]} className="caption--l caption--top">
                <p>Know, or don&rsquo;t know. Missed cards come back at the end.<br />Focus never touches your Learn schedule.</p>
            </Caption>
            <motion.ul className="focus__row" style={{ x }} aria-hidden="true">
                {FOCUS_DECKS.map(([name, count], i) => (
                    <li key={name} className={`focus__deck focus__deck--${i % 4}`}>
                        <strong>{name}</strong>
                        <span>{count}</span>
                    </li>
                ))}
            </motion.ul>
        </>
    );
}

function Energy() {
    const kips = useRef<KipsHandle>(null);
    return (
        <Chapter id="energy" height={340} className="chapter--energy">
            {(p) => <EnergyStage p={p} kipsRef={kips} />}
        </Chapter>
    );
}

function EnergyStage({ p, kipsRef }: { p: MotionValue<number>; kipsRef: React.RefObject<KipsHandle | null> }) {
    const count = useTransform(p, [0.3, 0.62], [0, 5]);
    const countText = useTransform(count, (v): string => `${Math.min(5, Math.floor(v))}`);
    const ring = useTransform(count, [0, 5], [0, 1]);
    const calloutScale = useTransform(p, [0.64, 0.7], [0.4, 1]);
    const calloutOpacity = useTransform(p, [0.64, 0.68, 0.9, 0.96], [0, 1, 1, 0]);
    const energyText = useTransform(p, (v): string => (v < 0.68 ? '24' : '25'));
    const tokenY = useTransform(p, [0.66, 0.78], [120, 0]);
    const tokenOpacity = useTransform(p, [0.66, 0.7, 0.76, 0.8], [0, 1, 1, 0]);
    const fired = useRef(false);
    useMotionValueEvent(p, 'change', (v) => {
        if (v > 0.66 && !fired.current) { fired.current = true; kipsRef.current?.combo(1); }
        if (v < 0.5) fired.current = false;
    });
    return (
        <>
            <Caption p={p} at={[0.02, 0.1, 0.22, 0.28]} className="caption--xl caption--top">
                <h2>Every deck is free.</h2>
                <p className="caption__sub">New words use Energy. It refills on its own.</p>
            </Caption>
            <Caption p={p} at={[0.3, 0.38, 0.58, 0.64]} className="caption--l caption--top">
                <p>Five right in a row builds a combo.</p>
            </Caption>
            <Caption p={p} at={[0.68, 0.76, 0.94, 1]} className="caption--l caption--top">
                <p>Combos win your Energy back.</p>
            </Caption>

            <div className="energy__stage">
                <div className="energy__hud">
                    <span className="chip chip--energy"><span className="bolt" aria-hidden="true" /><motion.span>{energyText}</motion.span></span>
                </div>
                <div className="energy__ring" aria-hidden="true">
                    <svg viewBox="0 0 120 120">
                        <circle className="energy__ring-track" cx="60" cy="60" r="52" />
                        <motion.circle className="energy__ring-fill" cx="60" cy="60" r="52" style={{ pathLength: ring }} />
                    </svg>
                    <motion.span className="energy__count">{countText}</motion.span>
                    <span className="energy__label">in a row</span>
                </div>
                <motion.div className="energy__callout" style={{ scale: calloutScale, opacity: calloutOpacity }}>5 in a row!</motion.div>
                <motion.span className="energy__token bolt" style={{ y: tokenY, opacity: tokenOpacity }} aria-hidden="true" />
                <div className="energy__kips"><Kips ref={kipsRef} poster="neutral" size={220} /></div>
            </div>
        </>
    );
}

function Candle() {
    return (
        <Chapter id="streak" height={320} className="chapter--candle chapter--dark">
            {(p) => <CandleStage p={p} />}
        </Chapter>
    );
}

function CandleStage({ p }: { p: MotionValue<number> }) {
    const flame = useTransform(p, [0.1, 0.55], [0.35, 1]);
    const glow = useTransform(p, [0.1, 0.55], [0.1, 0.9]);
    const number = useTransform(p, (v): string => (v < 0.6 ? '46' : '47'));
    const numberY = useTransform(p, [0.58, 0.64], [16, 0]);
    return (
        <>
            <Caption p={p} at={[0.02, 0.1, 0.3, 0.36]} className="caption--xl caption--top">
                <h2>Keep the candle lit.</h2>
                <p className="caption__sub">Your streak burns down through the day.</p>
            </Caption>
            <Caption p={p} at={[0.38, 0.46, 0.66, 0.72]} className="caption--l caption--top">
                <p>A short session keeps it burning.</p>
            </Caption>
            <Caption p={p} at={[0.74, 0.82, 1, 1]} className="caption--l caption--top">
                <p>Widgets keep it in sight. Kips celebrates every milestone.</p>
            </Caption>
            <div className="candle" aria-hidden="true">
                <motion.div className="candle__glow" style={{ opacity: glow }} />
                <motion.svg className="candle__flame" viewBox="0 0 60 90" style={{ scaleY: flame, scaleX: flame }}>
                    <path className="candle__flame-outer" d="M30 2 C40 24 54 36 54 56 A24 24 0 0 1 6 56 C6 36 20 24 30 2 Z" />
                    <path className="candle__flame-inner" d="M30 30 C35 42 42 48 42 60 A12 12 0 0 1 18 60 C18 48 25 42 30 30 Z" />
                </motion.svg>
                <div className="candle__wick" />
                <div className="candle__wax"><motion.span className="candle__number" style={{ y: numberY }}>{number}</motion.span></div>
            </div>
        </>
    );
}

function Closing() {
    const kips = useRef<KipsHandle>(null);
    return (
        <section className="closing">
            <motion.div className="closing__kips" onViewportEnter={() => kips.current?.sessionComplete(true)} viewport={{ amount: 0.6, once: true }}>
                <Kips ref={kips} poster="cheer_arms_up" size={320} />
            </motion.div>
            <h2>Learn a little.<br />Remember a lot.</h2>
            <p>Free on the App Store. Kips is waiting.</p>
            <Link className="store-badge" href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" aria-label="Get Cardernir on the App Store">
                <Image src="/download-on-app-store.png" alt="" width={496} height={172} sizes="188px" />
            </Link>
            <p className="closing__note">3,850 French cards · Meanings in 12 languages · No account</p>
        </section>
    );
}

/* ------------------------------------------------------------------ reduced motion: the same story as plain slides */
function StaticStory() {
    return (
        <div className="static-story">
            <section className="static-slide"><Kips poster="neutral" size={360} /><h1>Meet Kips.</h1><p>Your new study companion. He learns beside you, cheers your right answers, and keeps you going when a word won&rsquo;t stick.</p></section>
            <section className="static-slide"><h2>French words. Yours to keep.</h2><p>Ready-made flashcards. Reviews that adapt to you.</p><Phone src="/app/home.webp" alt="Cardernir Home" /></section>
            <section className="static-slide static-slide--dark"><h2>Learn.</h2><p>A few new words a day, rated Again, Hard, Good or Easy. FSRS brings each one back before you forget it.</p><Phone src="/app/learn_lesson.webp" alt="A Learn session" /></section>
            <section className="static-slide"><h2>Focus.</h2><p>Pick a topic and go through it, card by card. Focus never touches your Learn schedule.</p><Phone src="/app/focus_lesson.webp" alt="A Focus session" /></section>
            <section className="static-slide"><h2>Every deck is free.</h2><p>New words use Energy, which refills on its own. Five right in a row builds a combo, and combos win your Energy back.</p></section>
            <section className="static-slide static-slide--dark"><h2>Keep the candle lit.</h2><p>Your streak burns down through the day. A short session keeps it burning, and widgets keep it in sight.</p><Phone src="/app/streak_sep.webp" alt="The streak screen" /></section>
            <Closing />
        </div>
    );
}

export function Presentation() {
    const reduced = useReducedMotion();
    if (reduced) return <StaticStory />;
    return (
        <>
            <Intro />
            <Home />
            <Learn />
            <Focus />
            <Energy />
            <Candle />
            <Closing />
        </>
    );
}
