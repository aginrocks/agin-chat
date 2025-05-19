import { MatrixClient } from 'matrix-js-sdk';

export const matchMxId = (id: string): RegExpMatchArray | null => id.match(/^([@!$+#])(.+):(\S+)$/);

export const validMxId = (id: string): boolean => !!matchMxId(id);

export const getMxIdServer = (userId: string): string | undefined => matchMxId(userId)?.[3];

export const getMxIdLocalPart = (userId: string): string | undefined => matchMxId(userId)?.[2];

export const isUserId = (id: string): boolean => validMxId(id) && id.startsWith('@');

export const isRoomId = (id: string): boolean => validMxId(id) && id.startsWith('!');

export const isRoomAlias = (id: string): boolean => validMxId(id) && id.startsWith('#');

/**
 * Convert MXC URL to HTTP URL using matrix-js-sdk
 * Note: This function will only work if you're properly authenticated.
 * For issues with authenticated media, try using getAuthenticatedMediaUrl from matrix-media.ts
 */
export const mxcUrlToHttp = (
    mx: MatrixClient | undefined,
    mxcUrl: string,
    useAuthentication?: boolean,
    width?: number,
    height?: number,
    resizeMethod?: string,
    allowDirectLinks?: boolean,
    allowRedirects?: boolean
): string | null =>
    mx
        ? mx.mxcUrlToHttp(
              mxcUrl,
              width,
              height,
              resizeMethod,
              allowDirectLinks,
              allowRedirects,
              useAuthentication
          )
        : null;
