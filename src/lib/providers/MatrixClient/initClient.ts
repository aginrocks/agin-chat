import { Account } from '@lib/store';
import { createClient, IndexedDBStore } from 'matrix-js-sdk';

export async function initClient(account: Account) {
    const indexedDBStore = new IndexedDBStore({
        indexedDB: window.indexedDB,
        dbName: `idb_store_${account.device_id}`,
    });

    const mx = createClient({
        baseUrl: account.base_url,
        accessToken: account.access_token,
        userId: account.user_id,
        deviceId: account.device_id,
        store: indexedDBStore,
        timelineSupport: true,
        // cryptoCallbacks: {
        //     getSecretStorageKey: async (opts) => {},
        // },
        verificationMethods: ['m.sas.v1'],
    });

    await indexedDBStore.startup();
    await mx.initRustCrypto();

    await mx.startClient({
        lazyLoadMembers: true,
    });

    return mx;
}
