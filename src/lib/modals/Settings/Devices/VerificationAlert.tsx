import { Alert, AlertDescription, AlertTitle } from '@components/ui/alert';
import { Button } from '@components/ui/button';
import { VerificationRequestAtom } from '@lib/atoms';
import { useMatrixClient } from '@lib/hooks';
import { useModals } from '@lib/modals/ModalsManager';
import { useSetAtom } from 'jotai';
import { useCallback } from 'react';

export type VerificationAlertProps = {
    deviceId: string;
};

export function VerificationAlert({ deviceId }: VerificationAlertProps) {
    const mx = useMatrixClient();
    const modals = useModals();
    const setRequest = useSetAtom(VerificationRequestAtom);

    const requestVerification = useCallback(async () => {
        console.log('Requesting verification for device', deviceId);

        if (!mx) return console.log('Matrix client not available');
        const crypto = mx.getCrypto();

        if (!crypto) return console.log('Crypto not available');

        const request = await crypto.requestDeviceVerification(mx.getSafeUserId(), deviceId);
        setRequest(request);

        modals.show('VerifySession');
    }, [mx, deviceId]);

    return (
        <Alert className="rounded-sm bg-secondary-hover flex justify-between items-center mt-1">
            <div className="flex flex-col gap-0.5">
                <AlertTitle>Verify Device</AlertTitle>
                <AlertDescription className="text-xs">
                    Verify this device and grant access to encrypted messages.
                </AlertDescription>
            </div>
            <Button size="sm" onClick={requestVerification}>
                Verify
            </Button>
        </Alert>
    );
}
