import { addAccount } from '@lib/store';
import { createClient, LoginRequest } from 'matrix-js-sdk';
import { useCallback, useContext } from 'react';
import { AccountsContext } from '../providers/Accounts';

export function useLogin() {
    const [, setAccounts] = useContext(AccountsContext);

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

        mx.stopClient();

        return result;
    }, []);

    return { loginAndSave };
}
