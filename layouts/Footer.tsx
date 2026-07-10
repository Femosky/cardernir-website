import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
    return (
        <footer className="site-footer">
            <div className="page-shell footer-inner">
                <Link className="footer-brand" href="/" aria-label="Cardernir home">
                    <Image src="/cardernirlogo.jpeg" alt="" width={28} height={28} />
                    <span>Cardernir</span>
                </Link>

                <nav className="footer-links" aria-label="Footer navigation">
                    <Link href="/support">Support</Link>
                    <Link href="/terms">Terms</Link>
                    <Link href="/privacy">Privacy</Link>
                </nav>

                <p className="footer-copyright">© {new Date().getFullYear()} Cardernir</p>
            </div>
        </footer>
    );
}
