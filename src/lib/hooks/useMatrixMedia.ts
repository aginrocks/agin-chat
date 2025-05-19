import { useMatrixClient } from '@lib/hooks';
import { mxcUrlToHttp } from '@lib/utils';
import { getAuthenticatedMediaUrl } from '@lib/utils/matrix-media';
import { useEffect, useState } from 'react';

/**
 * Custom hook to get a user avatar URL that works with authenticated media
 * First tries the standard mxcUrlToHttp approach, falls back to custom approach if that fails
 */
export function useMatrixMedia(mxcUrl: string | null | undefined, width?: number, height?: number) {
    const mx = useMatrixClient();
    const [url, setUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!mxcUrl || !mx) {
            setLoading(false);
            setUrl(null);
            return;
        }

        // Reset states when mxcUrl changes
        setLoading(true);
        setError(false);

        // First try the standard method
        const standardUrl = mxcUrlToHttp(mx, mxcUrl, true, width, height);

        // If standard method fails, use our custom method
        if (!standardUrl) {
            const customUrl = getAuthenticatedMediaUrl(mx, mxcUrl, width, height);
            setUrl(customUrl);
            setLoading(false);
            if (!customUrl) {
                setError(true);
            }
            return;
        }

        // Check if the standard URL works by preloading the image
        const img = new Image();

        img.onload = () => {
            setUrl(standardUrl);
            setLoading(false);
        };

        img.onerror = () => {
            // Standard URL failed, try custom
            const customUrl = getAuthenticatedMediaUrl(mx, mxcUrl, width, height);
            setUrl(customUrl);
            setLoading(false);
            if (!customUrl) {
                setError(true);
            }
        };

        img.src = standardUrl;

        return () => {
            img.onload = null;
            img.onerror = null;
        };
    }, [mxcUrl, mx, width, height]);

    return { url, loading, error };
}
