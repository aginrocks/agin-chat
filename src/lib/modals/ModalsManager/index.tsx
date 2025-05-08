import { useCallback, useState } from 'react';
import { ModalName, ModalPayload, ModalReturnValue, ModalStore, ModalStoreItem } from './types';
import { ModalsContext } from './contexts';
import { ModalsBinding } from './modals';

export type ModalsManagerProps = {
    children?: React.ReactNode;
};

const CLOSE_DURATION_MS = 300;

export function ModalsManagerProvider({ children }: ModalsManagerProps) {
    const [modals, setModals] = useState<ModalStore>({});

    const show = useCallback(
        <T extends ModalName>(
            modalName: T,
            payload?: ModalPayload<T>
        ): Promise<ModalReturnValue<T> | undefined> => {
            return new Promise((resolve) => {
                const modalDetails: ModalStoreItem<T> = {
                    name: modalName,
                    state: 'visible',
                    payload,
                    resolve,
                };

                setModals((m) => {
                    const newModals = { ...m, [modalName]: modalDetails };
                    return newModals;
                });
            });
        },
        [modals]
    );

    const hide = useCallback(
        <T extends ModalName>(modalName: T, payload: ModalReturnValue<T>) => {
            try {
                setModals((m) => {
                    const newModals = { ...m };
                    if (newModals[modalName]) {
                        if (newModals[modalName].state === 'closing') {
                            throw new Error('Modal is already closing');
                        }
                        newModals[modalName].state = 'closing';
                    }
                    requestAnimationFrame(() => newModals[modalName]?.resolve(payload));
                    return newModals;
                });
                setTimeout(() => {
                    setModals((m) => {
                        const newModals = { ...m };
                        delete newModals[modalName];
                        return newModals;
                    });
                }, CLOSE_DURATION_MS);
            } catch (error) {}
        },
        [modals]
    );

    return (
        <ModalsContext.Provider value={{ show, hide }}>
            {Object.values(modals).map((m) => {
                const ModalComponent = ModalsBinding[m.name];

                return (
                    <ModalComponent
                        payload={m.payload}
                        open={m.state === 'visible'}
                        onOpenChange={(open) => {
                            if (!open) {
                                hide(m.name, undefined);
                            }
                        }}
                        key={m.name}
                        modalName={m.name}
                    />
                );
            })}
            {children}
        </ModalsContext.Provider>
    );
}

export * from './hooks';
export * from './types';
