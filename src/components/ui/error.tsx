import { Icon, IconX } from '@tabler/icons-react';
import { ThemedIcon, ThemedIconProps } from './themed-icon';

export type ErrorProps = {
    icon?: Icon;
    title?: string;
    description?: string;
    children?: React.ReactNode;
    color?: ThemedIconProps['color'];
};

export function ErrorMessage({ icon, title, description, color = 'red', children }: ErrorProps) {
    const Icon = icon || IconX;
    return (
        <div className="flex flex-col justify-center items-center text-center pb-0.5">
            <ThemedIcon icon={Icon} color={color} />
            <div className="mt-2 mb-1">
                <div className="font-semibold text-md mb-0.5">{title}</div>
                <div className="text-xs text-muted-foreground">{description}</div>
            </div>
            {children && <div className="mt-2">{children}</div>}
        </div>
    );
}
