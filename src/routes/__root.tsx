import { createRootRoute, Outlet } from '@tanstack/react-router';
import '@/index.css';
import { ThemeProvider } from '@components/theme-provider';
import { MatrixClientProvider } from '@lib/providers/MatrixClient';
import { ModalsManagerProvider } from '@lib/modals';
import { AccountsProvider } from '@lib/providers/Accounts';

export const Route = createRootRoute({
    component: () => (
        <ThemeProvider defaultTheme="dark" storageKey="theme">
            <AccountsProvider>
                <MatrixClientProvider>
                    <ModalsManagerProvider>
                        <Outlet />
                    </ModalsManagerProvider>
                </MatrixClientProvider>
            </AccountsProvider>
            {/* <TanStackRouterDevtools /> */}
        </ThemeProvider>
    ),
});
