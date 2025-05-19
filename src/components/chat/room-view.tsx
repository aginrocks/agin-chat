import { RoomHeader } from './room-header';
import { MessageInput } from './message-input';
import { createStore, useAtomValue } from 'jotai';
import { SidebarOpenAtom } from '@lib/atoms';
import { RoomSidebar } from './room-sidebar';
import { RoomTimeline } from './room-timeline';

export type RoomViewProps = {
    roomId: string;
    roomType: 'direct' | 'room' | 'space';
};

export type SidebarTab = 'members' | 'info';

export const roomUiStore = createStore();

export function RoomView({ roomId, roomType }: RoomViewProps) {
    const sidebarOpen = useAtomValue(SidebarOpenAtom);

    return (
        <div className="flex flex-col h-full flex-1">
            <RoomHeader roomId={roomId} roomType={roomType} />
            <div className="flex flex-1 w-full h-full">
                <div className="flex-1 h-full flex flex-col">
                    <RoomTimeline roomId={roomId} />
                    <div className="pb-5 pt-0 px-2">
                        <MessageInput />
                    </div>
                </div>
                {sidebarOpen && <RoomSidebar />}
            </div>
        </div>
    );
}
