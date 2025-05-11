import { EmptyState } from '@components/ui/empty-state';
import { IconHash } from '@tabler/icons-react';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/app/rooms/')({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <EmptyState
            icon={IconHash}
            title="No Rooms"
            description="Create or join a public room to get started."
        />
    );
}
