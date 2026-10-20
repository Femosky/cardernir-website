'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ElephantMark } from '@/components/ElephantMark';
import { APP_STORE_URL } from '@/lib/siteMetadata';
import { homePath, type LocaleCode } from '@/lib/i18n/locales';
import type { Dictionary } from '@/lib/i18n';

export function Header({ locale, t }: { locale: LocaleCode; t: Dictionary }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuButtonRef = useRef<HTMLButtonElement>(null);
    const home = homePath(locale);
    const closeMenu = () => setMenuOpen(false);

    useEffect(() => {
        if (!menuOpen) return;
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') { setMenuOpen(false); menuButtonRef.current?.focus(); }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [menuOpen]);

    return (
        <header className="site-header">
            <nav className="page-shell header-nav" aria-label="Main navigation">
                <Link className="wordmark" href={home} aria-label="Cardernir home" onClick={closeMenu}>
                    <ElephantMark className="wordmark-mark" />
                    <span className="wordmark-text">Cardernir</span>
                </Link>
                <button ref={menuButtonRef} className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="site-navigation" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} onClick={() => setMenuOpen((open) => !open)}>
                    <span className="menu-toggle-line" />
                    <span className="menu-toggle-line" />
                </button>
                <div id="site-navigation" className="nav-links" data-open={menuOpen}>
                    <Link className="nav-anchor" href={`${home}#learn`} onClick={closeMenu}>{t.nav.learn}</Link>
                    <Link className="nav-anchor" href={`${home}#streak`} onClick={closeMenu}>{t.nav.streaks}</Link>
                    <Link className="nav-anchor" href={`${home}#decks`} onClick={closeMenu}>{t.nav.decks}</Link>
                    <Link className="nav-anchor" href={`${home}#kips`} onClick={closeMenu}>{t.nav.kips}</Link>
                    <Link href="/support" onClick={closeMenu}>{t.nav.support}</Link>
                    <Link className="nav-download" href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" onClick={closeMenu}>{t.nav.download}</Link>
                </div>
            </nav>
        </header>
    );
}
