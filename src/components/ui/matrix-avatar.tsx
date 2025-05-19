import { useMatrixMedia } from '@lib/hooks';
import { cn } from '@lib/utils';
import { User } from 'matrix-js-sdk';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { cva, VariantProps } from 'class-variance-authority';
import { useState } from 'react';

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
    const [imageError, setImageError] = useState(false);
    const { url: avatarUrl, loading, error } = useMatrixMedia(user.avatarUrl);

    // Log for debugging
    console.log('MXC URL:', user.avatarUrl);
    console.log('Processed URL:', avatarUrl);
    console.log('Media loading:', loading);
    console.log('Media error:', error);

    return (
        <Avatar
            className={cn('flex justify-center items-center bg-white/5', sizeVariants({ size }))}
        >
            {avatarUrl && !imageError && !error ? (
                <AvatarImage
                    src={avatarUrl}
                    onError={() => setImageError(true)}
                    crossOrigin="anonymous" // Try with crossOrigin to help with CORS issues
                />
            ) : null}
            <AvatarFallback className="text-xs">
                {(fallbackName || user.displayName)?.charAt(0).toUpperCase() ?? ''}
            </AvatarFallback>
        </Avatar>
    );
}
