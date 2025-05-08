import { Icon, IconX } from '@tabler/icons-react';

export type ErrorProps = {
    icon?: Icon;
    title?: string;
    description?: string;
};

export function ErrorMessage({ icon, title, description }: ErrorProps) {
    const Icon = icon || IconX;
    return (
        <div className="flex flex-col justify-center items-center text-center">
            <div className="w-12 h-12 bg-red-600/20 rounded-[99999px] flex justify-center items-center">
                <Icon size={22} className="text-red-400" />
            </div>
            <div className="mt-2">
                <div className="font-semibold text-md mb-0.5">{title}</div>
                <div className="text-xs text-muted-foreground">{description}</div>
            </div>
        </div>
    );
}
