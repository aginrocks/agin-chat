import { useCallback, useEffect, useRef } from 'react';
import { cancel } from '@fabianlars/tauri-plugin-oauth';
import { openUrl } from '@tauri-apps/plugin-opener';
import * as uuid from 'uuid';
import { invoke } from '@tauri-apps/api/core';
import { listen } from '@tauri-apps/api/event';
import { getSessionName } from '@/lib/utils';
import { useLogin } from '@/lib/hooks';

export function useSSOFlow() {
    const flowActive = useRef(false);
    const cleanup = useRef<() => Promise<void>>(async () => {});
    const { loginAndSave } = useLogin();

    useEffect(() => {
        return () => {
            cleanup.current();
        };
    }, []);

    const startFlow = useCallback(async (homeserverBaseUrl: string, providerId?: string) => {
        if (flowActive.current) {
            console.log('Flow already active, cleaning up previous flow');
            await cleanup.current();
        }

        const port = await invoke<number>('start_oauth');
        flowActive.current = true;

        const state = uuid.v4();

        const unlisten = await listen<string>('redirect_url', async ({ payload }) => {
            console.log('Received OAuth URL:', payload);

            const url = new URL(payload);
            const params = new URLSearchParams(url.search);
            const receivedState = params.get('state');
            const loginToken = params.get('loginToken');

            if (receivedState !== state) {
                console.error('State mismatch, ignoring redirect');
                return;
            }

            if (!loginToken) {
                console.error('No login token found in redirect URL');
                return;
            }

            try {
                await cancel(port);
            } catch (error) {}
            flowActive.current = false;

            await loginAndSave(homeserverBaseUrl, {
                type: 'm.login.token',
                token: loginToken,
                initial_device_display_name: getSessionName(),
            });
        });

        const redirectUrl = `http://localhost:${port}?state=${state}`;

        await openUrl(
            `${homeserverBaseUrl}/_matrix/client/r0/login/sso/redirect${providerId ? `/${providerId}` : ''}?redirectUrl=${encodeURIComponent(redirectUrl)}`
        );

        cleanup.current = async () => {
            console.log('Rinning SSO flow cleanup');

            unlisten();
            if (flowActive.current) {
                await cancel(port);
                flowActive.current = false;
            }
        };
    }, []);

    return { start: startFlow };
}
