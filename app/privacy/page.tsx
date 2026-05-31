import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy — Cardernir',
    description: 'Our privacy policy explains how we collect, use, and protect your personal information.',
};

export default function Privacy() {
    return (
        <div className="flex flex-col items-center h-full bg-[#FFF9F0] mx-auto px-6 py-12">
            <h1 className="font-bold mb-6">Privacy Policy</h1>
            <p className="mb-4">Coming soon</p>
        </div>
    );
}
