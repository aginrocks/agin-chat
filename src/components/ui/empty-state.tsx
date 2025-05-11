import { Icon } from '@tabler/icons-react';

export type EmptyStateProps = {
    title: string;
    description?: string;
    icon: Icon;
};

export function EmptyState({ title, description, icon: Icon }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center w-full h-full p-4 text-center">
            <Icon size={48} className="mb-4 text-muted-foreground" />
            <div className="text-lg font-semibold">{title}</div>
            {description && (
                <div className="mt-0.5 text-sm text-muted-foreground">{description}</div>
            )}
        </div>
    );
}
