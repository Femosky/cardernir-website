import Image from 'next/image';
import Link from 'next/link';
import { ThemedImage } from '@/components/ThemedImage';

const APP_STORE_URL = 'https://apps.apple.com/app/cardernir/id6772876444';

function AppStoreButton({ label = 'Download on the App Store' }: { label?: string }) {
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
            <section className="hero-section page-shell">
                <div className="hero-copy">
                    <p className="eyebrow">Flashcards for language learners</p>
                    <h1>Remember more of the language you learn.</h1>
                    <p className="hero-description">
                        Cardernir turns vocabulary into a clear daily practice, with ready-made decks, focused reviews,
                        and spaced repetition that brings each card back at the right time.
                    </p>

                    <div className="hero-actions">
                        <AppStoreButton />
                        <span>Available for iPhone</span>
                    </div>
                </div>

                <div className="hero-visual">
                    <ThemedImage
                        lightSrc="/hero-image-soft.png"
                        darkSrc="/hero-image-soft-dark.png"
                        alt="Cardernir language deck and flashcard screens"
                        width={1508}
                        height={1259}
                        priority
                        sizes="(max-width: 700px) 82vw, 600px"
                    />
                </div>
            </section>

            <section className="value-strip" aria-label="Cardernir benefits">
                <div className="page-shell value-showcase">
                    <div className="value-heading">
                        <p className="eyebrow">Inside Cardernir</p>
                        <h2>From a deck to a word remembered.</h2>
                    </div>

                    <div className="walkthrough-grid">
                        <figure>
                            <ThemedImage
                                lightSrc="/cardernir-decks.webp"
                                darkSrc="/cardernir-decks-dark.webp"
                                alt="Choosing a language deck in Cardernir"
                                width={1400}
                                height={1520}
                                sizes="(max-width: 700px) calc(100vw - 32px), 31vw"
                            />
                            <figcaption>Choose a deck</figcaption>
                        </figure>

                        <figure>
                            <ThemedImage
                                lightSrc="/cardernir-study.webp"
                                darkSrc="/cardernir-study-dark.webp"
                                alt="Studying a language flashcard in Cardernir"
                                width={1400}
                                height={1520}
                                sizes="(max-width: 700px) calc(100vw - 32px), 31vw"
                            />
                            <figcaption>Study a card</figcaption>
                        </figure>

                        <figure>
                            <ThemedImage
                                lightSrc="/cardernir-review.webp"
                                darkSrc="/cardernir-review-dark.webp"
                                alt="Reviewing a due language card in Cardernir"
                                width={1400}
                                height={1520}
                                sizes="(max-width: 700px) calc(100vw - 32px), 31vw"
                            />
                            <figcaption>Review when due</figcaption>
                        </figure>
                    </div>
                </div>
            </section>

            <section className="feature-section page-shell">
                <div className="feature-image">
                    <ThemedImage
                        lightSrc="/cardernir-study-closeup.png"
                        darkSrc="/cardernir-study-closeup-dark.png"
                        alt="Studying a language flashcard in Cardernir"
                        fill
                        sizes="(max-width: 760px) 92vw, 48vw"
                    />
                </div>

                <div className="feature-copy">
                    <p className="eyebrow">Built for consistency</p>
                    <h2>A calmer way to build vocabulary.</h2>
                    <p>
                        No streak pressure. No crowded lesson map. Open Cardernir, review what is due, and get back to
                        your day.
                    </p>
                    <ul>
                        <li>
                            <span aria-hidden="true">✓</span> Focused, one-card-at-a-time sessions
                        </li>
                        <li>
                            <span aria-hidden="true">✓</span> Progress that is easy to understand
                        </li>
                        <li>
                            <span aria-hidden="true">✓</span> Decks designed around real vocabulary
                        </li>
                    </ul>
                </div>
            </section>

            <section className="closing-section page-shell">
                <p className="eyebrow">Your next word is waiting</p>
                <h2>
                    Learn a little.
                    <br />
                    Remember a lot.
                </h2>
                <p>Download Cardernir and make vocabulary practice part of your day.</p>
                <AppStoreButton label="Get Cardernir on the App Store" />
            </section>
        </main>
    );
}
