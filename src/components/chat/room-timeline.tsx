import { ScrollArea } from '@components/ui/scroll-area';
import { useMatrixClient, useRoom, useTimeline, useGroupEvents } from '@lib/hooks';
import { MatrixEvent, RoomEvent } from 'matrix-js-sdk';
import { useEffect, useState } from 'react';
import { MessageGroup } from './message';

export type RoomTimelineProps = {
    roomId: string;
};

export function RoomTimeline({ roomId }: RoomTimelineProps) {
    // const [messages, setMessages] = useState<MatrixEvent[]>([]);
    // const mx = useMatrixClient();

    // const room = useRoom(roomId);

    // useEffect(() => {
    //     if (!mx || !room) return;

    //     const updateMessages = () => {
    //         const events = room.getLiveTimeline().getEvents();
    //         setMessages(events);
    //     };

    //     updateMessages();

    //     const onTimelineUpdate = () => {
    //         updateMessages();
    //     };

    //     room.on(RoomEvent.Timeline, onTimelineUpdate);

    //     return () => {
    //         room.off(RoomEvent.Timeline, onTimelineUpdate);
    //     };
    // }, [mx, room]);

    const timeline = useTimeline({ roomId });

    // Use our new hook to group messages by sender and time proximity
    const groupedMessages = useGroupEvents(timeline.events);

    return (
        <ScrollArea className="flex-1 h-1">
            <div className="flex flex-col gap-2 pb-3 pt-6">
                {groupedMessages.map((group, index) => (
                    <MessageGroup key={`group-${index}-${group[0]?.data.getId()}`} data={group} />
                ))}
            </div>
        </ScrollArea>
    );
}
