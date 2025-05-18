import { useCallback, useEffect, useState } from 'react';
import { MatrixClientContext, MatrixClientProviderProps } from './contexts';
import { useAccount } from '@lib/hooks';
import { MatrixClient } from 'matrix-js-sdk';
import { initClient } from './initClient';
import { SplashScreen } from '@components/SplashScreen';
import { useSyncState } from '@lib/hooks/useSyncState';
import { useNavigate } from '@tanstack/react-router';
import { getAccounts } from '@lib/store';
import { useAtom } from 'jotai';
import { AppLoadingAtom } from '@lib/atoms';

export function MatrixClientProvider({ children }: MatrixClientProviderProps) {
    const [account] = useAccount();
    const [loading, setLoading] = useAtom(AppLoadingAtom);
    const navigate = useNavigate();

    const [client, setClient] = useState<MatrixClient | undefined>(undefined);

    useSyncState(
        client,
        useCallback(
            (state) => {
                if (state === 'PREPARED') {
                    setLoading(false);
                }
            },
            [client]
        )
    );

    useEffect(() => {
        (async () => {
            const accounts = await getAccounts();
            console.log('ACC LENGTH', accounts.length);

            console.log({ accounts });

            if (accounts.length === 0) {
                setLoading(false);
                navigate({ to: '/welcome' });
            }
        })();
    }, [navigate]);

    useEffect(() => {
        console.log('account changed', account);
        if (!account) return;
        let client: MatrixClient | undefined = undefined;

        (async () => {
            setLoading(true);
            console.log('init client', account);
            client = await initClient(account);
            setClient(client);
        })();

        return () => {
            if (client) {
                client.stopClient();
                setClient(undefined);
            }
        };
    }, [account]);

    return (
        <MatrixClientContext.Provider value={client}>
            <SplashScreen visible={loading}></SplashScreen>
            {children}
        </MatrixClientContext.Provider>
    );
}

export * from './contexts';
