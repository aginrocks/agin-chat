import { createRootRoute, Outlet } from '@tanstack/react-router';
import '@/index.css';
import { ThemeProvider } from '@/components/theme-provider';
import { MatrixClientProvider } from '@/lib/providers/MatrixClient';

export const Route = createRootRoute({
    component: () => (
        <ThemeProvider defaultTheme="dark" storageKey="theme">
            <MatrixClientProvider>
                <Outlet />
            </MatrixClientProvider>
            {/* <TanStackRouterDevtools /> */}
        </ThemeProvider>
    ),
});
