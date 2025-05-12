import { SecondarySidebar } from '@components/ui/secondary-sidebar';
import { SidebarList } from '@components/ui/secondary-sidebar/SidebarList';
import { ReactNode } from 'react';

export type SettingsSidebarProps = {
    title: string;
    children?: ReactNode;
};
export function SettingsSidebar({ title, children }: SettingsSidebarProps) {
    return (
        <SecondarySidebar className="w-45 mx-2 my-4">
            <div className="text-xl font-semibold px-4 pb-2">{title}</div>
            <SidebarList className="gap-1">{children}</SidebarList>
        </SecondarySidebar>
    );
}
