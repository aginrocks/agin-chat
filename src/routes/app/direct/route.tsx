import { Button } from '@components/ui/button';
import { DirectRoomItem } from '@components/ui/direct-room';
import { Header } from '@components/ui/header';
import { RoomItem } from '@components/ui/room';
import { SecondarySidebarWrapper } from '@components/ui/secondary-sidebar';
import { SidebarList } from '@components/ui/secondary-sidebar/SidebarList';
import { DirectsAtom, RoomsAtom } from '@lib/atoms';
import { useSetTitle } from '@lib/hooks';
import { IconPlus, IconUsers } from '@tabler/icons-react';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { useAtom, useAtomValue } from 'jotai';

export const Route = createFileRoute('/app/direct')({
    component: RouteComponent,
});

function RouteComponent() {
    useSetTitle({
        title: 'Direct Messages',
        icon: IconUsers,
    });

    const directs = useAtomValue(DirectsAtom);

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
                    {/* <SidebarList>
                        <RoomItem />
                        <RoomItem active />
                    </SidebarList> */}
                </>
            }
        >
            <Outlet />
        </SecondarySidebarWrapper>
    );
}
