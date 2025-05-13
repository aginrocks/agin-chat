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

export type RoomViewProps = {
    roomId: string;
    roomType: 'direct' | 'room' | 'space';
};

export function RoomView({ roomId, roomType }: RoomViewProps) {
    return <RoomHeader roomId={roomId} roomType={roomType} />;
}
