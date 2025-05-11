import { createRootRoute, Outlet } from '@tanstack/react-router';
import '@/index.css';
import { ThemeProvider } from '@components/theme-provider';
import { MatrixClientProvider } from '@lib/providers/MatrixClient';
import { useHotkeys } from '@mantine/hooks';
import { ModalsManagerProvider } from '@lib/modals';
import { AccountsProvider } from '@lib/providers/Accounts';
import { TooltipProvider } from '@components/ui/tooltip';
import { DevTools } from 'jotai-devtools';
import { useState } from 'react';
import 'jotai-devtools/styles.css';
// import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

export const Route = createRootRoute({
    component: () => {
        const [jotaiDevtoolsVisible, setJotaiDevtoolsVisible] = useState(false);
        useHotkeys([
            ['mod+I', () => import.meta.env.DEV && setJotaiDevtoolsVisible((prev) => !prev)],
        ]);

        return (
            <ThemeProvider defaultTheme="dark" storageKey="theme">
                <TooltipProvider>
                    <AccountsProvider>
                        <MatrixClientProvider>
                            <ModalsManagerProvider>
                                <Outlet />
                            </ModalsManagerProvider>
                        </MatrixClientProvider>
                    </AccountsProvider>
                </TooltipProvider>
                {/* <TanStackRouterDevtools /> */}
                {jotaiDevtoolsVisible && <DevTools />}
            </ThemeProvider>
        );
    },
});
