import { useEffect, useState } from 'react';
import { AccountsContext, AccountsProviderProps } from './contexts';
import { Account, getAccounts } from '@lib/store';

export * from './contexts';

export function AccountsProvider({ children }: AccountsProviderProps) {
    const [accounts, setAccounts] = useState<Account[]>([]);

    useEffect(() => {
        (async () => {
            const accounts = await getAccounts();
            setAccounts(accounts);
        })();
    }, []);

    return (
        <AccountsContext.Provider value={[accounts, setAccounts]}>
            {children}
        </AccountsContext.Provider>
    );
}
