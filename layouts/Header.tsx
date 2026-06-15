import Link from 'next/link';

export function Header() {
    return (
        <header className="w-full flex justify-center items-center py-4 px-6">
            <nav>
                <ul className="flex gap-5 space-x-4 text-sm">
                    <Link className="text-accent transition duration-300 hover:brightness-125" href="/">
                        Home
                    </Link>

                    <span className="text-slate-400">|</span>

                    <Link className="text-accent transition duration-300 hover:brightness-125" href="/support">
                        Support
                    </Link>

                    <span className="text-slate-400">|</span>

                    <Link className="text-accent transition duration-300 hover:brightness-125" href="/terms">
                        Terms
                    </Link>

                    <span className="text-slate-400">|</span>

                    <Link className="text-accent transition duration-300 hover:brightness-125" href="/privacy">
                        Privacy
                    </Link>
                </ul>
            </nav>
        </header>
    );
}
