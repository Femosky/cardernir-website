'use client';

import { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';
import Image from 'next/image';
import { Alignment, Fit, Layout, useRive } from '@rive-app/react-canvas';
import { useReducedMotion } from 'motion/react';

/** Kips, running on the app's own Rive file. The same state machine the app drives. */
export type KipsHandle = {
    correct: () => void;
    wrong: () => void;
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
};

export const Kips = forwardRef<KipsHandle, KipsProps>(function Kips(
    { className, poster = 'neutral', size = 360, priority = false, onReady },
    ref,
) {
    const reducedMotion = useReducedMotion();
    const [ready, setReady] = useState(false);

    const { rive, RiveComponent } = useRive(
        reducedMotion
            ? null
            : {
                  src: '/kips/kips.riv',
                  artboard: 'Elephant_v3',
                  stateMachines: 'ElephantStateMachine',
                  autoplay: true,
                  autoBind: true,
                  layout: new Layout({ fit: Fit.Contain, alignment: Alignment.BottomCenter }),
                  onLoad: () => {
                      setReady(true);
                      onReady?.();
                  },
              },
        { fitCanvasToArtboardHeight: false },
    );

    const fire = useCallback(
        (name: string, setup?: () => void) => {
            const vm = rive?.viewModelInstance;
            if (!vm) return;
            setup?.();
            vm.trigger(name)?.trigger();
        },
        [rive],
    );

    useImperativeHandle(
        ref,
        () => ({
            correct: () => fire('answerCorrect'),
            wrong: () => fire('answerWrong'),
            combo: (tier) =>
                fire('comboReached', () => {
                    const n = rive?.viewModelInstance?.number('comboTier');
                    if (n) n.value = tier;
                }),
            sessionComplete: (perfect = false) =>
                fire('sessionCompleted', () => {
                    const b = rive?.viewModelInstance?.boolean('sessionPerfect');
                    if (b) b.value = perfect;
                }),
            premium: () => fire('premiumActivated'),
        }),
        [fire, rive],
    );

    useEffect(() => () => rive?.cleanup(), [rive]);

    return (
        <div className={['kips', className].filter(Boolean).join(' ')} style={{ width: size, height: size }} aria-hidden="true">
            {!reducedMotion && <RiveComponent className="kips__canvas" style={{ opacity: ready ? 1 : 0 }} />}
            <Image
                className="kips__poster"
                src={`/kips/${poster}.webp`}
                alt=""
                width={size}
                height={size}
                priority={priority}
                style={{ opacity: ready && !reducedMotion ? 0 : 1 }}
            />
        </div>
    );
});
