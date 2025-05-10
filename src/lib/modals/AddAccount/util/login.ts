import { addAccount } from '@lib/store';
import { createClient, LoginRequest } from 'matrix-js-sdk';

export async function loginAndSave(baseUrl: string, data: LoginRequest) {
    const mx = createClient({
        baseUrl,
    });

    const result = await mx.loginRequest(data);
    console.log('Login result:', result);

    await addAccount({
        access_token: result.access_token,
        device_id: result.device_id,
        user_id: result.user_id,
        base_url: baseUrl,
    });

    mx.stopClient();

    return result;
}
