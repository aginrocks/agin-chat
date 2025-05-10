import { APP_NAME } from '@lib/constants/names';

export function Titlebar() {
    return (
        <div
            data-tauri-drag-region
            className="flex w-full justify-center items-center h-8 select-none"
        >
            <div className="text-xs font-semibold">{APP_NAME}</div>
        </div>
    );
}
