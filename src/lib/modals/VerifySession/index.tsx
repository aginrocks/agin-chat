import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@components/ui/dialog';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { ModalProps } from '../ModalsManager';
import { useEffect, useState } from 'react';
import { ShowSasCallbacks, VerificationPhase } from 'matrix-js-sdk/lib/crypto-api';
import { useVerificationRequestPhase, useVerifierShowSas } from '@lib/hooks';
import { useAtomValue } from 'jotai';
import { VerificationRequestAtom } from '@lib/atoms';
import { SasVerification } from './SasVerification';
import { Done } from './Done';
import { Canceled } from './Canceled';
import { VerificationMethod } from 'matrix-js-sdk/lib/types';
import { Requested } from './Requested';

export function VerifySession({
    payload,
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Root> & ModalProps<'VerifySession'>) {
    const request = useAtomValue(VerificationRequestAtom);
    const [sasData, setSasData] = useState<ShowSasCallbacks>();

    useVerifierShowSas(request?.verifier, setSasData);

    const phase = useVerificationRequestPhase(request);
    useEffect(() => {
        if (!request) return;
        if (phase === VerificationPhase.Ready) {
            request.startVerification(VerificationMethod.Sas);
        }
    }, [phase, request]);

    return (
        <Dialog {...props}>
            <DialogContent className="w-md">
                {phase === VerificationPhase.Requested && <Requested />}
                {phase === VerificationPhase.Started && <SasVerification sasData={sasData} />}
                {phase === VerificationPhase.Done && <Done />}
                {phase === VerificationPhase.Cancelled && <Canceled />}
            </DialogContent>
        </Dialog>
    );
}
