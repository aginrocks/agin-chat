import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@components/ui/dialog';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { ModalProps } from '../ModalsManager';
import { useState } from 'react';
import { ShowSasCallbacks, VerificationPhase } from 'matrix-js-sdk/lib/crypto-api';
import { useVerificationRequestPhase, useVerifierShowSas } from '@lib/hooks';
import { useAtomValue } from 'jotai';
import { VerificationRequestAtom } from '@lib/atoms';
import { SasVerification } from './SasVerification';
import { Done } from './Done';
import { Canceled } from './Canceled';

export function VerifySession({
    payload,
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Root> & ModalProps<'VerifySession'>) {
    const request = useAtomValue(VerificationRequestAtom);
    const [sasData, setSasData] = useState<ShowSasCallbacks>();

    useVerifierShowSas(request?.verifier, setSasData);

    const phase = useVerificationRequestPhase(request);

    return (
        <Dialog {...props}>
            <DialogContent className="w-md">
                {phase === VerificationPhase.Started && <SasVerification sasData={sasData} />}
                {phase === VerificationPhase.Done && <Done />}
                {phase === VerificationPhase.Cancelled && <Canceled />}
            </DialogContent>
        </Dialog>
    );
}
