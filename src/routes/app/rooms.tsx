import { useSetTitle } from '@lib/hooks';
import { IconHash } from '@tabler/icons-react';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/app/rooms')({
    component: RouteComponent,
});

function RouteComponent() {
    useSetTitle({
        title: 'Rooms',
        icon: IconHash,
    });

    return <div></div>;
}
