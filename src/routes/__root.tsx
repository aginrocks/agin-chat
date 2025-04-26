import { createRootRoute, Outlet } from '@tanstack/react-router';
import '@/index.css';
import { ThemeProvider } from '@/components/theme-provider';

export const Route = createRootRoute({
    component: () => (
        <ThemeProvider defaultTheme="dark" storageKey="theme">
            <Outlet />
            {/* <TanStackRouterDevtools /> */}
        </ThemeProvider>
    ),
});
