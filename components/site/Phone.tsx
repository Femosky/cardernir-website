import Image from 'next/image';

/** A phone-shaped frame for an 804x1748 app capture. */
export function Phone({ src, alt, className, priority = false }: { src: string; alt: string; className?: string; priority?: boolean }) {
    return (
        <div className={['phone', className].filter(Boolean).join(' ')}>
            <div className="phone__screen">
                <Image src={src} alt={alt} width={804} height={1748} priority={priority} sizes="(max-width: 700px) 60vw, 300px" />
            </div>
            <span className="phone__island" aria-hidden="true" />
        </div>
    );
}
