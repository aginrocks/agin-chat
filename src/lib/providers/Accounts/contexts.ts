import { Account } from '@/lib/store';
import { SetStateAction } from 'jotai';
import { createContext, Dispatch } from 'react';

export type AccountsContextType = [Account[], Dispatch<SetStateAction<Account[]>>];
const initialAccounts: AccountsContextType = [[], () => {}];

export const AccountsContext = createContext<AccountsContextType>(initialAccounts);

export type AccountsProviderProps = {
    children?: React.ReactNode;
};
