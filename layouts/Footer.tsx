import Link from 'next/link';
import { ElephantMark } from '@/components/ElephantMark';
import { LOCALES, homePath, type LocaleCode } from '@/lib/i18n/locales';
import type { Dictionary } from '@/lib/i18n';

export function Footer({ locale, t }: { locale: LocaleCode; t: Dictionary }) {
    const year = new Date().getFullYear();
    return (
        <footer className="site-footer">
            <div className="page-shell footer-inner">
                <div className="footer-top">
                    <Link className="footer-brand" href={homePath(locale)} aria-label="Cardernir home">
                        <ElephantMark className="footer-brand-mark" tone="onAccent" />
                        <span className="footer-brand-text">Cardernir</span>
                    </Link>
                    <nav className="footer-links" aria-label="Footer navigation">
                        <Link href="/support">{t.footer.support}</Link>
                        <Link href="/terms">{t.footer.terms}</Link>
                        <Link href="/privacy">{t.footer.privacy}</Link>
                        <a className="footer-contact" href="mailto:support@cardernir.app">{t.footer.contact}</a>
                    </nav>
                </div>
                <nav className="footer-langs" aria-label={t.footer.language}>
                    <span className="footer-langs__label">{t.footer.language}</span>
                    <ul>
                        {LOCALES.map((l) => (
                            <li key={l.code}><Link href={homePath(l.code)} lang={l.hreflang} aria-current={l.code === locale ? 'page' : undefined}>{l.label}</Link></li>
                        ))}
                    </ul>
                </nav>
                <p className="footer-copyright">{t.footer.made} · © <time dateTime={String(year)}>{year}</time> Cardernir</p>
            </div>
        </footer>
    );
}
