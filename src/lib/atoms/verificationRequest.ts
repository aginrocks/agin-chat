import { useVerificationRequestReceived } from '@lib/hooks';
import { useModals } from '@lib/modals';
import { atom, useSetAtom } from 'jotai';
import { VerificationRequest } from 'matrix-js-sdk/lib/crypto-api';
import { useCallback } from 'react';

export const VerificationRequestAtom = atom<VerificationRequest>();

export function useBindVerificationRequest() {
    const setRequest = useSetAtom(VerificationRequestAtom);
    const modals = useModals();

    useVerificationRequestReceived(
        useCallback(
            (request) => {
                console.log('verification request received', request);

                setRequest(request);
                if (request) modals.show('VerifySession');
            },
            [setRequest]
        )
    );
}
