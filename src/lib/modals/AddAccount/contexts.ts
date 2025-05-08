import { useForm } from '@mantine/form';
import { createContext, Dispatch, SetStateAction } from 'react';

export type LoginStage = 'rocks.agin.chat.select_homeserver' | 'm.login.password';

export type LoginDetails = {
    homeserver: string;
    username: string;
    password: string;
};

export type AddAccountContextType = ReturnType<typeof useForm<LoginDetails>>;
export const AddAccountContext = createContext<AddAccountContextType | null>(null);

export type StageContextType = [LoginStage, Dispatch<SetStateAction<LoginStage>>];
export const StageContext = createContext<StageContextType>([
    'rocks.agin.chat.select_homeserver',
    () => {},
]);
