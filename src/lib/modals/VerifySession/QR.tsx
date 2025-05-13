import { VerificationRequestAtom } from '@lib/atoms';
import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';

export function QRVerification() {
    const [code, setCode] = useState<string | null>(null);
    const request = useAtomValue(VerificationRequestAtom);

    useEffect(() => {
        (async () => {
            const code = await request?.generateQRCode();
            setCode(code?.toString() ?? null);
        })();
    }, [request]);

    return <QRCode value={code ?? ''} />;
}
