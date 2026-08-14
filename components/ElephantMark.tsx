type ElephantMarkProps = {
    className?: string;
    tone?: 'accent' | 'onAccent';
    'aria-hidden'?: boolean;
};

const ELEPHANT_MASK = 'url("/cardernir-elephant.png") center / contain no-repeat';

export function ElephantMark({
    className,
    tone = 'accent',
    'aria-hidden': ariaHidden = true,
}: ElephantMarkProps) {
    const toneClass = tone === 'onAccent' ? 'elephant-mark--on-accent' : 'elephant-mark--accent';

    return (
        <span
            className={['elephant-mark', toneClass, className].filter(Boolean).join(' ')}
            data-tone={tone}
            aria-hidden={ariaHidden}
            style={{
                aspectRatio: '4 / 3',
                backgroundColor: 'currentColor',
                mask: ELEPHANT_MASK,
                WebkitMask: ELEPHANT_MASK,
            }}
        />
    );
}
