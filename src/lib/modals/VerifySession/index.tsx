import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@components/ui/dialog';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { ModalProps } from '../ModalsManager';
import { CompareEmojiView } from './CompareEmojiView';
import { useState } from 'react';
import { ShowSasCallbacks } from 'matrix-js-sdk/lib/crypto-api';
import { useVerifierShowSas } from '@lib/hooks';
import { useAtomValue } from 'jotai';
import { VerificationRequestAtom } from '@lib/atoms';
import { Button } from '@components/ui/button';

export function VerifySession({
    payload,
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Root> & ModalProps<'VerifySession'>) {
    const request = useAtomValue(VerificationRequestAtom);
    const [sasData, setSasData] = useState<ShowSasCallbacks>();

    useVerifierShowSas(request?.verifier, setSasData);

    return (
        <Dialog {...props}>
            <DialogContent className="w-md">
                <DialogHeader>
                    <DialogTitle>Device Verification</DialogTitle>
                    <DialogDescription>
                        Confirm the emoji below are displayed on both devices, in the same order:
                    </DialogDescription>
                </DialogHeader>
                {sasData && <CompareEmojiView sasData={sasData} />}
                <div className="flex flex-col gap-3">
                    <Button disabled={!sasData} onClick={() => sasData?.confirm()}>
                        They match
                    </Button>
                    <Button
                        variant="secondary"
                        disabled={!sasData}
                        onClick={() => sasData?.mismatch()}
                    >
                        They don't match
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
