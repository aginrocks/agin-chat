import { useForm } from '@mantine/form';
import { createContext, Dispatch, SetStateAction } from 'react';

export type LoginStage = 'select_homeserver' | 'loading' | 'error' | 'login';

export type LoginDetails = {
    homeserver: string;
    username: string;
    password: string;
};

export type AddAccountContextType = ReturnType<typeof useForm<LoginDetails>>;
export const AddAccountContext = createContext<AddAccountContextType | null>(null);

export type StageContextType = [LoginStage, Dispatch<SetStateAction<LoginStage>>];
export const StageContext = createContext<StageContextType>(['select_homeserver', () => {}]);

export type ErrorContextType = [string, Dispatch<SetStateAction<string>>];
export const ErrorContext = createContext<ErrorContextType>(['', () => {}]);
