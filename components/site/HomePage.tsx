import Image from 'next/image';
import Link from 'next/link';
import { Lesson } from '@/components/lesson/Lesson';
import { KipsLive } from '@/components/site/KipsLive';
import { ForgetCurve } from '@/components/site/ForgetCurve';
import { StreakHero } from '@/components/site/StreakHero';
import { Reveal } from '@/components/HomeMotion';
import { APP_STORE_URL } from '@/lib/siteMetadata';
import type { LocaleCode } from '@/lib/i18n/locales';
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

/* The page: a real lesson first, then five short chapters with one big object each, then a quiet FAQ for
   search engines and assistants, then the download. Every chapter is a headline, one sentence and a picture. */
export function HomePage({ t, locale }: { t: Dictionary; locale: LocaleCode }) {
    return (
        <main className="site" data-locale={locale}>
            <section className="hero" aria-labelledby="hero-title">
                <div className="shell hero__grid">
                    <div className="hero__kips"><KipsLive quiet intro="HeroHello" poster="neutral" size={440} /></div>
                    <div className="hero__copy">
                        <h1 id="hero-title" className="hero__title"><Lines text={t.hero.title} /></h1>
                        <p className="lede">{t.hero.body}</p>
                        <div className="hero__actions">
                            <a className="btn btn--lg" href="#try">{t.hero.tryButton}</a>
                            <Badge label={t.hero.cta} />
                        </div>
                    </div>
                </div>
            </section>

            <section id="try" className="try" aria-labelledby="try-title">
                <div className="shell try__inner">
                    <h2 id="try-title" className="try__title">{t.hero.tryTitle}</h2>
                    <p className="try__hint">{t.hero.tryHint}</p>
                    <div className="hero__demo"><Lesson t={t} /></div>
                </div>
            </section>

            <section id="learn" className="block block--blue" aria-labelledby="learn-title">
                <div className="shell chapter">
                    <Reveal className="chapter__copy">
                        <h2 id="learn-title"><Lines text={t.science.title} /></h2>
                        <p className="lede">{t.science.body}</p>
                    </Reveal>
                    <div className="chapter__art"><ForgetCurve labels={t.science.curve} /></div>
                </div>
            </section>

            <section id="streak" className="block block--warm" aria-labelledby="streak-title">
                <div className="shell chapter chapter--tight">
                    <div className="candle">
                        <span className="candle__glow" aria-hidden="true" />
                        <StreakHero size={640} />
                    </div>
                    <Reveal className="chapter__copy">
                        <h2 id="streak-title">{t.streak.title}</h2>
                        <p className="lede">{t.streak.body}</p>
                    </Reveal>
                </div>
            </section>

            <section id="decks" className="block block--cyan" aria-labelledby="free-title">
                <div className="shell split split--reverse">
                    <Reveal className="split__copy">
                        <h2 id="free-title">{t.free.title}</h2>
                        <p className="lede">{t.free.body}</p>
                    </Reveal>
                    <Reveal className="energy">
                        <span className="energy__chip">
                            <Image src="/ui/energy-full.png" alt="" width={166} height={300} sizes="56px" />
                            <strong>25</strong>
                        </span>
                        <span className="energy__grant" aria-hidden="true">+5</span>
                    </Reveal>
                </div>
            </section>

            <section id="kips" className="block" aria-labelledby="kips-title">
                <div className="shell split">
                    <div className="kips-stage"><KipsLive size={460} interactive /></div>
                    <Reveal className="split__copy">
                        <h2 id="kips-title">{t.kips.title}</h2>
                        <p className="lede">{t.kips.body}</p>
                    </Reveal>
                </div>
            </section>

            <section className="block block--blush" aria-labelledby="ready-title">
                <div className="shell chapter">
                    <Reveal className="chapter__copy">
                        <h2 id="ready-title">{t.ready.title}</h2>
                        <p className="lede">{t.ready.body}</p>
                    </Reveal>
                    <div className="fan" aria-hidden="true">
                        {[1, 0, 4].map((i, k) => <div key={i} className={`fan__card fan__card--${k}`}><span>{t.cards[i].word}</span><small>{t.demo.tapToReveal}</small></div>)}
                    </div>
                </div>
            </section>

            <section id="faq" className="block faq" aria-labelledby="faq-title">
                <div className="shell faq__inner">
                    <h2 id="faq-title">{t.faq.title}</h2>
                    {t.faq.items.map(([q, a]) => (
                        <details key={q} className="faq__item"><summary>{q}</summary><p>{a}</p></details>
                    ))}
                    <details className="faq__item">
                        <summary>{t.decks.title}</summary>
                        <ul className="faq__decks">{t.decks.items.map(([name, , count]) => <li key={name}><span>{name}</span><span>{count}</span></li>)}</ul>
                    </details>
                </div>
            </section>

            <section className="closing" aria-labelledby="closing-title">
                <svg className="closing__wave" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true"><path d="M0 80 C 240 0 480 0 720 60 C 960 120 1200 120 1440 40 L1440 120 L0 120 Z" /></svg>
                <div className="shell closing__inner">
                    <div className="closing__kips"><KipsLive size={300} /></div>
                    <h2 id="closing-title"><Lines text={t.closing.title} /></h2>
                    <p>{t.closing.body}</p>
                    <Badge label={t.hero.cta} />
                </div>
            </section>
        </main>
    );
}
