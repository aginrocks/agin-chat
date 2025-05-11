import {
    CryptoEvent,
    CryptoEventHandlerMap,
    VerificationPhase,
    VerificationRequest,
    VerificationRequestEvent,
    VerificationRequestEventHandlerMap,
    Verifier,
    VerifierEvent,
    VerifierEventHandlerMap,
} from 'matrix-js-sdk/lib/crypto-api';
import { useMatrixClient } from './useMatrixClient';
import { useCallback, useEffect, useState } from 'react';

export function useVerificationRequestReceived(
    onRequest: CryptoEventHandlerMap[CryptoEvent.VerificationRequestReceived]
) {
    const mx = useMatrixClient();

    useEffect(() => {
        if (!mx) return console.log('Matrix client not available');
        console.log('Binding verification request received event');
        mx.on(CryptoEvent.VerificationRequestReceived, onRequest);

        return () => {
            mx.off(CryptoEvent.VerificationRequestReceived, onRequest);
        };
    }, [mx, onRequest]);
}

export const useVerificationRequestChange = (
    request: VerificationRequest,
    onChange: VerificationRequestEventHandlerMap[VerificationRequestEvent.Change]
) => {
    useEffect(() => {
        request.on(VerificationRequestEvent.Change, onChange);
        return () => {
            request.removeListener(VerificationRequestEvent.Change, onChange);
        };
    }, [request, onChange]);
};

export const useVerificationRequestPhase = (request: VerificationRequest): VerificationPhase => {
    const [phase, setPhase] = useState(() => request.phase);

    useVerificationRequestChange(
        request,
        useCallback(() => {
            setPhase(request.phase);
        }, [request])
    );

    return phase;
};

export const useVerifierCancel = (
    verifier: Verifier,
    onCallback: VerifierEventHandlerMap[VerifierEvent.Cancel]
) => {
    useEffect(() => {
        verifier.on(VerifierEvent.Cancel, onCallback);
        return () => {
            verifier.removeListener(VerifierEvent.Cancel, onCallback);
        };
    }, [verifier, onCallback]);
};

export const useVerifierShowSas = (
    verifier: Verifier,
    onCallback: VerifierEventHandlerMap[VerifierEvent.ShowSas]
) => {
    useEffect(() => {
        verifier.on(VerifierEvent.ShowSas, onCallback);
        return () => {
            verifier.removeListener(VerifierEvent.ShowSas, onCallback);
        };
    }, [verifier, onCallback]);
};
