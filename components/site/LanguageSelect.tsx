'use client';

import { useRouter } from 'next/navigation';
import { LOCALES, homePath, type LocaleCode } from '@/lib/i18n/locales';

/** Language picker. Remembers the choice in a cookie so the root URL stops auto-detecting. */
export function LanguageSelect({ locale, label, tone = 'dark' }: { locale: LocaleCode; label: string; tone?: 'dark' | 'light' }) {
    const router = useRouter();
    return (
        <label className={`lang lang--${tone}`}>
            <span className="vh">{label}</span>
            <svg className="lang__icon" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="1.8" /><path d="M2.5 10h15M10 2c2.6 2.4 2.6 13.6 0 16M10 2c-2.6 2.4-2.6 13.6 0 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
            <select value={locale} onChange={(e) => { const code = e.target.value as LocaleCode; document.cookie = `NEXT_LOCALE=${code}; path=/; max-age=31536000; samesite=lax`; router.push(homePath(code)); }}>
                {LOCALES.map((l) => <option key={l.code} value={l.code} lang={l.hreflang}>{l.label}</option>)}
            </select>
        </label>
    );
}
