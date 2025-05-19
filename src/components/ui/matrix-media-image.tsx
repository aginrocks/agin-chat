import { useMatrixClient } from '@lib/hooks';
import { mxcUrlToHttp } from '@lib/utils';
import { useEffect, useState } from 'react';

interface MatrixMediaImageProps {
    mxcUrl: string;
    width?: number;
    height?: number;
    className?: string;
    alt?: string;
}

export function MatrixMediaImage({ mxcUrl, width, height, className, alt }: MatrixMediaImageProps) {
    const mx = useMatrixClient();
    const [imageUrl, setImageUrl] = useState<string>('');
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!mxcUrl || !mx) return;

        // First try with the standard mxcUrlToHttp method
        const httpUrl = mxcUrlToHttp(mx, mxcUrl, true, width, height);

        if (httpUrl) {
            setImageUrl(httpUrl);
        } else {
            setError(true);
        }
    }, [mxcUrl, mx, width, height]);

    if (error || !imageUrl) {
        return null;
    }

    return (
        <img
            src={imageUrl}
            width={width}
            height={height}
            className={className}
            alt={alt}
            onError={() => setError(true)}
        />
    );
}
