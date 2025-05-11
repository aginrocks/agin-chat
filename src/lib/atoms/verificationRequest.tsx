import { toast } from '@components/ui/sonner';
import { useVerificationRequestPhase, useVerificationRequestReceived } from '@lib/hooks';
import { useModals } from '@lib/modals';
import { IconShield } from '@tabler/icons-react';
import { atom, useAtom } from 'jotai';
import { VerificationPhase, VerificationRequest } from 'matrix-js-sdk/lib/crypto-api';
import { useCallback, useEffect, useState } from 'react';
import { toast as sonnerToast } from 'sonner';

export const VerificationRequestAtom = atom<VerificationRequest>();

export function useBindVerificationRequest() {
    const [request, setRequest] = useAtom(VerificationRequestAtom);
    const modals = useModals();
    const [toastId, setToastId] = useState<string | number | null>(null);

    const phase = useVerificationRequestPhase(request);
    useEffect(() => {
        console.log({ phase });
        // FIXME: not always the toast is dismissed
        if (phase === VerificationPhase.Cancelled && toastId) sonnerToast.dismiss(toastId);
    }, [phase]);

    useVerificationRequestReceived(
        useCallback(
            (request) => {
                console.log('verification request received', request);

                setRequest(request);

                const toastId = toast({
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
                setToastId(toastId);
                // if (request) modals.show('VerifySession');
            },
            [setRequest]
        )
    );
}
