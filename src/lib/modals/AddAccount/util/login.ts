import { createClient, LoginRequest } from 'matrix-js-sdk';

export async function loginAndSave(baseUrl: string, data: LoginRequest) {
    const mx = createClient({
        baseUrl,
    });

    const result = await mx.loginRequest(data);

    // TODO: Save the token

    return result;
}
