import Link from 'next/link';

export function Header() {
    return (
        <header className="w-full flex justify-center items-center py-4 px-6">
            <nav>
                <ul className="flex gap-5 space-x-4 text-sm">
                    <Link className="text-slate-700 hover:text-slate-900" href="/">
                        Home
                    </Link>

                    <span className="text-slate-400">|</span>

                    <Link className="text-slate-700 hover:text-slate-900" href="/terms">
                        Terms
                    </Link>

                    <span className="text-slate-400">|</span>

                    <Link className="text-slate-700 hover:text-slate-900" href="/privacy">
                        Privacy
                    </Link>
                </ul>
            </nav>
        </header>
    );
}
