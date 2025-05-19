import { Room } from 'matrix-js-sdk';
import { useEffect, useState } from 'react';
import { useMatrixClient } from './useMatrixClient';

export function useRoom(roomId: string) {
    const [room, setRoom] = useState<Room | null>(null);
    const mx = useMatrixClient();

    useEffect(() => {
        if (!mx) return;

        const room = mx.getRoom(roomId);
        if (!room) return;

        setRoom(room);
    }, [mx, roomId]);

    return room;
}
