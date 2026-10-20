import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header } from '@/layouts/Header';
import { Footer } from '@/layouts/Footer';
import { SetLang } from '@/components/site/SetLang';
import { getDictionary } from '@/lib/i18n';
import { LOCALES, localeFromPath } from '@/lib/i18n/locales';
import { homeMetadata } from '@/lib/siteMetadata';

export const dynamicParams = false;

export function generateStaticParams() {
    return LOCALES.filter((l) => l.path).map((l) => ({ locale: l.path }));
}

export async function generateMetadata({ params }: LayoutProps<'/[locale]'>): Promise<Metadata> {
    const { locale } = (await params) as { locale: string };
    const info = localeFromPath(locale);
    if (!info) return {};
    return homeMetadata(info.code, await getDictionary(info.code));
}

export default async function LocaleLayout({ children, params }: LayoutProps<'/[locale]'>) {
    const { locale } = (await params) as { locale: string };
    const info = localeFromPath(locale);
    if (!info || !info.path) notFound();
    const t = await getDictionary(info.code);
    return (
        <>
            <SetLang lang={info.hreflang} />
            <Header locale={info.code} t={t} />
            <div className="flex-1">{children}</div>
            <Footer locale={info.code} t={t} />
        </>
    );
}
