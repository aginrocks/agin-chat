import { createRootRoute, Outlet } from '@tanstack/react-router';
import '@/index.css';
import { ThemeProvider } from '@/components/theme-provider';
import { MatrixClientProvider } from '@/lib/providers/MatrixClient';
import NiceModal from '@ebay/nice-modal-react';
import '@/lib/modals';

export const Route = createRootRoute({
    component: () => (
        <ThemeProvider defaultTheme="dark" storageKey="theme">
            <MatrixClientProvider>
                <NiceModal.Provider>
                    <Outlet />
                </NiceModal.Provider>
            </MatrixClientProvider>
            {/* <TanStackRouterDevtools /> */}
        </ThemeProvider>
    ),
});
