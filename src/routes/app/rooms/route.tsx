import { Button } from '@components/ui/button';
import { Header } from '@components/ui/header';
import { SecondarySidebarWrapper } from '@components/ui/secondary-sidebar';
import { useSetTitle } from '@lib/hooks';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import { IconHash, IconPlus, IconSearch } from '@tabler/icons-react';
import { createFileRoute, Link, Outlet, useLocation } from '@tanstack/react-router';
import { useAtomValue } from 'jotai';
import { RoomsAtom } from '@lib/atoms';
import { SidebarList } from '@components/ui/secondary-sidebar/SidebarList';
import { RoomItem } from '@components/ui/room';
import { ScrollArea } from '@components/ui/scroll-area';

export const Route = createFileRoute('/app/rooms')({
    component: RouteComponent,
});

function RouteComponent() {
    useSetTitle({
        title: 'Rooms',
        icon: IconHash,
    });

    const rooms = useAtomValue(RoomsAtom);

    const { href } = useLocation();
    const activeRoomId = decodeURIComponent(href.split('/')[3]);

    return (
        <SecondarySidebarWrapper
            sidebarContent={
                <>
                    <Header
                        title="Rooms"
                        className="pr-1.5"
                        rightSection={
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Button variant="ghost" size="icon">
                                        <IconPlus />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem>
                                        <IconPlus />
                                        New Room
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <IconSearch />
                                        Join public room
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        }
                    />
                    <ScrollArea className="flex-1 h-1">
                        <SidebarList>
                            {rooms.map((room) => (
                                <Link
                                    to="/app/rooms/$roomId"
                                    params={{ roomId: room.roomId }}
                                    key={room.roomId}
                                >
                                    <RoomItem data={room} active={room.roomId == activeRoomId} />
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
