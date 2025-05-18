import { Direct } from '@lib/atoms';
import { cn, mxcUrlToHttp } from '@lib/utils';
import { sidebarItem } from './secondary-sidebar/SidebarItem';
import { VariantProps } from 'class-variance-authority';
import { Avatar } from './avatar';
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { useMatrixClient } from '@lib/hooks';

export type DirectRoomProps = VariantProps<typeof sidebarItem> & {
    data: Direct;
};

export function DirectRoomItem({ data, active }: DirectRoomProps) {
    const mx = useMatrixClient();

    // FIXME: avatars
    const avatarUrl = mxcUrlToHttp(mx, data.user?.avatarUrl ?? '', true) ?? '';
    console.log(avatarUrl);

    return (
        <div className={cn(sidebarItem({ active }), 'gap-3 py-1.5')}>
            <Avatar className="h-8 w-8 flex justify-center items-center bg-white/5">
                <AvatarImage src={avatarUrl} />
                <AvatarFallback className="text-xs">
                    {data?.room?.name.charAt(0).toUpperCase()}
                </AvatarFallback>
            </Avatar>
            <div className="text-sm font-medium">{data.room?.name}</div>
        </div>
    );
}
