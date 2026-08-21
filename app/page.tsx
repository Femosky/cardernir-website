import Image from 'next/image';
import Link from 'next/link';
import { ElephantMark } from '@/components/ElephantMark';
import { HeroIntro, HeroStage, MemoryCurve, Reveal } from '@/components/HomeMotion';
import {
    APP_STORE_URL,
    BRAND_IMAGE_URL,
    SITE_DESCRIPTION,
    SITE_NAME,
    SITE_TITLE,
    SITE_URL,
    SOCIAL_IMAGE_URL,
} from '@/lib/siteMetadata';

const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'ImageObject',
            '@id': `${SITE_URL}/#brand-image`,
            url: BRAND_IMAGE_URL,
            contentUrl: BRAND_IMAGE_URL,
            width: 1024,
            height: 1024,
            caption: 'Cardernir elephant logo',
        },
        {
            '@type': 'Organization',
            '@id': `${SITE_URL}/#organization`,
            name: SITE_NAME,
            url: SITE_URL,
            logo: { '@id': `${SITE_URL}/#brand-image` },
            image: { '@id': `${SITE_URL}/#brand-image` },
            email: 'support@cardernir.app',
        },
        {
            '@type': 'WebSite',
            '@id': `${SITE_URL}/#website`,
            url: SITE_URL,
            name: SITE_NAME,
            alternateName: ['Cardernir App', 'cardernir.app'],
            description: SITE_DESCRIPTION,
            inLanguage: 'en-CA',
            publisher: { '@id': `${SITE_URL}/#organization` },
        },
        {
            '@type': 'WebPage',
            '@id': `${SITE_URL}/#webpage`,
            url: SITE_URL,
            name: SITE_TITLE,
            description: SITE_DESCRIPTION,
            isPartOf: { '@id': `${SITE_URL}/#website` },
            about: { '@id': `${SITE_URL}/#app` },
            primaryImageOfPage: { '@id': `${SITE_URL}/#brand-image` },
            inLanguage: 'en-CA',
        },
        {
            '@type': ['SoftwareApplication', 'MobileApplication'],
            '@id': `${SITE_URL}/#app`,
            name: SITE_NAME,
            description: SITE_DESCRIPTION,
            applicationCategory: 'EducationalApplication',
            operatingSystem: 'iOS',
            url: SITE_URL,
            downloadUrl: APP_STORE_URL,
            installUrl: APP_STORE_URL,
            sameAs: [APP_STORE_URL],
            image: { '@id': `${SITE_URL}/#brand-image` },
            screenshot: SOCIAL_IMAGE_URL,
            publisher: { '@id': `${SITE_URL}/#organization` },
            mainEntityOfPage: { '@id': `${SITE_URL}/#webpage` },
            inLanguage: 'en-CA',
        },
    ],
};

const proofPoints = [
    { value: '3,850', label: 'curated French cards' },
    { value: '5', label: 'focused French packs' },
    { value: 'FSRS', label: 'timed reviews' },
];

const fsrsSteps = [
    { title: 'You rate recall', description: 'Again, Hard, Good, or Easy.' },
    { title: 'FSRS updates the timing', description: 'The interval adapts to that card and your history.' },
    { title: 'The card returns when useful', description: 'Difficult memories get attention sooner.' },
];

const productSteps = [
    {
        title: 'Choose a French goal',
        description:
            'Start with a ready-made pack for core vocabulary, conversation, verbs, travel, or exam preparation.',
        mobileDescription: 'Start with a ready-made French pack.',
        image: '/cardernir-choose-goal.jpeg',
        alt: 'Choosing the French Core vocabulary pack in Cardernir',
    },
    {
        title: 'Learn in focused sessions',
        description: 'Short decks keep attention on one useful French word or phrase at a time.',
        mobileDescription: 'Keep attention on one useful word or phrase.',
        image: '/cardernir-focused-sessions.jpeg',
        alt: 'Learning a French phrase in a focused Cardernir review session',
    },
    {
        title: 'Review only what is due',
        description: 'FSRS brings difficult cards back sooner and gives stronger memories more room.',
        mobileDescription: 'FSRS brings difficult cards back sooner.',
        image: '/cardernir-review-due.jpeg',
        alt: 'Reviewing a due French vocabulary card in Cardernir',
    },
];

