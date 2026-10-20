/** The app's twelve UI languages. English lives at `/`, every other locale at `/<path>`. */
export const LOCALES = [
    { code: 'en', path: '', label: 'English', hreflang: 'en', og: 'en_CA' },
    { code: 'fr', path: 'fr', label: 'Français', hreflang: 'fr', og: 'fr_FR' },
    { code: 'de', path: 'de', label: 'Deutsch', hreflang: 'de', og: 'de_DE' },
    { code: 'es', path: 'es', label: 'Español', hreflang: 'es', og: 'es_ES' },
    { code: 'it', path: 'it', label: 'Italiano', hreflang: 'it', og: 'it_IT' },
    { code: 'pt-BR', path: 'pt-br', label: 'Português (Brasil)', hreflang: 'pt-BR', og: 'pt_BR' },
    { code: 'pt-PT', path: 'pt-pt', label: 'Português (Portugal)', hreflang: 'pt-PT', og: 'pt_PT' },
    { code: 'id', path: 'id', label: 'Bahasa Indonesia', hreflang: 'id', og: 'id_ID' },
    { code: 'ja', path: 'ja', label: '日本語', hreflang: 'ja', og: 'ja_JP' },
    { code: 'ko', path: 'ko', label: '한국어', hreflang: 'ko', og: 'ko_KR' },
    { code: 'zh-Hans', path: 'zh-hans', label: '简体中文', hreflang: 'zh-Hans', og: 'zh_CN' },
    { code: 'zh-Hant', path: 'zh-hant', label: '繁體中文', hreflang: 'zh-Hant', og: 'zh_TW' },
] as const;

export type LocaleCode = (typeof LOCALES)[number]['code'];
export type LocaleInfo = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: LocaleCode = 'en';

export function localeFromPath(path: string): LocaleInfo | undefined {
    return LOCALES.find((l) => l.path === path.toLowerCase());
}

export function localeInfo(code: LocaleCode): LocaleInfo {
    return LOCALES.find((l) => l.code === code) ?? LOCALES[0];
}

/** The home URL path for a locale: '/' for English, '/fr' and so on for the rest. */
export function homePath(code: LocaleCode): string {
    const info = localeInfo(code);
    return info.path ? `/${info.path}` : '/';
}
