import { Button } from '@components/ui/button';
import { DialogHeader, DialogTitle } from '@components/ui/dialog';
import { ErrorMessage } from '@components/ui/error';
import { IconCheck } from '@tabler/icons-react';
import { useModals } from '@lib/modals';

export function Done() {
    const modals = useModals();

    return (
        <>
            <DialogHeader className="mb-2">
                <DialogTitle>Device Verification</DialogTitle>
            </DialogHeader>
            <ErrorMessage
                color="green"
                icon={IconCheck}
                title="Verification complete"
                description="The device is now verified."
            />
            <Button onClick={() => modals.hide('VerifySession')}>Done</Button>
        </>
    );
}
