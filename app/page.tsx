import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
    const isLive = true; // Set to true when the app is live

    return (
        <main className="grid h-full place-items-center px-6 text-center">
            <div className="max-w-xl flex flex-col items-center gap-2 md:gap-4">
                <div className="w-full flex flex-col items-center gap-2 md:gap-4">
                    <div className="relative block w-64 sm:w-72 md:w-80 lg:w-96 mx-auto aspect-square">
                        <Image
                            className="rounded-4xl object-contain"
                            src="/cardernirlogo.jpeg"
                            alt="Cardernir logo"
                            fill
                        />
                    </div>

                    <h1 className="text-3xl md:text-5xl font-semibold tracking-tight bg-linear-to-r from-[#5856D6] from-5% via-[#426BFF] to-[#30B0C7] text-transparent bg-clip-text">
                        Cardernir
                    </h1>

                    <div>
                        <p className="text-[10px] md:text-sm uppercase tracking-[0.35em] text-slate-500">
                            Language-learning flashcard app
                        </p>
                        <p className="text-[12px] md:text-base leading-7 text-slate-600">
                            A clean, focused flashcard experience for language learners.
                        </p>
                    </div>

                    {!isLive && <p className="text-[14px] md:text-lg font-semibold text-primary">Coming soon!</p>}
                </div>

                {isLive && (
                    <Link
                        className="relative block w-40 sm:w-44 md:w-48 lg:w-52 h-12 sm:h-14 md:h-16 lg:h-28 mx-auto"
                        href="https://apps.apple.com/app/cardernir/id6772876444"
                    >
                        <Image
                            className="rounded-4xl object-contain"
                            src="/download-on-app-store.png"
                            alt="Download on the App Store"
                            fill
                        />
                    </Link>
                )}
            </div>
        </main>
    );
}