const packs = [
    { name: 'French Core', description: 'Essential words for a solid foundation', count: '1,000 cards' },
    { name: 'Everyday French Phrases', description: 'Practical language for real conversations', count: '550 cards' },
    { name: 'French Verb Mastery', description: 'High-value verbs, forms, and usage', count: '800 cards' },
    { name: 'French for Travel', description: 'Useful vocabulary for life on the go', count: '700 cards' },
    { name: 'TEF / TCF Canada Prep', description: 'Focused vocabulary for exam preparation', count: '800 cards' },
];

const calmPrinciples = [
    {
        title: 'No streak pressure',
        description: 'Missing a day is not a failure. Your cards will still be there.',
        mobileDescription: 'Missing a day is not a failure.',
    },
    {
        title: 'Progress you can read',
        description: 'See what is new, learning, and due without decoding a dashboard.',
        mobileDescription: 'See what is new, learning, and due.',
    },
    {
        title: 'Reminders you control',
        description: 'Choose when Cardernir nudges you, or keep the experience quiet.',
        mobileDescription: 'Choose when Cardernir nudges you.',
    },
];

function AppStoreButton({ label = 'Download Cardernir on the App Store' }: { label?: string }) {
    return (
        <Link
            className="app-store-button"
            href={APP_STORE_URL}
            aria-label={label}
            target="_blank"
            rel="noopener noreferrer"
        >
            <Image src="/download-on-app-store.png" alt={label} width={496} height={172} />
        </Link>
    );
}

