import Image from 'next/image';

export default function Home() {
    return (
        <main className="grid h-full place-items-center px-6 text-center bg-[#FFF9F0]">
            <div className="max-w-xl flex flex-col items-center gap-2 md:gap-4">
                <div className="w-64 sm:w-72 md:w-80 lg:w-96">
                    <Image
                        className="mx-auto block rounded-4xl"
                        src="/cardernirlogo.jpeg"
                        alt="Cardernir logo"
                        width={400}
                        height={400}
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

                <p className="text-[14px] md:text-lg font-semibold text-slate-700">Coming soon!</p>
            </div>
        </main>
    );
}

{
    /* <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-9xl font-bold bg-gradient-to-r from-[#5856D6] from-5% via-[#426BFF] to-[#30B0C7] text-transparent bg-clip-text">
                Cardernir
            </h1>
            <h2 className="text-xl">Your language-learning flashcard app</h2>
            <h3 className="text-lg font-medium">Coming soon!</h3>

            <Image className="rounded-4xl" src="/cardernirlogo.png" alt="Cardernir logo" width={400} height={400} />
        </div> */
}
