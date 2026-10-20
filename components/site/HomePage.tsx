import Image from 'next/image';
import Link from 'next/link';
import { Lesson } from '@/components/lesson/Lesson';
import { KipsLive } from '@/components/site/KipsLive';
import { Phone } from '@/components/site/Phone';
import { MemoryCurve } from '@/components/HomeMotion';
import { APP_STORE_URL } from '@/lib/siteMetadata';
import { LOCALES, type LocaleCode } from '@/lib/i18n/locales';
import type { Dictionary } from '@/lib/i18n';

function Lines({ text }: { text: string }) {
    const parts = text.split('\n');
    return <>{parts.map((p, i) => (<span key={i}>{p}{i < parts.length - 1 && <br />}</span>))}</>;
}

function Badge({ label }: { label: string }) {
    return (
        <Link className="store-badge" href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" aria-label={label}>
            <Image src="/download-on-app-store.png" alt="" width={496} height={172} sizes="188px" />
        </Link>
    );
}

export function HomePage({ t, locale }: { t: Dictionary; locale: LocaleCode }) {
    return (
        <main className="site" data-locale={locale}>
            {/* 1. Hero: the pitch on the left, a real lesson on the right */}
            <section className="hero" aria-labelledby="hero-title">
                <div className="shell hero__grid">
                    <div className="hero__copy">
                        <h1 id="hero-title" className="hero__title"><Lines text={t.hero.title} /></h1>
                        <p className="hero__body">{t.hero.body}</p>
                        <div className="hero__cta">
                            <Badge label={t.hero.cta} />
                            <span className="hero__note">{t.hero.note}</span>
                        </div>
                    </div>
                    <div className="hero__demo">
                        <Lesson t={t} />
                    </div>
                </div>
            </section>

            {/* 2. Why spaced repetition (the Learn logic) */}
            <section id="learn" className="band band--dark science" aria-labelledby="science-title">
                <div className="shell science__grid">
                    <div className="science__copy">
                        <p className="kicker kicker--light">{t.science.kicker}</p>
                        <h2 id="science-title"><Lines text={t.science.title} /></h2>
                        <p className="lede lede--light">{t.science.body}</p>
                        <ol className="steps">
                            {t.science.steps.map((s, i) => (
                                <li key={s.title}><span className="steps__n">{String(i + 1).padStart(2, '0')}</span><div><h3>{s.title}</h3><p>{s.body}</p></div></li>
                            ))}
                        </ol>
                        <p className="lede lede--light science__closing">{t.science.closing}</p>
                    </div>
                    <div className="science__figure"><MemoryCurve /></div>
                </div>
            </section>

            {/* 3. Streaks */}
            <section id="streak" className="band streak" aria-labelledby="streak-title">
                <div className="shell split">
                    <div className="split__media"><Phone src="/app/streak_sep.webp" alt="" /></div>
                    <div className="split__copy">
                        <p className="kicker kicker--warm">{t.streak.kicker}</p>
                        <h2 id="streak-title">{t.streak.title}</h2>
                        <p className="lede">{t.streak.body}</p>
                        <ul className="checks">{t.streak.points.map((p) => <li key={p}>{p}</li>)}</ul>
                    </div>
                </div>
            </section>

            {/* 4. Learn & Focus */}
            <section className="band band--surface modes" aria-labelledby="modes-title">
                <div className="shell">
                    <p className="kicker">{t.modes.kicker}</p>
                    <h2 id="modes-title" className="modes__title"><Lines text={t.modes.title} /></h2>
                    <div className="modes__grid">
                        <article className="mode"><Phone src="/app/learn_lesson.webp" alt="" /><h3>{t.modes.learn.title}</h3><p>{t.modes.learn.body}</p></article>
                        <article className="mode"><Phone src="/app/focus_lesson.webp" alt="" /><h3>{t.modes.focus.title}</h3><p>{t.modes.focus.body}</p></article>
                    </div>
                </div>
            </section>

            {/* 5. Free, with Energy */}
            <section id="decks" className="band free" aria-labelledby="free-title">
                <div className="shell split split--reverse">
                    <div className="split__copy">
                        <p className="kicker">{t.free.kicker}</p>
                        <h2 id="free-title">{t.free.title}</h2>
                        <p className="lede">{t.free.body}</p>
                        <ul className="facts">{t.free.facts.map(([n, l]) => <li key={l}><strong>{n}</strong><span>{l}</span></li>)}</ul>
                    </div>
                    <div className="split__media"><Phone src="/app/combo.webp" alt="" /></div>
                </div>
                <div className="shell decks">
                    <p className="kicker">{t.decks.kicker}</p>
                    <h3 className="decks__title">{t.decks.title}</h3>
                    <ol className="deck-list">
                        {t.decks.items.map(([name, sub, count], i) => (
                            <li key={name} className={`deck-row deck-row--${i}`}><span className="deck-row__swatch" aria-hidden="true" /><div><h4>{name}</h4><p>{sub}</p></div><strong>{count}</strong></li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* 6. Kips */}
            <section id="kips" className="band band--surface kipsband" aria-labelledby="kips-title">
                <div className="shell split">
                    <div className="split__media kipsband__stage"><KipsLive /></div>
                    <div className="split__copy">
                        <p className="kicker">{t.kips.kicker}</p>
                        <h2 id="kips-title">{t.kips.title}</h2>
                        <p className="lede">{t.kips.body}</p>
                    </div>
                </div>
            </section>

            {/* 7. Meanings in your language */}
            <section className="band languages" aria-labelledby="lang-title">
                <div className="shell split split--reverse">
                    <div className="split__copy">
                        <p className="kicker">{t.languages.kicker}</p>
                        <h2 id="lang-title">{t.languages.title}</h2>
                        <p className="lede">{t.languages.body}</p>
                        <ul className="chips">{LOCALES.map((l) => <li key={l.code}>{l.label}</li>)}</ul>
                    </div>
                    <div className="split__media"><Phone src="/app/meanings.webp" alt="" /></div>
                </div>
            </section>

            {/* 8. The content is already here */}
            <section className="band band--dark ready" aria-labelledby="ready-title">
                <div className="shell split">
                    <div className="split__copy">
                        <p className="kicker kicker--light">{t.ready.kicker}</p>
                        <h2 id="ready-title">{t.ready.title}</h2>
                        <p className="lede lede--light">{t.ready.body}</p>
                    </div>
                    <ul className="ready__list">{t.ready.compare.map((c) => <li key={c}>{c}</li>)}</ul>
                </div>
            </section>

            {/* 9. FAQ, in plain sentences search engines and assistants can quote */}
            <section id="faq" className="band faq" aria-labelledby="faq-title">
                <div className="shell faq__grid">
                    <div><p className="kicker">{t.faq.kicker}</p><h2 id="faq-title">{t.faq.title}</h2></div>
                    <dl className="faq__list">
                        {t.faq.items.map(([q, a]) => (<div key={q}><dt>{q}</dt><dd>{a}</dd></div>))}
                    </dl>
                </div>
            </section>

            {/* 10. Closing, flowing into the footer */}
            <section className="closing" aria-labelledby="closing-title">
                <svg className="closing__wave" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true"><path d="M0 80 C 240 0 480 0 720 60 C 960 120 1200 120 1440 40 L1440 120 L0 120 Z" /></svg>
                <div className="shell closing__inner">
                    <div className="closing__kips"><KipsLive celebrate size={300} /></div>
                    <h2 id="closing-title"><Lines text={t.closing.title} /></h2>
                    <p>{t.closing.body}</p>
                    <Badge label={t.hero.cta} />
                </div>
            </section>
        </main>
    );
}
