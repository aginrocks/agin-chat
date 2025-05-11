import { EmptyState } from '@components/ui/empty-state';
import { IconUsers } from '@tabler/icons-react';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/app/direct/')({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <EmptyState
            icon={IconUsers}
            title="No Direct Messages"
            description="Use the plus icon to start a new conversation."
        />
    );
}
