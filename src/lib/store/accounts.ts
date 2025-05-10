import { load, Store } from '@tauri-apps/plugin-store';

export type Account = {
    user_id: string;
    device_id: string;
    access_token: string;
    base_url: string;
};

async function initStore() {
    const store = await load('store.json');
    return store;
}

async function getAccountsInternal(store: Store) {
    const accounts = await store.get<Account[]>('accounts');
    return accounts || [];
}

export async function getAccounts() {
    const store = await initStore();

    const accounts = await getAccountsInternal(store);
    await store.close();

    return accounts;
}

export async function addAccount(account: Account) {
    const store = await initStore();

    const accounts = await getAccountsInternal(store);
    accounts.push(account);

    await store.set('accounts', accounts);

    await store.save();
    await store.close();
}
