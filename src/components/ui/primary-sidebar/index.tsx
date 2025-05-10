import { Link, useLocation } from '@tanstack/react-router';
import { SidebarItem } from './SidebarItem';
import { IconHome, IconSettings, IconUsers } from '@tabler/icons-react';
import { SidebarSeparator } from './SidebarSeparator';

export function PrimarySidebar() {
    const { pathname } = useLocation();
    const tab = pathname.split('/')[2];

    return (
        <div className="flex flex-col justify-between p-3.5 pt-0 h-full">
            <div className="flex flex-col gap-2.5">
                <Link to="/app/home">
                    <SidebarItem icon={IconHome} label="Home" active={tab === 'home'} />
                </Link>
                <Link to="/app/direct">
                    <SidebarItem
                        icon={IconUsers}
                        label="Direct Messages"
                        active={tab === 'direct'}
                    />
                </Link>
                <SidebarSeparator />
            </div>
            <div className="flex flex-col gap-2.5">
                <SidebarItem icon={IconSettings} label="Settings" />
            </div>
        </div>
    );
}
