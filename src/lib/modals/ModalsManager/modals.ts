import { AddAccount } from '../AddAccount';
import { Settings, SettingsTabName } from '../Settings';
import { VerifySession } from '../VerifySession';
import { ModalComponentBindings, ModalDefinition } from './types';

export type Modals = {
    AddAccount: ModalDefinition<{
        payload: undefined;
        returnValue: {
            success: boolean;
        };
    }>;
    VerifySession: ModalDefinition<{
        payload: undefined;
        returnValue: undefined;
    }>;
    Settings: ModalDefinition<{
        payload: {
            initialTab?: SettingsTabName;
        };
        returnValue: undefined;
    }>;
};

export const ModalsBinding: ModalComponentBindings = {
    AddAccount: AddAccount,
    VerifySession: VerifySession,
    Settings: Settings,
};
