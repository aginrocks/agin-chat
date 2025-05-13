import { RoomView } from '@components/chat';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/app/direct/$roomId')({
    component: RouteComponent,
});

function RouteComponent() {
    const { roomId } = Route.useParams();
    return (
        <div>
            <RoomView roomId={roomId} roomType="direct" />
        </div>
    );
}
