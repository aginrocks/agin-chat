export type Modals = {
    AddAccount: ModalDefinition<{
        payload: {
            a: string;
        };
        returnValue: {
            success: boolean;
        };
    }>;
};

export type DefaultModalDefinition = {
    payload: any;
    returnValue: any;
};
export type ModalDefinition<T extends DefaultModalDefinition = any> = T;

export type ModalName = keyof Modals;
export type Modal<T extends ModalName> = Modals[T];

export type ModalProps<T extends ModalName> = Modals[T]['payload'];
export type ModalReturnValue<T extends ModalName> = Modals[T]['returnValue'];
