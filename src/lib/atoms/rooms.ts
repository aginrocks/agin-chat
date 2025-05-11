import { useMatrixClient } from '@lib/hooks';
import { atom, useSetAtom } from 'jotai';
import { ClientEvent, Room } from 'matrix-js-sdk';
import { useEffect } from 'react';

export const RoomsAtom = atom<Room[]>([]);

export function useBindRooms() {
    const mx = useMatrixClient();
    const setRoomsAtom = useSetAtom(RoomsAtom);

    useEffect(() => {
        console.log('binding rooms');

        if (!mx) return;

        setRoomsAtom(mx.getRooms());

        const handleAddRoom = (room: Room) => {
            setRoomsAtom((prevRooms) => {
                const exists = prevRooms.some((r) => r.roomId === room.roomId);
                if (exists) return prevRooms;
                return [...prevRooms, room];
            });
        };

        mx.on(ClientEvent.Room, handleAddRoom);

        return () => {
            mx.off(ClientEvent.Room, handleAddRoom);
        };
    }, [mx, setRoomsAtom]);
}
