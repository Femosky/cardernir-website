'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';

const APP_STORE_URL = 'https://apps.apple.com/app/cardernir/id6772876444';

const DESKTOP_MEMORY_CURVE_PATH =
    'M3.50085 3.50085C53.5008 26.5008 85.5008 116.501 128.501 236.501C163.501 166.501 189.501 81.5008 223.501 43.5008C271.501 76.5008 301.501 161.501 330.501 241.501C365.501 161.501 401.501 69.5008 441.501 23.5008C493.501 59.5008 538.501 151.501 593.501 223.501';
const DESKTOP_MEMORY_AREA_PATH =
    'M0 0C50 23 82 113 125 233C160 163 186 78 220 40C268 73 298 158 327 238C362 158 398 66 438 20C490 56 535 148 590 220V338H0V0Z';
const MOBILE_MEMORY_CURVE_PATH =
    'M3.00034 3.00034C35.0003 24.0003 55.0003 108 81.0003 183C108 128 128 60.0003 153 34.0003C186 68.0003 205 136 225 184C257 118 283 48.0003 313 20.0003C333 56.0003 348 114 357 162';

function classNames(...values: Array<string | undefined>) {
    return values.filter(Boolean).join(' ');
}

export function Reveal({ children, className }: { children: ReactNode; className?: string }) {
    const prefersReducedMotion = useReducedMotion();

    return (
        <motion.div
            className={classNames('reveal', className)}
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.16, once: true }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
        >
            {children}
        </motion.div>
    );
}

function introTransition(index: number, reducedMotion: boolean) {
    return {
        delay: index * 0.075,
        duration: reducedMotion ? 0.35 : Math.min(0.5 + index * 0.05, 0.75),
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    };
}

export function HeroIntro() {
    const prefersReducedMotion = Boolean(useReducedMotion());
    const initial = { opacity: 0, y: prefersReducedMotion ? 0 : 14 };
    const animate = { opacity: 1, y: 0 };

    return (
        <div className="hero-intro">
            <motion.p
                className="hero-intro__eyebrow"
                initial={initial}
                animate={animate}
                transition={introTransition(0, prefersReducedMotion)}
            >
                FRENCH VOCABULARY · BUILT TO STICK
            </motion.p>

            <motion.h1
                id="hero-title"
                className="hero-intro__headline"
                initial={initial}
                animate={animate}
                transition={introTransition(1, prefersReducedMotion)}
            >
                French vocabulary that comes back before it fades.
            </motion.h1>

            <motion.p
                className="hero-intro__body hero-intro__body--desktop"
                initial={initial}
                animate={animate}
                transition={introTransition(2, prefersReducedMotion)}
            >
                Cardernir uses FSRS spaced repetition to bring each card back when review is most useful, so difficult
                words return sooner and strong memories get more space.
            </motion.p>

            <motion.p
                className="hero-intro__body hero-intro__body--mobile"
                initial={initial}
                animate={animate}
                transition={introTransition(2, prefersReducedMotion)}
            >
                Cardernir uses FSRS spaced repetition to bring difficult words back sooner and give stronger memories
                more space.
            </motion.p>

            <motion.div
                className="hero-intro__actions"
                initial={initial}
                animate={animate}
                transition={introTransition(3, prefersReducedMotion)}
            >
                <Link
                    className="hero-intro__app-store-link"
                    href={APP_STORE_URL}
                    aria-label="Download Cardernir on the App Store"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        className="hero-intro__app-store-badge"
                        src="/download-on-app-store.png"
                        alt=""
                        width={496}
                        height={172}
                        sizes="(max-width: 600px) 174px, 188px"
                        preload
                    />
                </Link>
                <Link className="hero-intro__scroll-cue" href="#spaced-repetition">
                    See how review works <span aria-hidden="true">↓</span>
                </Link>
            </motion.div>

            <motion.p
                className="hero-intro__note"
                initial={initial}
                animate={animate}
                transition={introTransition(4, prefersReducedMotion)}
            >
                Free to start · No account required
            </motion.p>
        </div>
    );
}

const HERO_VIDEO_LABEL =
    'Cardernir review session showing a French vocabulary card and the Again, Hard, Good, and Easy recall choices';

function HeroVideo({ reducedMotion }: { reducedMotion: boolean }) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;

        if (!video || reducedMotion) {
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
                    void video.play().catch(() => undefined);
                } else {
                    video.pause();
                }
            },
            { threshold: [0, 0.2, 1] },
        );

        observer.observe(video);
        return () => observer.disconnect();
    }, [reducedMotion]);

    if (reducedMotion) {
        return (
            <Image
                className="hero-stage__poster"
                src="/cardernir-hero-video-poster.webp"
                alt={HERO_VIDEO_LABEL}
                width={1180}
                height={2392}
                sizes="(max-width: 700px) 173px, (max-width: 900px) 260px, 306px"
            />
        );
    }

    return (
        <video
            ref={videoRef}
            className="hero-stage__video"
            aria-label={HERO_VIDEO_LABEL}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/cardernir-hero-video-poster.webp"
        >
            <source src="/cardernir-hero-video-web.mp4" type="video/mp4" />
        </video>
    );
}

