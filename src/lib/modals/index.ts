import NiceModal from '@ebay/nice-modal-react';
import { AddAccount } from './AddAccount';
import { ModalName, ModalProps, ModalReturnValue } from './types';

export * from './AddAccount';

NiceModal.register('AddAccount', AddAccount);

declare module '@ebay/nice-modal-react' {
    function show<T extends ModalName>(modal: T, args: ModalProps<T>): Promise<ModalReturnValue<T>>;
}

// NiceModal.show('AddAccount', {});
