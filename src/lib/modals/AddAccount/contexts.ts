import { useForm } from '@mantine/form';
import { ILoginFlow, IPasswordFlow, ISSOFlow } from 'matrix-js-sdk';
import { createContext, Dispatch, SetStateAction } from 'react';

export type LoginStage = 'select_homeserver' | 'loading' | 'error' | 'login';

export type LoginDetails = {
    homeserver: string;
    username: string;
    password: string;
};

export type FormContextType = ReturnType<typeof useForm<LoginDetails>>;
export const FormContext = createContext<FormContextType | null>(null);

export type StageContextType = [LoginStage, Dispatch<SetStateAction<LoginStage>>];
export const StageContext = createContext<StageContextType>(['select_homeserver', () => {}]);

export type ErrorContextType = [string, Dispatch<SetStateAction<string>>];
export const ErrorContext = createContext<ErrorContextType>(['', () => {}]);

export type Flow = ILoginFlow | IPasswordFlow | ISSOFlow;
export type FlowsContextType = [Flow[], Dispatch<SetStateAction<Flow[]>>];
export const FlowsContext = createContext<FlowsContextType>([[], () => {}]);
