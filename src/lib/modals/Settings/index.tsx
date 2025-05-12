import { Dialog, DialogContent } from '@components/ui/dialog';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { ModalProps } from '../ModalsManager';
import { SettingsSidebar } from './Sidebar';

export function Settings({
    payload,
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Root> & ModalProps<'Settings'>) {
    return (
        <Dialog {...props}>
            <DialogContent className="w-4xl h-150 p-4">
                <div className="flex w-full h-full">
                    <SettingsSidebar></SettingsSidebar>
                </div>
            </DialogContent>
        </Dialog>
    );
}
