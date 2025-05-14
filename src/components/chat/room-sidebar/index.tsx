import { cn } from '@lib/utils';
import { ReactNode } from 'react';

export type RoomSidebarProps = React.ComponentProps<'div'> & {
    children?: ReactNode;
};

export function RoomSidebar({ children, className, ...props }: RoomSidebarProps) {
    return (
        <div
            className={cn(
                'flex flex-col h-full max-h-full w-65 border-l border-white/5',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
