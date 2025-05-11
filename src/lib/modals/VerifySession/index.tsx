import { Dialog, DialogContent } from '@components/ui/dialog';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as React from 'react';
import { ModalProps } from '../ModalsManager';

export function VerifySession({
    payload,
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Root> & ModalProps<'VerifySession'>) {
    return (
        <Dialog {...props}>
            <DialogContent className="w-md"></DialogContent>
        </Dialog>
    );
}
