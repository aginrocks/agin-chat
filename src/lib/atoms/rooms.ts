import { useClientEvent, useMatrixClient } from '@lib/hooks';
import { atom, useSetAtom } from 'jotai';
import { ClientEvent, Room } from 'matrix-js-sdk';
import { useCallback, useEffect } from 'react';

export const RoomsAtom = atom<Room[]>([]);

export function useBindRooms() {
    const mx = useMatrixClient();
    const setRoomsAtom = useSetAtom(RoomsAtom);

    const bind = useCallback(() => {
        if (!mx) return;

        setRoomsAtom(() => mx.getRooms());
    }, [setRoomsAtom, mx]);

    useEffect(bind, [bind]);

    useClientEvent(ClientEvent.Room, bind);
}
