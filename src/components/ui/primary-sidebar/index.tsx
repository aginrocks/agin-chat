import { Link, useLocation } from '@tanstack/react-router';
import { SidebarItem } from './SidebarItem';
import { IconHash, IconPlus, IconSettings, IconUsers } from '@tabler/icons-react';
import { SidebarSeparator } from './SidebarSeparator';

export function PrimarySidebar() {
    const { pathname } = useLocation();
    const tab = pathname.split('/')[2];

    return (
        <div className="flex flex-col justify-between p-3.5 pt-0 h-full">
            <div className="flex flex-col gap-2.5">
                <Link to="/app/direct">
                    <SidebarItem
                        icon={IconUsers}
                        label="Direct Messages"
                        active={tab === 'direct'}
                    />
                </Link>
                <Link to="/app/rooms">
                    <SidebarItem icon={IconHash} label="Rooms" active={tab === 'rooms'} />
                </Link>
                <SidebarSeparator />
                <SidebarItem icon={IconPlus} label="Create a Space" />
            </div>
            <div className="flex flex-col gap-2.5">
                <SidebarItem icon={IconSettings} label="Settings" />
            </div>
        </div>
    );
}
