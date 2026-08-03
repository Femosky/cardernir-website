import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Support',
    description: 'Get help and support for using Cardernir.',
    alternates: { canonical: '/support' },
    openGraph: {
        type: 'website',
        locale: 'en_CA',
        siteName: 'Cardernir',
        title: 'Cardernir Support',
        description: 'Get help and support for using Cardernir.',
        url: '/support',
        images: [
            {
                url: '/cardernir-preview.png',
                width: 1200,
                height: 630,
                alt: 'Cardernir — French, remembered.',
                type: 'image/png',
            },
        ],
    },
};

export default function Support() {
    return (
        <main className="min-h-screen bg-background px-5 py-16 text-foreground sm:px-6 lg:px-8">
            <section className="mx-auto max-w-2xl">
                <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    Cardernir Support
                </p>

                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">How can we help?</h1>

                <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg">
                    If you need help with Cardernir, have a question about purchases, want to report an issue, or need
                    support with the app, you can reach us by email.
                </p>

                <div className="mt-8 rounded-2xl border border-border bg-card p-5 shadow-sm">
                    <p className="text-sm font-medium text-card-foreground">Contact email</p>

                    <a href="mailto:support@cardernir.app" className="mt-2 inline-block break-all text-accent">
                        support@cardernir.app
                    </a>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <a
                        href="mailto:support@cardernir.app?subject=Cardernir%20Support%20Request"
                        className="support-primary-button inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition hover:opacity-90"
                    >
                        Email Support
                    </a>

                    <Link
                        href="/privacy"
                        className="inline-flex items-center justify-center rounded-full border border-border bg-button-secondary px-6 py-3 text-sm font-semibold text-button-secondary-foreground transition hover:opacity-90"
                    >
                        Privacy Policy
                    </Link>

                    <Link
                        href="/terms"
                        className="inline-flex items-center justify-center rounded-full border border-border bg-button-secondary px-6 py-3 text-sm font-semibold text-button-secondary-foreground transition hover:opacity-90"
                    >
                        Terms of Service
                    </Link>
                </div>

                <p className="mt-8 text-sm leading-6 text-muted-foreground">
                    Please include your device model, iOS version, app version, and a short description of the issue if
                    you are reporting a bug.
                </p>
            </section>
        </main>
    );
}
