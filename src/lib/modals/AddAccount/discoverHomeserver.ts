import {
    AutoDiscovery,
    AutoDiscoveryAction,
    createClient,
    ILoginFlowsResponse,
} from 'matrix-js-sdk';

export const SUPPORTED_FLOWS = ['m.login.password', 'm.login.sso'];

export async function discoverHomeserver(url: string) {
    const result = await AutoDiscovery.findClientConfig(url);
    let loginFlows: ILoginFlowsResponse | undefined = undefined;
    if (
        result['m.homeserver'].state === AutoDiscoveryAction.SUCCESS &&
        result['m.homeserver'].base_url
    ) {
        const client = createClient({
            baseUrl: result['m.homeserver'].base_url,
        });

        loginFlows = await client.loginFlows();
        loginFlows.flows = loginFlows.flows.filter((flow) => SUPPORTED_FLOWS.includes(flow.type));

        client.stopClient();
    }

    // const success = result['m.homeserver'].state === AutoDiscoveryAction.SUCCESS;
    return { result, loginFlows };
}
