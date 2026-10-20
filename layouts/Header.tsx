import Link from 'next/link';
import { ElephantMark } from '@/components/ElephantMark';
import { APP_STORE_URL } from '@/lib/siteMetadata';
import { homePath, type LocaleCode } from '@/lib/i18n/locales';
import type { Dictionary } from '@/lib/i18n';

export function Header({ locale, t }: { locale: LocaleCode; t: Dictionary }) {
    return (
        <header className="hd">
            <nav className="shell hd__row" aria-label="Main navigation">
                <Link className="hd__brand" href={homePath(locale)} aria-label="Cardernir home">
                    <ElephantMark className="hd__mark" />
                    <span>Cardernir</span>
                </Link>
                <div className="hd__links">
                    <Link className="hd__link" href="/support">{t.nav.support}</Link>
                    <Link className="btn" href={APP_STORE_URL} target="_blank" rel="noopener noreferrer">{t.nav.download}</Link>
                </div>
            </nav>
        </header>
    );
}
