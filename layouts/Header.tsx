'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="site-header">
            <nav className="page-shell header-nav" aria-label="Main navigation">
                <Link className="wordmark" href="/" aria-label="Cardernir home">
                    <Image src="/cardernirlogo.jpeg" alt="" width={36} height={36} priority />
                    Cardernir
                </Link>

                <button
                    className="menu-toggle"
                    type="button"
                    aria-expanded={menuOpen}
                    aria-controls="site-navigation"
                    aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                    onClick={() => setMenuOpen((open) => !open)}
                >
                    <span />
                    <span />
                </button>

                <div id="site-navigation" className="nav-links" data-open={menuOpen}>
                    <Link href="/support" onClick={() => setMenuOpen(false)}>Support</Link>
                    <Link href="/terms" onClick={() => setMenuOpen(false)}>Terms</Link>
                    <Link href="/privacy" onClick={() => setMenuOpen(false)}>Privacy</Link>
                    <Link
                        className="nav-download"
                        href="https://apps.apple.com/app/cardernir/id6772876444"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setMenuOpen(false)}
                    >
                        Download
                    </Link>
                </div>
            </nav>
        </header>
    );
}
