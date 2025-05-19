import { useMatrixClient } from '@lib/hooks';
import { cn, mxcUrlToHttp } from '@lib/utils';
import { User } from 'matrix-js-sdk';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { cva, VariantProps } from 'class-variance-authority';

export type MatrixAvatarProps = VariantProps<typeof sizeVariants> & {
    user: User;
    fallbackName?: string;
};

const sizeVariants = cva('', {
    variants: {
        size: {
            sm: 'size-8',
            md: 'size-10',
            lg: 'size-12',
        },
    },
    defaultVariants: {
        size: 'sm',
    },
});

export function MatrixAvatar({ user, fallbackName, size }: MatrixAvatarProps) {
    const mx = useMatrixClient();

    // FIXME: avatars
    const avatarUrl = mxcUrlToHttp(mx, user.avatarUrl ?? '', true) ?? '';
    console.log(avatarUrl);

    return (
        <Avatar
            className={cn('flex justify-center items-center bg-white/5', sizeVariants({ size }))}
        >
            <AvatarImage src={avatarUrl} />
            <AvatarFallback className="text-xs">
                {(fallbackName || user.displayName)?.charAt(0).toUpperCase() ?? ''}
            </AvatarFallback>
        </Avatar>
    );
}
