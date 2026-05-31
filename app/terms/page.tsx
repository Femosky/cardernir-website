import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms of Service — Cardernir',
    description: 'Our terms of service outline the rules and guidelines for using the Cardernir app.',
};

export default function Terms() {
    return (
        <div className="flex flex-col items-center h-full bg-[#FFF9F0] mx-auto px-6 py-12">
            <h1 className="font-bold mb-6">Terms of Service</h1>
            <p className="mb-4">Coming soon</p>
        </div>
    );
}
