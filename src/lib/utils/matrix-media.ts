import { MatrixClient } from 'matrix-js-sdk';

/**
 * Creates an authenticated URL for matrix media
 * This is an alternative approach to using mxcUrlToHttp when standard approach fails
 */
export const getAuthenticatedMediaUrl = (
    mx: MatrixClient | undefined,
    mxcUrl: string,
    width?: number,
    height?: number
): string | null => {
    if (!mx || !mxcUrl || !mxcUrl.startsWith('mxc://')) {
        return null;
    }

    // Extract server name and media ID from the mxc URL
    // Format is: mxc://<server-name>/<media-id>
    const mxcParts = mxcUrl.substring(6).split('/');
    if (mxcParts.length !== 2) {
        return null;
    }

    const [serverName, mediaId] = mxcParts;
    const homeserverUrl = mx.getHomeserverUrl();
    const accessToken = mx.getAccessToken();

    if (!accessToken) {
        return null;
    }

    // Construct a URL using Matrix spec format for media access
    let url = `${homeserverUrl}/_matrix/media/r0/download/${serverName}/${mediaId}`;

    // Add size parameters if provided
    const params = new URLSearchParams();
    if (width) params.append('width', width.toString());
    if (height) params.append('height', height.toString());

    // Add the access token
    params.append('access_token', accessToken);

    // Append params if any exist
    const paramsStr = params.toString();
    if (paramsStr) {
        url += `?${paramsStr}`;
    }

    return url;
};
