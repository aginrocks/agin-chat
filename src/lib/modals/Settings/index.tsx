import { Dialog, DialogContent } from '@components/ui/dialog';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { ModalProps } from '../ModalsManager';

export function Settings({
    payload,
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Root> & ModalProps<'Settings'>) {
    return (
        <Dialog {...props}>
            <DialogContent className="w-4xl h-150"></DialogContent>
        </Dialog>
    );
}
