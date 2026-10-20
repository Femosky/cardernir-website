import { NextResponse, type NextRequest } from 'next/server';
import { LOCALES, type LocaleInfo } from '@/lib/i18n/locales';

/* First visit to "/" with no remembered language: send the browser to its own language's home.
   Crawlers and anyone who has picked a language (cookie) are left alone; hreflang handles the rest. */
const BOT = /bot|crawl|spider|slurp|facebookexternalhit|preview|fetch|headless|lighthouse/i;

function pick(acceptLanguage: string): LocaleInfo | undefined {
    const tags = acceptLanguage
        .split(',')
        .map((part, i) => { const [tag, ...params] = part.trim().split(';'); const q = Number(params.find((p) => p.trim().startsWith('q='))?.split('=')[1] ?? 1); return { tag: tag.toLowerCase(), q: Number.isFinite(q) ? q : 0, i }; })
        .filter((t) => t.tag && t.q > 0)
        .sort((a, b) => b.q - a.q || a.i - b.i);
    for (const { tag } of tags) {
        const [lang, region] = tag.split('-');
        if (lang === 'zh') {
            const trad = region === 'tw' || region === 'hk' || region === 'mo' || region === 'hant';
            return LOCALES.find((l) => l.code === (trad ? 'zh-Hant' : 'zh-Hans'));
        }
        if (lang === 'pt') return LOCALES.find((l) => l.code === (region === 'pt' ? 'pt-PT' : 'pt-BR'));
        const exact = LOCALES.find((l) => l.hreflang.toLowerCase() === tag);
        if (exact) return exact;
        const base = LOCALES.find((l) => l.hreflang.toLowerCase() === lang);
        if (base) return base;
    }
    return undefined;
}

export function proxy(request: NextRequest) {
    if (request.cookies.get('NEXT_LOCALE')) return NextResponse.next();
    if (BOT.test(request.headers.get('user-agent') ?? '')) return NextResponse.next();
    const match = pick(request.headers.get('accept-language') ?? '');
    if (!match || match.code === 'en') return NextResponse.next();
    const url = request.nextUrl.clone();
    url.pathname = `/${match.path}`;
    const res = NextResponse.redirect(url, 307);
    res.cookies.set('NEXT_LOCALE', match.code, { path: '/', maxAge: 60 * 60 * 24 * 365, sameSite: 'lax' });
    return res;
}

export const config = { matcher: '/' };
