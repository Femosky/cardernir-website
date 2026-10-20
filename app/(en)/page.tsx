import { HomePage } from '@/components/site/HomePage';
import { StructuredData } from '@/components/site/StructuredData';
import { en } from '@/lib/i18n/dictionaries/en';

export default function Home() {
    return (
        <>
            <StructuredData locale="en" t={en} />
            <HomePage t={en} locale="en" />
        </>
    );
}
