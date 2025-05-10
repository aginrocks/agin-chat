import { useSetTitle } from '@lib/hooks';
import { IconUsers } from '@tabler/icons-react';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/app/direct')({
    component: RouteComponent,
});

function RouteComponent() {
    useSetTitle({
        title: 'Direct Messages',
        icon: IconUsers,
    });

    return <div></div>;
}
