'use client';

import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import Image from 'next/image';
import { Alignment, Fit, Layout, useRive } from '@rive-app/react-canvas';
import { useReducedMotion } from 'motion/react';
import { useKipsSource, useDeferredStart } from '@/lib/kipsFile';

/** Kips, running on the app's own Rive file: the same state machine and data-binding triggers the app drives.
 *  `intro` names a trigger to fire once the machine has settled into Idle (the hero's `heroHello` wave, say); the
 *  state machine then blends back into Idle on its own, so there is no seam where the greeting ends. */
export type KipsHandle = {
    correct: () => void;
    wrong: () => void;
    hard: () => void;
    combo: (tier: 1 | 2 | 3 | 4) => void;
    sessionComplete: (perfect?: boolean) => void;
    premium: () => void;
    /** One of the idle fidgets by index (1 look around, 2 check the time, 3 foot tap, 4 look up, 5 sigh, 6 peek, 7 trunk twirl, 8 yawn). */
    fidget: (index: number) => void;
};

type KipsProps = {
    className?: string;
    /** Kept for call sites; the still shown until the runtime is ready is always the artboard's own rest capture,
     *  which has the runtime's exact framing (the character-sheet stills are cropped tighter and jumped in size). */
    poster?: 'hello_wave' | 'happy_joy' | 'excited_open' | 'neutral' | 'cheer_arms_up';
    size?: number;
    priority?: boolean;
    onReady?: () => void;
    /** A trigger to fire once, right after load (`heroHello`): the one-shot plays and blends back into Idle. */
    intro?: string;
};

/* The runtime drops a trigger fired while the machine is still blending into a state (the app waits this out too). */
const SETTLE_MS = 450;

export const Kips = forwardRef<KipsHandle, KipsProps>(function Kips(
    { className, size = 360, priority = false, onReady, intro },
    ref,
) {
    const reducedMotion = useReducedMotion();
    const [ready, setReady] = useState(false);
    const settledAt = useRef(0);
    const box = useRef<HTMLDivElement>(null);
    // the hero (`priority`) is created at once; the others in idle time after load (never on scroll), all from the page's one shared file
    const near = useDeferredStart(priority);
    const source = useKipsSource();

    const { rive, RiveComponent } = useRive(
        reducedMotion || !near || !source
            ? null
            : {
                  ...source,
                  artboard: 'Elephant_v3',
                  stateMachine: 'ElephantStateMachine',
                  autoBind: true,
                  autoplay: true,
                  layout: new Layout({ fit: Fit.Contain, alignment: Alignment.BottomCenter }),
                  onLoad: () => {
                      settledAt.current = Date.now() + SETTLE_MS;
                      // the first paint can land before the canvas has taken its CSS size; show it two frames later
                      requestAnimationFrame(() => requestAnimationFrame(() => { setReady(true); onReady?.(); }));
                  },
              },
        { fitCanvasToArtboardHeight: false },
    );

    // the intro: one trigger, fired once the machine has settled into Idle (a trigger fired mid-blend is dropped)
    useEffect(() => {
        if (!rive || !intro) return;
        const wait = Math.max(0, settledAt.current - Date.now());
        const t = window.setTimeout(() => { rive.viewModelInstance?.trigger(intro)?.trigger(); settledAt.current = Date.now() + SETTLE_MS; }, wait);
        return () => window.clearTimeout(t);
    }, [rive, intro]);

    // a moment asked for before the player exists (it is created near the viewport, and the page fires its
    // appear reaction as it scrolls in) is held and played once the player has loaded, instead of being dropped
    const pending = useRef<{ name: string; setup?: () => void } | null>(null);
    const fire = useCallback(
        (name: string, setup?: () => void) => {
            const vm = rive?.viewModelInstance;
            if (!vm || !ready) { pending.current = { name, setup }; return; }
            const go = () => { setup?.(); vm.trigger(name)?.trigger(); settledAt.current = Date.now() + SETTLE_MS; };
            const wait = settledAt.current - Date.now();
            if (wait > 0) window.setTimeout(go, wait); else go();
        },
        [rive, ready],
    );
    useEffect(() => {
        if (!ready || !rive?.viewModelInstance || !pending.current) return;
        const { name, setup } = pending.current; pending.current = null;
        fire(name, setup);
    }, [ready, rive, fire]);

    useImperativeHandle(
        ref,
        () => ({
            correct: () => fire('answerCorrect'),
            wrong: () => fire('answerWrong'),
            hard: () => fire('answerHard'),
            combo: (tier) => fire('comboReached', () => { const n = rive?.viewModelInstance?.number('comboTier'); if (n) n.value = tier; }),
            sessionComplete: (perfect = false) => fire('sessionCompleted', () => { const b = rive?.viewModelInstance?.boolean('sessionPerfect'); if (b) b.value = perfect; }),
            premium: () => fire('premiumActivated'),
            fidget: (index) => fire('fidget', () => { const n = rive?.viewModelInstance?.number('fidgetIndex'); if (n) n.value = index; }),
        }),
        [fire, rive],
    );

    useEffect(() => { rive?.resizeDrawingSurfaceToCanvas(); }, [rive, ready]);
    useEffect(() => () => rive?.cleanup(), [rive]);

    return (
        <div ref={box} className={['kips', className].filter(Boolean).join(' ')} style={{ width: size, height: size }} aria-hidden="true">
            {!reducedMotion && <RiveComponent className="kips__canvas" style={{ visibility: ready ? 'visible' : 'hidden' }} />}
            <Image
                className="kips__poster"
                src="/kips/rest.webp"
                alt=""
                width={size}
                height={size}
                priority={priority}
                style={{ visibility: ready && !reducedMotion ? 'hidden' : 'visible' }}
            />
        </div>
    );
});
