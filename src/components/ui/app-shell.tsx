import { PrimarySidebar } from './primary-sidebar';
import { Titlebar } from './titlebar';

type AppShellProps = {
    children?: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
    return (
        <div className="w-full h-screen flex flex-col">
            <Titlebar />
            <div className="flex w-full flex-1">
                <PrimarySidebar />
                <div className="border-t border-l rounded-tl-lg flex-1">{children}</div>
            </div>
        </div>
    );
}
