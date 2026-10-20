'use client';

import { useEffect, useRef, useState } from 'react';
import { Alignment, Fit, Layout, useRive } from '@rive-app/react-canvas';
import { useInView, useReducedMotion } from 'motion/react';

/* The app's streak candle, from the same Rive file: the StreakHero mood of the elephant's state machine shows the
   candle with the day's count; `streakIncremented` refuels it and counts up, exactly as the app does at the end of
   a day's first session. */
/** Today's count; the increment animation counts up from the day before. */
const COUNT = 47;

export function StreakHero({ size = 380 }: { size?: number }) {
    const reduced = useReducedMotion();
    const box = useRef<HTMLDivElement>(null);
    const inView = useInView(box, { once: true, amount: 0.6 });
    const [ready, setReady] = useState(false);
    const fired = useRef(false);

    const { rive, RiveComponent } = useRive(
        reduced
            ? null
            : {
                  src: '/kips/kips.riv',
                  artboard: 'Elephant_v3',
                  stateMachines: 'ElephantStateMachine',
                  autoplay: true,
                  autoBind: true,
                  layout: new Layout({ fit: Fit.Contain, alignment: Alignment.Center }),
                  onLoad: () => setReady(true),
              },
        { fitCanvasToArtboardHeight: false },
    );

    // the candle part-way through its day
    useEffect(() => {
        const vm = rive?.viewModelInstance;
        if (!rive || !vm) return;
        const mood = vm.enum('mood'); if (mood) mood.value = 'StreakHero';
        const count = vm.number('streakCount'); if (count) count.value = COUNT;
        const day = vm.number('dayProgress'); if (day) day.value = 0.6;
    }, [rive, ready]);

    // scrolled into view: the session is done, the candle refuels and the count goes up
    useEffect(() => {
        if (!inView || fired.current || !rive?.viewModelInstance) return;
        fired.current = true;
        const t = window.setTimeout(() => {
            const vm = rive.viewModelInstance; if (!vm) return;
            vm.trigger('streakIncremented')?.trigger();
            const day = vm.number('dayProgress'); if (day) day.value = 0; // the day's goal is done: the candle is whole again
        }, 900);
        return () => window.clearTimeout(t);
    }, [inView, rive, ready]);

    useEffect(() => () => rive?.cleanup(), [rive]);
    useEffect(() => { if (process.env.NODE_ENV !== 'production') (window as unknown as { __streak?: unknown }).__streak = rive; }, [rive]);

    return (
        <div ref={box} className="candle__win" aria-hidden="true">
            <div className="streak-hero" style={{ width: size, height: size }}>
                {!reduced && <RiveComponent className="streak-hero__canvas" style={{ visibility: ready ? 'visible' : 'hidden' }} />}
            </div>
        </div>
    );
}
