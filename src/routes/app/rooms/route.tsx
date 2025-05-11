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
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/app/rooms')({
    component: RouteComponent,
});

function RouteComponent() {
    useSetTitle({
        title: 'Rooms',
        icon: IconHash,
    });

    return (
        <SecondarySidebarWrapper
            sidebarContent={
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
                ></Header>
            }
        >
            <Outlet />
        </SecondarySidebarWrapper>
    );
}
