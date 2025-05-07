import { useRandomValue } from '@/lib/hooks';
import { cn } from '@/lib/utils';

export function AbstractGradient() {
    return (
        <div className="absolute left-0 right-0 top-0 bottom-0 w-screen h-screen overflow-hidden">
            <div className="relative left-0 right-0 top-0 bottom-0 w-screen h-screen backdrop-blur-3xl z-1"></div>
            <Dot className="bg-sky-900" />
            <Dot className="bg-amber-900" />
        </div>
    );
}

export type DotProps = React.ComponentProps<'div'> & {};

export function Dot({ className }: DotProps) {
    const x = useRandomValue({ interval: 10000, min: -10, max: 50 });
    const y = useRandomValue({ interval: 10000, min: -10, max: 50 });
    const w = useRandomValue({ interval: 10000, min: 10, max: 50 });
    const h = useRandomValue({ interval: 10000, min: 10, max: 50 });

    return (
        <div
            className={cn('absolute rounded-[999999px]', className)}
            style={{
                right: x,
                top: y,
                width: `${w}vw`,
                height: `${h}vh`,
                transition: 'all 10s ease',
            }}
        >
            {x},{y},{w},{h}
        </div>
    );
}
