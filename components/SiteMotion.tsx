'use client';

import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { usePathname } from 'next/navigation';

export function RouteLoader() {
    const pathname = usePathname();
    const prefersReducedMotion = useReducedMotion();

    if (prefersReducedMotion) {
        return (
            <motion.div
                key={pathname}
                className="route-loader"
                aria-hidden="true"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.45, ease: 'easeOut', times: [0, 0.35, 1] }}
            />
        );
    }

    return (
        <motion.div
            key={pathname}
            className="route-loader"
            aria-hidden="true"
            initial={{ opacity: 1, scaleX: 0 }}
            animate={{ opacity: [1, 1, 1, 0], scaleX: [0, 0.72, 1, 1] }}
            transition={{ duration: 0.8, ease: 'easeOut', times: [0, 0.55, 0.82, 1] }}
        />
    );
}

export function PageTransition({ children }: { children: ReactNode }) {
    const prefersReducedMotion = useReducedMotion();

    return (
        <motion.div
            className="page-transition"
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.3 : 0.48, ease: 'easeOut' }}
        >
            {children}
        </motion.div>
    );
}

export function SiteMotion() {
    return <RouteLoader />;
}

export default SiteMotion;
