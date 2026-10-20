'use client';

import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import Image from 'next/image';
import { Alignment, EventType, Fit, Layout, useRive } from '@rive-app/react-canvas';
import { useReducedMotion } from 'motion/react';

/** Kips, running on the app's own Rive file.
 *  The site plays the file's linear animations directly (Idle, then an emote, then a hard cut back to Idle) instead
 *  of the state machine, whose transitions blend one pose into the next and read as a crossfade. */
export type KipsHandle = {
    correct: () => void;
    wrong: () => void;
    hard: () => void;
    combo: (tier: 1 | 2 | 3 | 4) => void;
    sessionComplete: (perfect?: boolean) => void;
    premium: () => void;
};

type KipsProps = {
    className?: string;
    /** Static art shown until the runtime is ready (and always, under reduced motion). */
    poster?: 'hello_wave' | 'happy_joy' | 'excited_open' | 'neutral' | 'cheer_arms_up';
    size?: number;
    priority?: boolean;
    onReady?: () => void;
    /** The resting animation to loop (Idle by default; Happy for a warmer stance). */
    idle?: string;
};

const IDLE = 'Idle';
/** Longest an emote may hold before Idle is forced back (covers moods that loop). */
const EMOTE_MAX_MS = 3600;

export const Kips = forwardRef<KipsHandle, KipsProps>(function Kips(
    { className, poster = 'neutral', size = 360, priority = false, onReady, idle = IDLE },
    ref,
) {
    const reducedMotion = useReducedMotion();
    const [ready, setReady] = useState(false);
    const switching = useRef(false);
    const timer = useRef<number | null>(null);

    const { rive, RiveComponent } = useRive(
        reducedMotion
            ? null
            : {
                  src: '/kips/kips.riv',
                  artboard: 'Elephant_v3',
                  animations: idle,
                  autoplay: true,
                  layout: new Layout({ fit: Fit.Contain, alignment: Alignment.BottomCenter }),
                  onLoad: () => {
                      setReady(true);
                      onReady?.();
                  },
              },
        { fitCanvasToArtboardHeight: false },
    );

    // a hard cut: stop whatever plays, start the emote; when it ends, cut back to Idle
    const cut = useCallback(
        (name: string) => {
            if (!rive) return;
            switching.current = true;
            rive.stop();
            rive.play(name);
            switching.current = false;
            if (timer.current) window.clearTimeout(timer.current);
            timer.current = window.setTimeout(() => {
                if (rive.playingAnimationNames.includes(name)) { switching.current = true; rive.stop(); rive.play(idle); switching.current = false; }
            }, EMOTE_MAX_MS);
        },
        [rive, idle],
    );

    useEffect(() => {
        if (!rive) return;
        const onStop = () => {
            if (switching.current) return;
            if (rive.playingAnimationNames.length === 0) rive.play(idle);
        };
        rive.on(EventType.Stop, onStop);
        return () => { rive.off(EventType.Stop, onStop); if (timer.current) window.clearTimeout(timer.current); };
    }, [rive, idle]);

    useImperativeHandle(
        ref,
        () => ({
            correct: () => cut('AnswerCorrect'),
            wrong: () => cut('AnswerWrong'),
            hard: () => cut('Worried'),
            combo: (tier) => cut(`Combo${tier}`),
            sessionComplete: (perfect = false) => cut(perfect ? 'SessionPerfect' : 'SessionComplete'),
            premium: () => cut('PremiumActivated'),
        }),
        [cut],
    );

    useEffect(() => () => rive?.cleanup(), [rive]);

    return (
        <div className={['kips', className].filter(Boolean).join(' ')} style={{ width: size, height: size }} aria-hidden="true">
            {!reducedMotion && <RiveComponent className="kips__canvas" style={{ visibility: ready ? 'visible' : 'hidden' }} />}
            <Image
                className="kips__poster"
                src={`/kips/${poster}.webp`}
                alt=""
                width={size}
                height={size}
                priority={priority}
                style={{ visibility: ready && !reducedMotion ? 'hidden' : 'visible' }}
            />
        </div>
    );
});