export function HeroStage() {
    const prefersReducedMotion = Boolean(useReducedMotion());

    return (
        <motion.div
            className="hero-stage"
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: prefersReducedMotion ? 0.35 : 0.7, ease: 'easeOut' }}
        >
            <div className="hero-stage__surface">
                <div className="hero-stage__grid" aria-hidden="true" />

                <div className="hero-stage__media">
                    <HeroVideo reducedMotion={prefersReducedMotion} />
                </div>
            </div>
        </motion.div>
    );
}

function DesktopMemoryCurve({ reducedMotion, gradientId }: { reducedMotion: boolean; gradientId: string }) {
    return (
        <svg
            className="memory-curve__svg memory-curve__svg--desktop"
            viewBox="0 0 620 650"
            aria-hidden="true"
            focusable="false"
        >
            <defs>
                <linearGradient id={gradientId} x1="295" y1="0" x2="295" y2="338" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#69d0ff" stopOpacity="0.28" />
                    <stop offset="1" stopColor="#69d0ff" stopOpacity="0" />
                </linearGradient>
            </defs>

            <text className="memory-curve__axis-label memory-curve__axis-label--strength" x="0" y="17">
                RECALL STRENGTH
            </text>
            <text className="memory-curve__axis-label memory-curve__axis-label--time" x="620" y="17" textAnchor="end">
                TIME
            </text>

            {[92, 180, 268, 356].map((y) => (
                <line className="memory-curve__grid-line" x1="10" y1={y} x2="610" y2={y} key={y} />
            ))}
            <line className="memory-curve__review-window" x1="10" y1="356" x2="610" y2="356" />
            <text className="memory-curve__review-window-label" x="16" y="348">
                review window
            </text>

            <path
                className="memory-curve__area"
                d={DESKTOP_MEMORY_AREA_PATH}
                fill={`url(#${gradientId})`}
                transform="translate(10 92)"
            />
            <motion.path
                className="memory-curve__line"
                d={DESKTOP_MEMORY_CURVE_PATH}
                fill="none"
                stroke="currentColor"
                strokeWidth="7"
                strokeLinecap="round"
                transform="translate(6.49915 88.49915)"
                initial={reducedMotion ? false : { pathLength: 0 }}
                animate={reducedMotion ? { pathLength: 1 } : undefined}
                whileInView={reducedMotion ? undefined : { pathLength: 1 }}
                viewport={{ amount: 0.5, once: true }}
                transition={{ duration: reducedMotion ? 0 : 1.4, ease: 'easeOut' }}
            />

            {[
                [135, 325],
                [337, 330],
                [600, 312],
            ].map(([cx, cy]) => (
                <circle
                    className="memory-curve__marker"
                    cx={cx}
                    cy={cy}
                    r="5.5"
                    stroke="currentColor"
                    strokeWidth="5"
                    key={`${cx}-${cy}`}
                />
            ))}
            {[
                [135, 'Review 1'],
                [337, 'Review 2'],
                [600, 'Review 3'],
            ].map(([x, label]) => (
                <text className="memory-curve__review-label" x={x} y="476" textAnchor="middle" key={label}>
                    {label}
                </text>
            ))}

            <line className="memory-curve__separator" x1="0" y1="522" x2="620" y2="522" />
            <text className="memory-curve__caption memory-curve__caption--desktop" x="0" y="570">
                Each answer changes the next interval. A fixed calendar does not.
            </text>
        </svg>
    );
}

function MobileMemoryCurve({ reducedMotion }: { reducedMotion: boolean }) {
    return (
        <svg
            className="memory-curve__svg memory-curve__svg--mobile"
            viewBox="0 0 354 315"
            aria-hidden="true"
            focusable="false"
        >
            {[45, 110, 175, 240].map((y) => (
                <line className="memory-curve__grid-line" x1="0" y1={y} x2="354" y2={y} key={y} />
            ))}
            <line className="memory-curve__review-window" x1="0" y1="240" x2="354" y2="240" />
            <motion.path
                className="memory-curve__line"
                d={MOBILE_MEMORY_CURVE_PATH}
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="round"
                transform="translate(-3.00034 41.99966)"
                initial={reducedMotion ? false : { pathLength: 0 }}
                animate={reducedMotion ? { pathLength: 1 } : undefined}
                whileInView={reducedMotion ? undefined : { pathLength: 1 }}
                viewport={{ amount: 0.5, once: true }}
                transition={{ duration: reducedMotion ? 0 : 1.4, ease: 'easeOut' }}
            />

            {[
                [78, 225],
                [222, 226],
                [354, 204],
            ].map(([cx, cy]) => (
                <circle
                    className="memory-curve__marker"
                    cx={cx}
                    cy={cy}
                    r="4.5"
                    stroke="currentColor"
                    strokeWidth="4"
                    key={`${cx}-${cy}`}
                />
            ))}
            <text className="memory-curve__caption memory-curve__caption--mobile" x="0" y="286">
                Each answer changes the next interval.
            </text>
        </svg>
    );
}

export function MemoryCurve({ className }: { className?: string }) {
    const prefersReducedMotion = useReducedMotion();
    const gradientId = 'memory-curve-area-gradient';

    return (
        <figure
            className={classNames('memory-curve', className)}
            role="img"
            aria-label="Recall strength falls over time and is restored after three spaced reviews"
        >
            <DesktopMemoryCurve reducedMotion={Boolean(prefersReducedMotion)} gradientId={gradientId} />
            <MobileMemoryCurve reducedMotion={Boolean(prefersReducedMotion)} />
        </figure>
    );
}
