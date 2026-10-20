'use client';

import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import Image from 'next/image';
import { Alignment, EventType, Fit, Layout, useRive } from '@rive-app/react-canvas';
import { useReducedMotion } from 'motion/react';

/** Kips, running on the app's own Rive file: the same state machine and data-binding triggers the app drives.
 *  `intro` plays one of the file's linear animations first (the splash wave, say) and then hands over to Idle. */
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
    /** Linear-animation mode: play this animation once, then loop Idle. No state machine, no triggers. */
    intro?: string;
};

/* The runtime drops a trigger fired while the machine is still blending into a state (the app waits this out too). */
const SETTLE_MS = 450;

export const Kips = forwardRef<KipsHandle, KipsProps>(function Kips(
    { className, poster = 'neutral', size = 360, priority = false, onReady, intro },
    ref,
) {
    const reducedMotion = useReducedMotion();
    const [ready, setReady] = useState(false);
    const settledAt = useRef(0);

    const { rive, RiveComponent } = useRive(
        reducedMotion
            ? null
            : {
                  src: '/kips/kips.riv',
                  artboard: 'Elephant_v3',
                  ...(intro ? { animations: intro } : { stateMachines: 'ElephantStateMachine', autoBind: true }),
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

    // intro mode: when the intro ends, Idle takes over and loops
    useEffect(() => {
        if (!rive || !intro) return;
        const onStop = () => { if (rive.playingAnimationNames.length === 0) rive.play('Idle'); };
        rive.on(EventType.Stop, onStop);
        return () => rive.off(EventType.Stop, onStop);
    }, [rive, intro]);

    const fire = useCallback(
        (name: string, setup?: () => void) => {
            const vm = rive?.viewModelInstance;
            if (!vm) return;
            const go = () => { setup?.(); vm.trigger(name)?.trigger(); settledAt.current = Date.now() + SETTLE_MS; };
            const wait = settledAt.current - Date.now();
            if (wait > 0) window.setTimeout(go, wait); else go();
        },
        [rive],
    );

    useImperativeHandle(
        ref,
        () => ({
            correct: () => fire('answerCorrect'),
            wrong: () => fire('answerWrong'),
            hard: () => fire('answerHard'),
            combo: (tier) => fire('comboReached', () => { const n = rive?.viewModelInstance?.number('comboTier'); if (n) n.value = tier; }),
            sessionComplete: (perfect = false) => fire('sessionCompleted', () => { const b = rive?.viewModelInstance?.boolean('sessionPerfect'); if (b) b.value = perfect; }),
            premium: () => fire('premiumActivated'),
        }),
        [fire, rive],
    );

    useEffect(() => { rive?.resizeDrawingSurfaceToCanvas(); }, [rive, ready]);
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
