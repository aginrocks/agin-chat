import { AppShell } from '@components/ui/app-shell';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/app')({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <AppShell>
            <Outlet />
        </AppShell>
    );
}
