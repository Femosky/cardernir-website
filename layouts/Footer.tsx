import Link from 'next/link';

import { ElephantMark } from '@/components/ElephantMark';

export function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="site-footer">
            <div className="page-shell footer-inner">
                <Link className="footer-brand" href="/" aria-label="Cardernir home">
                    <ElephantMark className="footer-brand-mark" />
                    <span className="footer-brand-text">Cardernir</span>
                </Link>

                <nav className="footer-links" aria-label="Footer navigation">
                    <Link href="/support">Support</Link>
                    <Link href="/terms">Terms</Link>
                    <Link href="/privacy">Privacy</Link>
                    <a className="footer-contact" href="mailto:support@cardernir.app">
                        Contact
                    </a>
                </nav>

                <p className="footer-copyright">
                    © <time dateTime={String(year)}>{year}</time> Cardernir
                </p>
            </div>
        </footer>
    );
}
