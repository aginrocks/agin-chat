import { cn } from '@/lib/utils';
import { Spinner } from './spinner';

export type SpinnerSectionProps = React.ComponentProps<'div'> & {
    children?: React.ReactNode;
};

export function SpinnerSection({ className, children }: SpinnerSectionProps) {
    return (
        <div className={cn('flex justify-center items-center h-20 gap-3 flex-col', className)}>
            <Spinner />
            <div>{children}</div>
        </div>
    );
}
