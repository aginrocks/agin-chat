import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
    component: RouteComponent,
    loader: () => {
        throw redirect({
            to: '/app/direct',
        });
    },
});

function RouteComponent() {
    return <>a</>;
}
