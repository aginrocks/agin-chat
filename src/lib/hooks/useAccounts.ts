import { useContext } from 'react';
import { AccountsContext } from '@lib/providers/Accounts';

export function useAccounts() {
    const context = useContext(AccountsContext);
    if (!context) {
        throw new Error('useAccounts must be used within a AccountsProvider');
    }
    return context[0];
}
