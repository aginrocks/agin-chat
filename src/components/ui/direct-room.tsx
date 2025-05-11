import { Direct } from '@lib/atoms';
import { cn } from '@lib/utils';
import { sidebarItem } from './secondary-sidebar/SidebarItem';

export type DirectRoomProps = {
    data: Direct;
};

export function DirectRoomItem({ data }: DirectRoomProps) {
    return <div className={cn(sidebarItem(), 'gap-2')}>Room</div>;
}
