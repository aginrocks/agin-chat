import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
    component: RouteComponent,
    loader: () => {
        throw redirect({
            to: '/app/home',
        });
    },
});

function RouteComponent() {
    return <>a</>;
}
