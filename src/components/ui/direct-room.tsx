import { Direct } from '@lib/atoms';
import { cn, mxcUrlToHttp } from '@lib/utils';
import { sidebarItem } from './secondary-sidebar/SidebarItem';
import { VariantProps } from 'class-variance-authority';
import { useMatrixClient } from '@lib/hooks';
import { MatrixAvatar } from './matrix-avatar';

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
            {data.user && <MatrixAvatar user={data.user} fallbackName={data.room?.name} />}
            <div className="text-sm font-medium">{data.room?.name}</div>
        </div>
    );
}
