import { useCallback } from 'react';
import { UserIdentifier } from 'matrix-js-sdk';
import { getSessionName, validEmail } from '@lib/utils';
import { useLogin } from '@lib/hooks';

export type LoginParams = {
    baseUrl: string;
    username: string;
    password: string;
};

export function usePasswordFlow() {
    const { loginAndSave } = useLogin();

    const login = useCallback(async ({ baseUrl, username, password }: LoginParams) => {
        let identifier: UserIdentifier;
        if (validEmail(username)) {
            identifier = {
                type: 'm.id.thirdparty',
                medium: 'email',
                address: username,
            };
        } else {
            identifier = {
                type: 'm.id.user',
                user: username,
            };
        }

        await loginAndSave(baseUrl, {
            type: 'm.login.password',
            identifier,
            password,
            initial_device_display_name: getSessionName(),
        });
    }, []);

    return { login };
}
