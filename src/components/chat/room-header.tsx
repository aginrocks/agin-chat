import { Button } from '@components/ui/button';
import { Header } from '@components/ui/header';
import { Tooltip, TooltipContent, TooltipTrigger } from '@components/ui/tooltip';
import { DirectsAtom, SidebarOpenAtom, SidebarTabAtom } from '@lib/atoms';
import { useRoom } from '@lib/hooks';
import {
    Icon,
    IconLayoutSidebarRight,
    IconLayoutSidebarRightFilled,
    IconPhone,
    IconPin,
    IconUsers,
    IconVideo,
} from '@tabler/icons-react';
import { useAtom } from 'jotai';
import { useMemo } from 'react';

export type RoomHeaderProps = {
    roomId: string;
    roomType: 'direct' | 'room' | 'space';
};

export type Action = React.ComponentProps<'button'> & {
    icon: Icon;
    label: string;
};

export function RoomHeader({ roomId, roomType }: RoomHeaderProps) {
    const [sidebarOpen, setSidebarOpen] = useAtom(SidebarOpenAtom);
    const [sidebarTab, setSidebarTab] = useAtom(SidebarTabAtom);

    const room = useRoom(roomId);

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
            ...(roomType !== 'direct'
                ? [
                      {
                          icon: IconUsers,
                          label: 'Members',
                      },
                  ]
                : []),
            {
                icon: sidebarOpen ? IconLayoutSidebarRightFilled : IconLayoutSidebarRight,
                label: `${sidebarOpen ? 'Hide' : 'Show'} Sidebar`,
                onClick: () => setSidebarOpen((o) => !o),
            },
        ],
        [roomType, sidebarOpen]
    );

    return (
        <Header custom className="px-4 items-center justify-between">
            <div className="flex items-center gap-2">
                <div className="font-semibold">{room?.name}</div>
                {roomType !== 'direct' && (
                    <>
                        <div className="text-muted-foreground">•</div>
                        <div className="text-xs text-muted-foreground mt-0.5">Room Description</div>
                    </>
                )}
            </div>
            <div className="flex gap-0.5">
                {actions.map(({ icon: Icon, label, ...props }) => (
                    <Tooltip key={label}>
                        <TooltipTrigger>
                            <Button variant="ghost" size="icon" {...props}>
                                <Icon />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" sideOffset={4}>
                            <p>{label}</p>
                        </TooltipContent>
                    </Tooltip>
                ))}
            </div>
        </Header>
    );
}
