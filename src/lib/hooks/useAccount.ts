import { useContext } from 'react';
import { SelectedAccountContext } from '@lib/providers/Accounts';

export function useAccount() {
    const context = useContext(SelectedAccountContext);
    if (!context) {
        throw new Error('useAccount must be used within a AccountsProvider');
    }
    return context;
}
