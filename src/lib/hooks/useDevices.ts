import { useCallback, useEffect, useState } from 'react';
import { useMatrixClient, useClientEvent } from '.';
import { IMyDevice } from 'matrix-js-sdk';
import { CryptoEvent } from 'matrix-js-sdk/lib/crypto-api';

export function useDevices() {
    const mx = useMatrixClient();

    const [devices, setDevices] = useState<IMyDevice[]>([]);

    const getDevices = useCallback(async () => {
        if (!mx) return;
        const { devices } = await mx.getDevices();
        setDevices(devices);
    }, [mx]);

    useClientEvent(CryptoEvent.DevicesUpdated, getDevices);

    useEffect(() => {
        getDevices();
    }, [getDevices]);

    return { devices, getDevices };
}
