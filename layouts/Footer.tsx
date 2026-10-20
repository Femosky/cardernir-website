import Link from 'next/link';
import { ElephantMark } from '@/components/ElephantMark';
import { LanguageSelect } from '@/components/site/LanguageSelect';
import { homePath, type LocaleCode } from '@/lib/i18n/locales';
import type { Dictionary } from '@/lib/i18n';

export function Footer({ locale, t }: { locale: LocaleCode; t: Dictionary }) {
    const year = new Date().getFullYear();
    return (
        <footer className="ft">
            <div className="shell ft__row">
                <Link className="ft__brand" href={homePath(locale)} aria-label="Cardernir home">
                    <ElephantMark className="ft__mark" tone="onAccent" />
                    <span>Cardernir</span>
                </Link>
                <nav className="ft__links" aria-label="Footer navigation">
                    <Link href="/support">{t.footer.support}</Link>
                    <Link href="/terms">{t.footer.terms}</Link>
                    <Link href="/privacy">{t.footer.privacy}</Link>
                    <a href="mailto:support@cardernir.app">{t.footer.contact}</a>
                </nav>
                <LanguageSelect locale={locale} label={t.footer.language} />
            </div>
            <p className="shell ft__bottom">{t.footer.made} · © <time dateTime={String(year)}>{year}</time> Cardernir</p>
        </footer>
    );
}
