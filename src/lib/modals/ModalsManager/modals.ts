import { AddAccount } from '../AddAccount';
import { ModalComponentBindings, ModalDefinition } from './types';

export type Modals = {
    AddAccount: ModalDefinition<{
        payload: never;
        returnValue: {
            success: boolean;
        };
    }>;
};

export const ModalsBinding: ModalComponentBindings = {
    AddAccount: AddAccount,
};
