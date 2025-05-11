import { RoomsAtom } from '@lib/atoms';
import { useAtomValue } from 'jotai';

export function useStandaloneRooms() {
    const rooms = useAtomValue(RoomsAtom);

    const standaloneRooms = rooms.filter((room) => room.accountData.get('m.di'));
}
export function useDirects() {
    const rooms = useAtomValue(RoomsAtom);
}
