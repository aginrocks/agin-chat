import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/app/direct/')({
    component: RouteComponent,
});

function RouteComponent() {
    return <div></div>;
}
