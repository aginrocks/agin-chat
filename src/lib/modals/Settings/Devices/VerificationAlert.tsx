import { Alert, AlertDescription, AlertTitle } from '@components/ui/alert';
import { Button } from '@components/ui/button';

export function VerificationAlert() {
    return (
        <Alert className="rounded-sm bg-secondary-hover flex justify-between items-center mt-1">
            <div className="flex flex-col gap-0.5">
                <AlertTitle>Verify Device</AlertTitle>
                <AlertDescription className="text-xs">
                    Verify this device and grant access to encrypted messages.
                </AlertDescription>
            </div>
            <Button size="sm">Verify</Button>
        </Alert>
    );
}
