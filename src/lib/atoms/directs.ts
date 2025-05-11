import { useEffect } from 'react';
import { atom, useSetAtom } from 'jotai';
import { ClientEvent, EventType, MatrixClient, MatrixEvent, Room, User } from 'matrix-js-sdk';
import { useMatrixClient } from '@lib/hooks';

export type Direct = {
    room: Room | null;
    user: User | null;
};

export const DirectsAtom = atom<Direct[]>([]);

function getAllDirectMessageRooms(mx: MatrixClient): Direct[] {
    const directEvent = mx.getAccountData(EventType.Direct);
    if (!directEvent) return [];

    const directData = directEvent.getContent() as Record<string, string[]>;
    const directRoomIds = new Set<[string, string]>();

    for (const userId in directData) {
        for (const roomId of directData[userId]) {
            directRoomIds.add([userId, roomId]);
        }
    }

    return Array.from(directRoomIds)
        .map(([userId, roomId]) => ({
            room: mx.getRoom(roomId),
            user: mx.getUser(userId),
        }))
        .filter((room) => !!room);
}

export function useBindDirects() {
    const mx = useMatrixClient();
    const setDirects = useSetAtom(DirectsAtom);

    useEffect(() => {
        if (!mx) return;

        console.log('binding directs');

        const updateDMs = () => {
            const dms = getAllDirectMessageRooms(mx);
            setDirects(dms);
        };

        updateDMs();

        const onAccountData = (event: MatrixEvent) => {
            if (event.getType() === EventType.Direct) {
                updateDMs();
            }
        };

        const onRoom = () => {
            updateDMs();
        };

        mx.on(ClientEvent.AccountData, onAccountData);
        mx.on(ClientEvent.Room, onRoom);

        return () => {
            mx.removeListener(ClientEvent.AccountData, onAccountData);
            mx.removeListener(ClientEvent.Room, onRoom);
        };
    }, [mx, setDirects]);
}
