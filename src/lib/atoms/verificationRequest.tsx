import { Button } from '@components/ui/button';
import { toast } from '@components/ui/sonner';
import { useVerificationRequestReceived } from '@lib/hooks';
import { useModals } from '@lib/modals';
import { IconShield } from '@tabler/icons-react';
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

                toast({
                    title: 'Verification request',
                    // TODO: display human-readable device name
                    description: request.isSelfVerification
                        ? `Device ${request.otherDeviceId}`
                        : request.otherUserId,
                    icon: IconShield,
                    action: {
                        label: 'Verify',
                        onClick: () => {
                            request.accept();
                            modals.show('VerifySession');
                        },
                    },
                    cancel: {
                        label: 'Ignore',
                        onClick: () => {
                            request.cancel();
                            // TODO: ignore the request
                        },
                    },
                    options: {
                        duration: 5 * 60 * 1000,
                    },
                });
                // if (request) modals.show('VerifySession');
            },
            [setRequest]
        )
    );
}
