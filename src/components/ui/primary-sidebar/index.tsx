import { useLocation } from '@tanstack/react-router';
import { SidebarItem } from './SidebarItem';
import { IconHome, IconMessage, IconSettings, IconUser, IconUsers } from '@tabler/icons-react';
import { Separator } from '../separator';
import { SidebarSeparator } from './SidebarSeparator';

type PrimarySidebarProps = {
    children?: React.ReactNode;
};

export function PrimarySidebar() {
    const { pathname } = useLocation();
    const tab = pathname.split('/')[1];

    return (
        <div className="flex flex-col justify-between p-3.5 pt-0 h-full">
            <div className="flex flex-col gap-2.5">
                <SidebarItem icon={IconHome} label="Home" active />
                <SidebarItem icon={IconUsers} label="DMs" />
                <SidebarSeparator />
            </div>
            <div className="flex flex-col gap-2.5">
                <SidebarItem icon={IconSettings} label="Settings" />
            </div>
        </div>
    );
}
