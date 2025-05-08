import { AutoDiscovery } from 'matrix-js-sdk';

export async function discoverHomeserver(url: string) {
    const result = await AutoDiscovery.findClientConfig(url);
    // const success = result['m.homeserver'].state === AutoDiscoveryAction.SUCCESS;
    return result;
}
