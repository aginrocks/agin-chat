import { useEffect, useState } from 'react';
import { AccountsContext, AccountsProviderProps, SelectedAccountContext } from './contexts';
import { Account, getAccounts } from '@lib/store';

export * from './contexts';

export function AccountsProvider({ children }: AccountsProviderProps) {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);

    useEffect(() => {
        (async () => {
            const accounts = await getAccounts();
            setAccounts(accounts);

            // TODO: Remember last selected account
            setSelectedAccount(accounts[0]);
        })();
    }, []);

    return (
        <AccountsContext.Provider value={[accounts, setAccounts]}>
            <SelectedAccountContext.Provider value={[selectedAccount, setSelectedAccount]}>
                {children}
            </SelectedAccountContext.Provider>
        </AccountsContext.Provider>
    );
}
