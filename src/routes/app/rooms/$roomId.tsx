import { RoomView } from '@components/chat';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/app/rooms/$roomId')({
    component: RouteComponent,
});

function RouteComponent() {
    const { roomId } = Route.useParams();
    return <RoomView roomId={roomId} roomType="room" />;
}
