import { MatrixEvent } from 'matrix-js-sdk';
import { MessageBody } from './body';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useMatrixClient } from '@lib/hooks';
import { MatrixAvatar } from '@components/ui/matrix-avatar';
import { MessageActions } from './actions';
import { useHover } from '@mantine/hooks';
import { cn } from '@lib/utils';
import clsx from 'clsx';
import { atom, useAtomValue } from 'jotai';
import { ScopeProvider } from 'jotai-scope';
import { MessageTiming } from './timing';

export type MessageProps = {
    data: MatrixEvent;
    isFirst?: boolean;
};

export const DropdownOpenAtom = atom(false);

export function Message(props: MessageProps) {
    return (
        <ScopeProvider atoms={[DropdownOpenAtom]}>
            <MessageInner {...props} />
        </ScopeProvider>
    );
}

export function MessageInner({ data, isFirst = true }: MessageProps) {
    const mx = useMatrixClient();

    const sender = useMemo(() => data.getSender(), [data]);
    const user = useMemo(() => (sender ? mx?.getUser(sender) : null), [mx, data, sender]);

    const { ref, hovered } = useHover();
    const dropdownOpen = useAtomValue(DropdownOpenAtom);

    const [dropdownOpenDelayed, setDropdownOpenDelayed] = useState(false);

    useEffect(() => {
        if (dropdownOpen) {
            setDropdownOpenDelayed(true);
        } else {
            const timeout = setTimeout(() => {
                setDropdownOpenDelayed(false);
            }, 200);

            return () => clearTimeout(timeout);
        }
    }, [dropdownOpen]);

    const actionsVisible = hovered || dropdownOpenDelayed;

    return (
        <div
            className={cn(
                'px-4 py-0.5 flex gap-3 relative',
                clsx({ 'bg-black/2 dark:bg-white/2': actionsVisible })
            )}
            ref={ref}
        >
            <div className="w-10 min-w-10 flex justify-end">
                {isFirst && user && <MatrixAvatar user={user} size="md" />}
                {!isFirst && hovered && (
                    <div className="py-[2px]">
                        <MessageTiming data={data} forceHoursOnly />
                    </div>
                )}
            </div>
            <div>
                {isFirst && (
                    <div className="flex items-center gap-1.5">
                        <div className="text-sm font-semibold">{user?.displayName}</div>
                        <MessageTiming data={data} />
                    </div>
                )}
                <MessageBody data={data} />
            </div>
            <div
                className={cn(
                    'absolute right-4 top-0 -translate-y-9/12',
                    clsx({ hidden: !actionsVisible })
                )}
            >
                <MessageActions canEdit={mx?.getUserId() === sender} canDelete />
            </div>
        </div>
    );
}

export * from './group';
export * from './body';
