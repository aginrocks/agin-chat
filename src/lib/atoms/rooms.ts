import { useClientEvent, useMatrixClient } from '@lib/hooks';
import { atom, useSetAtom } from 'jotai';
import { ClientEvent, Room } from 'matrix-js-sdk';
import { useCallback, useEffect } from 'react';

export const RoomsAtom = atom<Room[]>([]);

export function useBindRooms() {
    const mx = useMatrixClient();
    const setRoomsAtom = useSetAtom(RoomsAtom);

    useEffect(() => {
        console.log('binding rooms');

        if (!mx) return;

        setRoomsAtom(mx.getRooms());
    }, [mx, setRoomsAtom]);

    useClientEvent(
        ClientEvent.Room,
        useCallback(
            (room: Room) => {
                if (!mx) return;
                console.log('room event', room);

                setRoomsAtom(() => mx.getRooms());
            },
            [setRoomsAtom, mx]
        )
    );
}
