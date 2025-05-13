import { DialogHeader, DialogTitle } from '@components/ui/dialog';
import { ErrorMessage } from '@components/ui/error';
import { IconDevices } from '@tabler/icons-react';

export function Requested() {
    return (
        <>
            <DialogHeader className="mb-2">
                <DialogTitle>Device Verification</DialogTitle>
            </DialogHeader>
            <ErrorMessage
                icon={IconDevices}
                title="Waiting..."
                color="blue"
                description="Please accept the request from the other device"
            />
        </>
    );
}
