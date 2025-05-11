import { Header } from '@components/ui/header';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/app/rooms/$roomId')({
    component: RouteComponent,
});

function RouteComponent() {
    const { roomId } = Route.useParams();
    return (
        <div>
            <Header title={roomId} />
        </div>
    );
}
