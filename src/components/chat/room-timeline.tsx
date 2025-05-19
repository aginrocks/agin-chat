import { ScrollArea } from '@components/ui/scroll-area';
import { useMatrixClient } from '@lib/hooks';
import { MatrixEvent, RoomEvent } from 'matrix-js-sdk';
import { useEffect, useState } from 'react';
import { MessageGroup } from './message';

export type RoomTimelineProps = {
    roomId: string;
};

export function RoomTimeline({ roomId }: RoomTimelineProps) {
    const [messages, setMessages] = useState<MatrixEvent[]>([]);
    const mx = useMatrixClient();

    useEffect(() => {
        if (!mx) return;

        const room = mx.getRoom(roomId);
        if (!room) return;

        const updateMessages = () => {
            const events = room.getLiveTimeline().getEvents();
            setMessages(events);
        };

        updateMessages();

        const onTimelineUpdate = () => {
            updateMessages();
        };

        room.on(RoomEvent.Timeline, onTimelineUpdate);

        return () => {
            room.off(RoomEvent.Timeline, onTimelineUpdate);
        };
    }, [mx, roomId]);

    return (
        <ScrollArea className="flex-1 h-1">
            <div className="flex flex-col gap-2">
                {messages.map((m) => (
                    <MessageGroup key={m.getId()} data={[{ data: m }, { data: m }]} />
                ))}
            </div>
        </ScrollArea>
    );
}
