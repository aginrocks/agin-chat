import { useTimeline, useGroupEvents } from '@lib/hooks';
import { MessageGroup } from './message';
import { ScrollArea } from '@components/ui/scroll-area';

export type RoomTimelineProps = {
    roomId: string;
};

export function RoomTimeline({ roomId }: RoomTimelineProps) {
    const timeline = useTimeline({ roomId });

    // Use our new hook to group messages by sender and time proximity
    const groupedMessages = useGroupEvents(timeline.events);

    return (
        <ScrollArea
            className="flex-1 h-1"
            type="always"
            scrollbarProps={{ className: 'mx-2 py-2' }}
        >
            <div className="flex flex-col gap-2 pb-3 pt-6">
                {groupedMessages.map((group, index) => (
                    <MessageGroup key={`group-${index}-${group[0]?.data.getId()}`} data={group} />
                ))}
            </div>
        </ScrollArea>
    );
}
