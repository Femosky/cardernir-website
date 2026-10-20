import type { LocaleCode } from './locales';
import { en, type Dictionary } from './dictionaries/en';

const loaders: Partial<Record<LocaleCode, () => Promise<Dictionary>>> = {
    fr: () => import('./dictionaries/fr').then((m) => m.fr),
    de: () => import('./dictionaries/de').then((m) => m.de),
    es: () => import('./dictionaries/es').then((m) => m.es),
    it: () => import('./dictionaries/it').then((m) => m.it),
    'pt-BR': () => import('./dictionaries/pt-BR').then((m) => m.ptBR),
    'pt-PT': () => import('./dictionaries/pt-PT').then((m) => m.ptPT),
    id: () => import('./dictionaries/id').then((m) => m.id),
    ja: () => import('./dictionaries/ja').then((m) => m.ja),
    ko: () => import('./dictionaries/ko').then((m) => m.ko),
    'zh-Hans': () => import('./dictionaries/zh-Hans').then((m) => m.zhHans),
    'zh-Hant': () => import('./dictionaries/zh-Hant').then((m) => m.zhHant),
};

export async function getDictionary(code: LocaleCode): Promise<Dictionary> {
    const load = loaders[code];
    if (!load) return en;
    try {
        return await load();
    } catch {
        return en; // a locale without a dictionary yet falls back to English
    }
}

export type { Dictionary };
