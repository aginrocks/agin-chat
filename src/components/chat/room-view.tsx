import { Button } from '@components/ui/button';
import { Header } from '@components/ui/header';
import { Tooltip, TooltipContent, TooltipTrigger } from '@components/ui/tooltip';
import {
    IconDots,
    IconLayoutSidebarRight,
    IconPhone,
    IconPin,
    IconUserCircle,
    IconUsers,
    IconVideo,
} from '@tabler/icons-react';
import { RoomHeader } from './room-header';
import { MessageInput } from './message-input';
import { createStore, Provider, useAtomValue } from 'jotai';
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
                    <div className="p-4 pt-0">
                        <MessageInput />
                    </div>
                </div>
                {sidebarOpen && <RoomSidebar />}
            </div>
        </div>
    );
}
