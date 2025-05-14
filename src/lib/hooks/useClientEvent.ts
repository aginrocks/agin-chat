import { useEffect } from 'react';
import { useMatrixClient } from './useMatrixClient';
import { ClientEventHandlerMap, EmittedEvents, EventEmitterEvents, Listener } from 'matrix-js-sdk';

export function useClientEvent<T extends EmittedEvents | EventEmitterEvents>(
    event: T,
    listener: Listener<EmittedEvents, ClientEventHandlerMap, T>
) {
    const mx = useMatrixClient();

    useEffect(() => {
        if (!mx) return;
        console.log('binding event', event);

        mx.on(event, listener);

        return () => {
            mx.off(event, listener);
        };
    }, [mx, event, listener]);
}
