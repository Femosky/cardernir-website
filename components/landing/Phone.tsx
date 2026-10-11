import Image from 'next/image';
import type { ReactNode } from 'react';

/** A phone-shaped frame for a 804x1748 app capture (the iPhone 17 at 2/3 scale). */
export function Phone({
    src,
    alt,
    className,
    priority = false,
    children,
}: {
    src: string;
    alt: string;
    className?: string;
    priority?: boolean;
    children?: ReactNode;
}) {
    return (
        <div className={['phone', className].filter(Boolean).join(' ')}>
            <div className="phone__screen">
                <Image src={src} alt={alt} width={804} height={1748} priority={priority} sizes="(max-width: 700px) 70vw, 320px" />
                {children}
            </div>
            <span className="phone__island" aria-hidden="true" />
        </div>
    );
}
