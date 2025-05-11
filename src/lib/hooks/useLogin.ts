import { addAccount } from '@lib/store';
import { createClient, LoginRequest } from 'matrix-js-sdk';
import { useCallback, useContext } from 'react';
import { AccountsContext } from '../providers/Accounts';
import { useNavigate } from '@tanstack/react-router';
import { useAccount } from './useAccount';
import { useModals } from '@lib/modals';
import { useSetAtom } from 'jotai';
import { AppLoadingAtom } from '@lib/atoms';

export function useLogin() {
    const [, setAccounts] = useContext(AccountsContext);
    const [, setAccount] = useAccount();
    const modals = useModals();
    const navigate = useNavigate();
    const setAppLoading = useSetAtom(AppLoadingAtom);

    const loginAndSave = useCallback(async (baseUrl: string, data: LoginRequest) => {
        const mx = createClient({
            baseUrl,
        });

        const result = await mx.loginRequest(data);
        console.log('Login result:', result);

        const account = {
            access_token: result.access_token,
            device_id: result.device_id,
            user_id: result.user_id,
            base_url: result.well_known?.['m.homeserver']?.base_url || baseUrl,
        };

        await addAccount(account);

        setAccounts((acc) => [...acc, account]);
        setAccount(account);

        mx.stopClient();

        setAppLoading(true);

        setTimeout(() => {
            navigate({ to: '/app/direct' });
            modals.hide('AddAccount');
        }, 500);

        return result;
    }, []);

    return { loginAndSave };
}
