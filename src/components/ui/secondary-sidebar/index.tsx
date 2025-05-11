import { ReactNode } from 'react';

export type SecondarySidebarProps = {
    children?: ReactNode;
};

export function SecondarySidebar({ children }: SecondarySidebarProps) {
    return <div className="flex flex-col h-full max-h-full w-65">{children}</div>;
}

export * from './wrapper';
