'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { ElephantMark } from '@/components/ElephantMark';

const APP_STORE_URL = 'https://apps.apple.com/app/cardernir/id6772876444';

export function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuButtonRef = useRef<HTMLButtonElement>(null);

    const closeMenu = () => setMenuOpen(false);

    useEffect(() => {
        if (!menuOpen) {
            return;
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setMenuOpen(false);
                menuButtonRef.current?.focus();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [menuOpen]);

    return (
        <header className="site-header">
            <nav className="page-shell header-nav" aria-label="Main navigation">
                <Link className="wordmark" href="/" aria-label="Cardernir home" onClick={closeMenu}>
                    <ElephantMark className="wordmark-mark" />
                    <span className="wordmark-text">Cardernir</span>
                    <span className="wordmark-badge" aria-label="version 2.0">2.0</span>
                </Link>

                <button
                    ref={menuButtonRef}
                    className="menu-toggle"
                    type="button"
                    aria-expanded={menuOpen}
                    aria-controls="site-navigation"
                    aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                    onClick={() => setMenuOpen((open) => !open)}
                >
                    <span className="menu-toggle-line" />
                    <span className="menu-toggle-line" />
                </button>

                <div id="site-navigation" className="nav-links" data-open={menuOpen}>
                    <Link className="nav-anchor" href="/#learn" onClick={closeMenu}>
                        Learn
                    </Link>
                    <Link className="nav-anchor" href="/#focus" onClick={closeMenu}>
                        Focus
                    </Link>
                    <Link className="nav-anchor" href="/#energy" onClick={closeMenu}>
                        Energy
                    </Link>
                    <Link className="nav-anchor" href="/#streak" onClick={closeMenu}>
                        Streaks
                    </Link>
                    <Link href="/support" onClick={closeMenu}>
                        Support
                    </Link>
                    <Link
                        className="nav-download"
                        href={APP_STORE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={closeMenu}
                    >
                        Download
                    </Link>
                </div>
            </nav>
        </header>
    );
}
