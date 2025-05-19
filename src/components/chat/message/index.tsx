import { MatrixEvent, User } from 'matrix-js-sdk';
import { MessageBody } from './body';
import { useMemo } from 'react';
import { useMatrixClient } from '@lib/hooks';
import { MatrixAvatar } from '@components/ui/matrix-avatar';

export type MessageProps = {
    data: MatrixEvent;
    isFirst?: boolean;
};

export function Message({ data, isFirst = true }: MessageProps) {
    const mx = useMatrixClient();

    const sender = useMemo(() => data.getSender(), [data]);
    const user = useMemo(() => (sender ? mx?.getUser(sender) : null), [mx, data, sender]);

    return (
        <div className="px-4 py-0.5 hover:bg-black/2 hover:dark:bg-white/2 flex gap-2">
            <div className="w-10">{isFirst && user && <MatrixAvatar user={user} size="md" />}</div>
            <div>
                {isFirst && <div className="text-sm font-semibold">{user?.displayName}</div>}
                <MessageBody data={data} />
            </div>
        </div>
    );
}

export * from './group';
export * from './body';
