import { Modals } from './modals';

export type DefaultModalDefinition = {
    payload: any;
    returnValue: any;
};
export type ModalDefinition<T extends DefaultModalDefinition = any> = T;

export type ModalName = keyof Modals;
export type Modal<T extends ModalName> = Modals[T];

export type ModalProps<T extends ModalName> = Modals[T]['payload'];
export type ModalReturnValue<T extends ModalName> = Modals[T]['returnValue'];

export type ModalComponentBindings = {
    [T in ModalName]: React.FC<{ payload: ModalProps<T>; open: boolean }>;
};

export type ModalStoreItem<T extends ModalName> = {
    id: string;
    payload: ModalProps<T>;
    resolve: (value: ModalReturnValue<T> | undefined) => void;
};
