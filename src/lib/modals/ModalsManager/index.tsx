import { useCallback, useState } from 'react';
import { ModalName, Modal, ModalProps, ModalReturnValue, ModalStoreItem } from './types';
import { ModalsContext } from './contexts';
import * as uuid from 'uuid';

export type ModalsManagerProps = {
    children?: React.ReactNode;
};

export function ModalsManagerProvider({ children }: ModalsManagerProps) {
    const [modals, setModals] = useState<ModalStoreItem<any>[]>([]);

    const showModal = useCallback(
        <T extends ModalName>(
            modalName: T,
            payload: ModalProps<T>
        ): Promise<ModalReturnValue<T> | undefined> => {
            return new Promise((resolve) => {
                const modalId = uuid.v4();

                const modalDetails: ModalStoreItem<T> = {
                    id: modalId,
                    payload,
                    resolve,
                };

                setModals((m) => [...m, modalDetails]);
            });
        },
        [modals]
    );

    const hideModal = useCallback((id: string) => {}, []);

    return <ModalsContext.Provider value={[modals, setModals]}>{children}</ModalsContext.Provider>;
}
