import type { LegalDocument, LegalSection } from '@/content/legal';

function LegalSectionView({ section }: { section: LegalSection }) {
    return (
        <section id={section.id} className="scroll-mt-24 space-y-4">
            <h2 className="text-xl font-semibold tracking-tight text-neutral-950 sm:text-2xl">{section.title}</h2>

            {section.paragraphs?.map((paragraph, index) => (
                <p key={index} className="text-base leading-7 text-neutral-700 sm:text-[1.05rem]">
                    {paragraph}
                </p>
            ))}

            {section.bullets && (
                <ul className="list-disc space-y-2 pl-6 text-base leading-7 text-neutral-700 sm:text-[1.05rem]">
                    {section.bullets.map((bullet, index) => (
                        <li key={index} className="pl-1">
                            {bullet}
                        </li>
                    ))}
                </ul>
            )}

            {section.subsections && (
                <div className="space-y-8 border-l border-neutral-200 pl-5">
                    {section.subsections.map((subsection) => (
                        <LegalSectionView key={subsection.id} section={subsection} />
                    ))}
                </div>
            )}
        </section>
    );
}

export function LegalPage({ document }: { document: LegalDocument }) {
    return (
        <main className="min-h-screen bg-[#fff9f0] px-5 py-12 text-neutral-950 sm:px-6 lg:px-8">
            <article className="mx-auto max-w-3xl">
                <header className="mb-12 border-b border-neutral-200 pb-8">
                    <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">
                        Cardernir Legal
                    </p>

                    <h1 className="text-4xl font-bold tracking-tight text-neutral-950 sm:text-5xl">{document.title}</h1>

                    <div className="mt-5 space-y-1 text-sm text-neutral-600">
                        <p>
                            <span className="font-medium text-neutral-800">Last Updated:</span> {document.lastUpdated}
                        </p>
                        <p>
                            <span className="font-medium text-neutral-800">Effective Date:</span>{' '}
                            {document.effectiveDate}
                        </p>
                    </div>
                </header>

                {document.intro && (
                    <section className="mb-12 rounded-2xl border border-neutral-200 bg-white/70 p-6 shadow-sm">
                        <div className="space-y-4">
                            {document.intro.map((paragraph, index) => (
                                <p key={index} className="text-base leading-7 text-neutral-700 sm:text-[1.05rem]">
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </section>
                )}

                <div className="space-y-12">
                    {document.sections.map((section) => (
                        <LegalSectionView key={section.id} section={section} />
                    ))}
                </div>

                <footer className="mt-16 border-t border-neutral-200 pt-8 text-sm leading-6 text-neutral-600">
                    <p>
                        <span className="font-medium text-neutral-800">Developer:</span> {document.contact.developer}
                    </p>
                    <p>
                        <span className="font-medium text-neutral-800">Email:</span>{' '}
                        <a
                            href={`mailto:${document.contact.email}`}
                            className="font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-4 transition hover:decoration-neutral-900"
                        >
                            {document.contact.email}
                        </a>
                    </p>
                    <p>
                        <span className="font-medium text-neutral-800">Website:</span>{' '}
                        <a
                            href={document.contact.website}
                            className="font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-4 transition hover:decoration-neutral-900"
                        >
                            {document.contact.website}
                        </a>
                    </p>
                </footer>
            </article>
        </main>
    );
}