export default function Home() {
    return (
        <main className="landing-page">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
            />

            <section className="hero-section" aria-labelledby="hero-title">
                <div className="page-shell hero-shell">
                    <HeroIntro />
                    <HeroStage />
                </div>
            </section>

            <Reveal>
                <section className="proof-strip" aria-label="Cardernir in numbers">
                    <div className="proof-grid">
                        {proofPoints.map((point) => (
                            <div className="proof-item" key={point.label}>
                                <strong>{point.value}</strong>
                                <span>{point.label}</span>
                            </div>
                        ))}
                    </div>
                </section>
            </Reveal>

            <Reveal>
                <section id="spaced-repetition" className="fsrs-section dark-section" aria-labelledby="fsrs-heading">
                    <div className="page-shell fsrs-layout">
                        <div className="fsrs-copy">
                            <p className="section-kicker section-kicker--light">Spaced repetition, powered by FSRS</p>
                            <h2 id="fsrs-heading">The right card, close to the right moment.</h2>
                            <p className="section-description">
                                Every answer updates the card’s memory state. FSRS considers difficulty, stability, and
                                retrievability when choosing the next interval, so difficult memories return sooner and
                                stronger memories receive longer intervals.
                            </p>

                            <ol className="editorial-steps fsrs-steps">
                                {fsrsSteps.map((step, index) => (
                                    <li key={step.title}>
                                        <span className="step-number">{String(index + 1).padStart(2, '0')}</span>
                                        <div>
                                            <h3>{step.title}</h3>
                                            <p>{step.description}</p>
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </div>
                        <MemoryCurve />
                    </div>
                </section>
            </Reveal>

            <Reveal>
                <section id="how-it-works" className="story-section" aria-labelledby="story-heading">
                    <div className="page-shell">
                        <div className="story-heading">
                            <div>
                                <p className="section-kicker">A simple daily loop</p>
                                <h2 id="story-heading">Choose. Learn. Let timing do the organising.</h2>
                            </div>
                            <p>
                                Everything is ready when you open the app. There is no blank-deck setup between you and
                                your first French card.
                            </p>
                        </div>

                        <div className="story-grid">
                            {productSteps.map((step, index) => (
                                <article className="story-step" key={step.title}>
                                    <span className="step-number">{String(index + 1).padStart(2, '0')}</span>
                                    <h3>{step.title}</h3>
                                    <p className="desktop-copy">{step.description}</p>
                                    <p className="mobile-copy">{step.mobileDescription}</p>
                                    <figure className="story-media">
                                        <Image
                                            src={step.image}
                                            alt={step.alt}
                                            width={360}
                                            height={391}
                                            sizes="(max-width: 900px) calc(100vw - 36px), 28vw"
                                        />
                                    </figure>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            </Reveal>

            <Reveal>
                <section id="packs" className="packs-section" aria-labelledby="packs-heading">
                    <div className="page-shell packs-layout">
                        <div className="packs-intro">
                            <p className="section-kicker">Five focused packs</p>
                            <h2 id="packs-heading">Start with a goal, not an empty screen.</h2>
                            <p className="section-description">
                                Each pack includes small practice decks and a complete FSRS spaced-repetition deck.
                            </p>
                            <p className="pack-total">
                                <strong>3,850</strong> curated French-to-English cards
                            </p>
                            <p className="pack-note pack-note--desktop">
                                Preview selected decks free. Individual packs and Premium are available in the app.
                            </p>
                        </div>

                        <ol className="pack-list">
                            {packs.map((pack, index) => (
                                <li key={pack.name}>
                                    <span className="step-number">{String(index + 1).padStart(2, '0')}</span>
                                    <div className="pack-copy">
                                        <h3>{pack.name}</h3>
                                        <p>{pack.description}</p>
                                    </div>
                                    <strong>{pack.count}</strong>
                                </li>
                            ))}
                        </ol>
                        <p className="pack-note pack-note--mobile">
                            Preview selected decks free. Individual packs and Premium are available in the app.
                        </p>
                    </div>
                </section>
            </Reveal>

            <Reveal>
                <section id="why-cardernir" className="calm-section dark-section" aria-labelledby="calm-heading">
                    <div className="page-shell calm-shell">
                        <div className="calm-intro">
                            <p className="section-kicker section-kicker--light">A calmer study rhythm</p>
                            <h2 id="calm-heading">Built for consistency, not guilt.</h2>
                            <p>
                                Open the app, review what is due, and get back to your day. Cardernir is designed to
                                help you return without making you feel behind.
                            </p>
                        </div>

                        <ol className="editorial-steps calm-steps">
                            {calmPrinciples.map((principle, index) => (
                                <li key={principle.title}>
                                    <span className="step-number">{String(index + 1).padStart(2, '0')}</span>
                                    <div>
                                        <h3>{principle.title}</h3>
                                        <p className="desktop-copy">{principle.description}</p>
                                        <p className="mobile-copy">{principle.mobileDescription}</p>
                                    </div>
                                </li>
                            ))}
                        </ol>

                        <div className="maker-note">
                            <ElephantMark tone="onAccent" className="maker-mark" />
                            <div>
                                <p className="section-kicker section-kicker--light">Built independently in Canada</p>
                                <h3>A small app, built with care.</h3>
                            </div>
                            <p>
                                Cardernir is made by one developer who wanted a calmer way to keep French vocabulary
                                from disappearing between study sessions.
                            </p>
                        </div>
                    </div>
                </section>
            </Reveal>

            <Reveal>
                <section className="closing-section" aria-labelledby="closing-heading">
                    <ElephantMark tone="onAccent" className="closing-mark" />
                    <p className="section-kicker section-kicker--on-accent">Your next French word is waiting</p>
                    <h2 id="closing-heading">
                        Learn a little.
                        <br />
                        Remember a lot.
                    </h2>
                    <p>Make French vocabulary practice part of your day.</p>
                    <AppStoreButton label="Get Cardernir on the App Store" />
                </section>
            </Reveal>
        </main>
    );
}
