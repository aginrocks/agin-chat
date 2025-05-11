import { Button } from '@components/ui/button';
import { DialogDescription, DialogHeader, DialogTitle } from '@components/ui/dialog';
import { ShowSasCallbacks } from 'matrix-js-sdk/lib/crypto-api';
import { CompareEmojiView } from './CompareEmojiView';
import { useState } from 'react';
import { Spinner } from '@components/ui/spinner';

export type SasVerificationProps = {
    sasData: ShowSasCallbacks | undefined;
};

export function SasVerification({ sasData }: SasVerificationProps) {
    const [pendingConfirm, setPendingConfirm] = useState(false);

    return (
        <>
            <DialogHeader>
                <DialogTitle>Device Verification</DialogTitle>
                <DialogDescription>
                    Confirm the emoji below are displayed on both devices, in the same order:
                </DialogDescription>
            </DialogHeader>
            {sasData && <CompareEmojiView sasData={sasData} />}
            <div className="flex flex-col gap-3">
                <Button
                    disabled={!sasData || pendingConfirm}
                    onClick={async () => {
                        setPendingConfirm(true);
                        await sasData?.confirm();
                    }}
                >
                    {/* TODO: Change spinner color */}
                    {pendingConfirm && <Spinner />}
                    They match
                </Button>
                <Button
                    variant="secondary"
                    disabled={!sasData || pendingConfirm}
                    onClick={() => sasData?.mismatch()}
                >
                    They don't match
                </Button>
            </div>
        </>
    );
}
