import { Button } from '@components/ui/button';
import { Header } from '@components/ui/header';
import { Tooltip, TooltipContent, TooltipTrigger } from '@components/ui/tooltip';
import { Icon, IconLayoutSidebarRight, IconPhone, IconPin, IconVideo } from '@tabler/icons-react';
import { useMemo } from 'react';

export type RoomHeaderProps = {
    roomId: string;
    roomType: 'direct' | 'room' | 'space';
};

export type Action = {
    icon: Icon;
    label: string;
};

export function RoomHeader({ roomId, roomType }: RoomHeaderProps) {
    const actions = useMemo<Action[]>(
        () => [
            {
                icon: IconPhone,
                label: 'Voice Call',
            },
            {
                icon: IconVideo,
                label: 'Video Call',
            },
            {
                icon: IconPin,
                label: 'Pinned messages',
            },
            {
                icon: IconLayoutSidebarRight,
                label: 'Sidebar',
            },
        ],
        []
    );

    return (
        <Header custom className="px-4 items-center justify-between">
            <div className="flex items-center gap-2">
                <div className="font-semibold">Room Name</div>
                {roomType !== 'direct' && (
                    <>
                        <div className="text-muted-foreground">•</div>
                        <div className="text-xs text-muted-foreground mt-0.5">Room Description</div>
                    </>
                )}
            </div>
            <div className="flex gap-0.5">
                {actions.map((a) => (
                    <Tooltip>
                        <TooltipTrigger>
                            <Button variant="ghost" size="icon">
                                <a.icon />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" sideOffset={4}>
                            <p>{a.label}</p>
                        </TooltipContent>
                    </Tooltip>
                ))}
            </div>
        </Header>
    );
}
