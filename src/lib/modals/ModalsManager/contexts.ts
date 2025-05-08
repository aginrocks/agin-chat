import { createContext } from 'react';
import { ModalName, ModalProps, ModalReturnValue } from './types';

export type ModalsContextType = {
    show: <T extends ModalName>(
        modalName: T,
        payload?: ModalProps<T>
    ) => Promise<ModalReturnValue<T> | undefined>;
    hide: <T extends ModalName>(modalName: T, payload: ModalReturnValue<T>) => void;
};

const initial: ModalsContextType = {
    show: async () => undefined,
    hide: () => {},
};

export const ModalsContext = createContext<ModalsContextType>(initial);
