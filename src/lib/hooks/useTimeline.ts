import { useEffect, useState, useRef, useCallback } from 'react';
import { EventTimeline, IRoomTimelineData, MatrixEvent, Room, RoomEvent } from 'matrix-js-sdk';
import { useMatrixClient } from './useMatrixClient';

interface useTimelineProps {
    roomId: string;
    initialLimit?: number;
}

export function useTimeline({ roomId, initialLimit = 30 }: useTimelineProps) {
    const mx = useMatrixClient();
    const [events, setEvents] = useState<MatrixEvent[]>([]);
    const [canPaginate, setCanPaginate] = useState(true);
    const timelineRef = useRef<EventTimeline>();

    useEffect(() => {
        if (!mx) return;

        const room = mx.getRoom(roomId);
        if (!room) return;

        const timeline = room.getLiveTimeline();
        timelineRef.current = timeline;

        mx.scrollback(room, initialLimit).then(() => {
            setEvents([...timeline.getEvents()]);
        });

        const onTimeline = (
            event: MatrixEvent,
            room: Room | undefined,
            toStartOfTimeline?: boolean,
            removed?: boolean,
            data?: IRoomTimelineData
        ) => {
            if (!room || room.roomId !== roomId || toStartOfTimeline) return;
            setEvents([...timeline.getEvents()]);
        };

        mx.on(RoomEvent.Timeline, onTimeline);

        return () => {
            mx.removeListener(RoomEvent.Timeline, onTimeline);
        };
    }, [mx, roomId, initialLimit]);

    const loadMore = useCallback(async () => {
        if (!mx) return;

        const room = mx.getRoom(roomId);
        const timeline = timelineRef.current;
        if (!room || !timeline) return;

        await mx.paginateEventTimeline(timeline, { backwards: true, limit: 20 });

        setEvents([...timeline.getEvents()]);
    }, [mx, roomId]);

    return {
        events,
        loadMore,
        canPaginate,
    };
}
