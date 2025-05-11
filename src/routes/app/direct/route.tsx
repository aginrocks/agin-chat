import { Button } from '@components/ui/button';
import { Header } from '@components/ui/header';
import { SecondarySidebarWrapper } from '@components/ui/secondary-sidebar';
import { useSetTitle } from '@lib/hooks';
import { IconPlus, IconUsers } from '@tabler/icons-react';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/app/direct')({
    component: RouteComponent,
});

function RouteComponent() {
    useSetTitle({
        title: 'Direct Messages',
        icon: IconUsers,
    });

    return (
        <SecondarySidebarWrapper
            sidebarContent={
                <Header
                    title="Direct Messages"
                    className="pr-1.5"
                    rightSection={
                        <Button variant="ghost" size="icon">
                            <IconPlus />
                        </Button>
                    }
                ></Header>
            }
        >
            <Outlet />
        </SecondarySidebarWrapper>
    );
}
