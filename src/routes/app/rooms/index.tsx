import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/app/rooms/')({
    component: RouteComponent,
});

function RouteComponent() {
    return <div></div>;
}
