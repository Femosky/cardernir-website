import { notFound } from 'next/navigation';
import { HomePage } from '@/components/site/HomePage';
import { StructuredData } from '@/components/site/StructuredData';
import { getDictionary } from '@/lib/i18n';
import { localeFromPath } from '@/lib/i18n/locales';

export default async function LocalizedHome({ params }: PageProps<'/[locale]'>) {
    const { locale } = (await params) as { locale: string };
    const info = localeFromPath(locale);
    if (!info || !info.path) notFound();
    const t = await getDictionary(info.code);
    return (
        <>
            <StructuredData locale={info.code} t={t} />
            <HomePage t={t} locale={info.code} />
        </>
    );
}
