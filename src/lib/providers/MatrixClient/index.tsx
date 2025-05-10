import { useEffect, useState } from 'react';
import { MatrixClientContext, MatrixClientProviderProps } from './contexts';
import { useAccount } from '@lib/hooks';
import { MatrixClient } from 'matrix-js-sdk';
import { initClient } from './initClient';

export function MatrixClientProvider({ children }: MatrixClientProviderProps) {
    const [account] = useAccount();
    const [loading, setLoading] = useState(true);

    const [client, setClient] = useState<MatrixClient | null>(null);

    useEffect(() => {
        if (!account) return;
        let client: MatrixClient | null = null;

        (async () => {
            console.log('init client', account);
            client = await initClient(account);
            setClient(client);
        })();

        return () => {
            if (client) {
                client.stopClient();
                setClient(null);
            }
        };
    }, [account]);

    return (
        <MatrixClientContext.Provider value={client}>
            {/* <SplashScreen></SplashScreen> */}
            {children}
        </MatrixClientContext.Provider>
    );
}

export * from './contexts';
