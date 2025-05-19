import { Button } from '@components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@components/ui/tooltip';
import { cn } from '@lib/utils';
import React from 'react';

export type MessageActionProps = React.ComponentProps<'button'> & {
    label: string;
};

export function MessageAction({ children, className, label, ...props }: MessageActionProps) {
    return (
        <Tooltip key={label}>
            <TooltipTrigger>
                <Button
                    size="xsIcon"
                    variant="ghost"
                    className={cn(
                        'dark:hover:bg-secondary-hover-2 text-muted-foreground hover:text-secondary-foreground',
                        className
                    )}
                    {...props}
                >
                    {children}
                </Button>
            </TooltipTrigger>
            <TooltipContent side="top" sideOffset={6} className="bg-secondary-hover">
                <p>{label}</p>
            </TooltipContent>
        </Tooltip>
    );
}
