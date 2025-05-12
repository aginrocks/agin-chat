import { ReactNode } from 'react';
import { SettingsHeader } from './Header';

export type SettingsSidebarProps = {
    children?: ReactNode;
};
export function SettingsSidebar({ children }: SettingsSidebarProps) {
    return (
        <div className="pl-1">
            <SettingsHeader />
            {children}
        </div>
    );
}
