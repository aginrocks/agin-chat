import { useCallback, useRef } from 'react';
import { start, cancel, onUrl } from '@fabianlars/tauri-plugin-oauth';
import { openUrl } from '@tauri-apps/plugin-opener';
import * as uuid from 'uuid';

export function useSSOFlow() {
    const flowActive = useRef(false);

    const startFlow = useCallback(async (homeserverBaseUrl: string, providerId?: string) => {
        const port = await start();
        flowActive.current = true;

        const state = uuid.v4();

        await onUrl(async (url) => {
            console.log('Received OAuth URL:', url);

            await cancel(port);
            flowActive.current = false;
        });

        const redirectUrl = `http://localhost:${port}/callback?state=${state}`;

        await openUrl(
            `${homeserverBaseUrl}/_matrix/client/r0/login/sso/redirect${providerId ? `/${providerId}` : ''}?redirectUrl=${encodeURIComponent(redirectUrl)}`
        );

        return async () => {
            if (flowActive.current) {
                await cancel(port);
                flowActive.current = false;
            }
        };
    }, []);

    return { start: startFlow };
}
