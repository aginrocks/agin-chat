import { cn } from '@lib/utils';
import { sidebarItem } from './secondary-sidebar/SidebarItem';
import { Room } from 'matrix-js-sdk';
import { IconHash } from '@tabler/icons-react';
import { VariantProps } from 'class-variance-authority';

export type RoomProps = VariantProps<typeof sidebarItem> & {
    data: Room;
    context: 'standalone' | 'space';
};

export function RoomItem({ data, active }: RoomProps) {
    return (
        <div className={cn(sidebarItem({ active }), 'gap-2')}>
            <IconHash size={18} />
            <div className="text-sm font-medium">{data.name}</div>
        </div>
    );
}
