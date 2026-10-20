'use client';

import { useRouter } from 'next/navigation';
import { LOCALES, homePath, type LocaleCode } from '@/lib/i18n/locales';

export function LanguageSelect({ locale, label }: { locale: LocaleCode; label: string }) {
    const router = useRouter();
    return (
        <label className="ft__lang">
            <span className="vh">{label}</span>
            <select value={locale} onChange={(e) => router.push(homePath(e.target.value as LocaleCode))}>
                {LOCALES.map((l) => <option key={l.code} value={l.code} lang={l.hreflang}>{l.label}</option>)}
            </select>
        </label>
    );
}
