import { Button } from '@components/ui/button';
import { DirectRoomItem } from '@components/ui/direct-room';
import { Header } from '@components/ui/header';
import { ScrollArea } from '@components/ui/scroll-area';
import { SecondarySidebarWrapper } from '@components/ui/secondary-sidebar';
import { SidebarList } from '@components/ui/secondary-sidebar/SidebarList';
import { DirectsAtom } from '@lib/atoms';
import { useSetTitle } from '@lib/hooks';
import { IconPlus, IconUsers } from '@tabler/icons-react';
import { createFileRoute, Link, Outlet, useLocation } from '@tanstack/react-router';
import { useAtomValue } from 'jotai';

export const Route = createFileRoute('/app/direct')({
    component: RouteComponent,
});

function RouteComponent() {
    useSetTitle({
        title: 'Direct Messages',
        icon: IconUsers,
    });

    const directs = useAtomValue(DirectsAtom);

    const { href } = useLocation();
    const activeRoomId = decodeURIComponent(href.split('/')[3]);

    return (
        <SecondarySidebarWrapper
            sidebarContent={
                <>
                    <Header
                        title="Direct Messages"
                        className="pr-1.5"
                        rightSection={
                            <Button variant="ghost" size="icon">
                                <IconPlus />
                            </Button>
                        }
                    />
                    <ScrollArea className="flex-1 h-1">
                        <SidebarList>
                            {directs
                                .filter((d) => !!d.room)
                                .map((direct) => (
                                    <Link
                                        to="/app/direct/$roomId"
                                        params={{ roomId: direct.room?.roomId ?? '' }}
                                        key={direct.room?.roomId}
                                    >
                                        <DirectRoomItem
                                            data={direct}
                                            active={direct.room?.roomId == activeRoomId}
                                        />
                                    </Link>
                                ))}
                        </SidebarList>
                    </ScrollArea>
                </>
            }
        >
            <Outlet />
        </SecondarySidebarWrapper>
    );
}
