import { DialogHeader, DialogTitle } from '@components/ui/dialog';
import { ErrorMessage } from '@components/ui/error';
import { useModals } from '../ModalsManager';
import { Button } from '@components/ui/button';

export function Canceled() {
    const modals = useModals();

    return (
        <>
            <DialogHeader className="mb-2">
                <DialogTitle>Device Verification</DialogTitle>
            </DialogHeader>
            <ErrorMessage
                title="Verification canceled"
                description="Verification has been canceled."
            />
            <Button variant="secondary" onClick={() => modals.hide('VerifySession')}>
                Close
            </Button>
        </>
    );
}
